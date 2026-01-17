import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { logtail } from "lib/logger";
import type Stripe from "stripe";

export const runtime = "nodejs"; // ⚠️ IMPORTANT POUR STRIPE

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    logger.warn("Stripe webhook missing signature");

    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    logger.error({ err }, "Stripe signature verification failed");
    Sentry.captureException(err);

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // ✅ Paiement confirmé
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;

    if (!userId) {
      logger.error(
        { sessionId: session.id },
        "Stripe webhook missing userId"
      );

      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // 🔹 Sécurité anti-doublon
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      logger.info(
        { orderId: existingOrder.id },
        "Stripe webhook duplicate ignored"
      );

      return NextResponse.json({ received: true });
    }

    // 🔹 Création de la commande
    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total ?? 0) / 100,
        status: "CONFIRMED",
        stripeSessionId: session.id,
      },
    });

    logger.info(
      {
        orderId: order.id,
        userId,
        amount: order.total,
      },
      "Order created from Stripe webhook"
    );

    // 🔹 Récupération du panier depuis metadata (optionnel)
    if (session.metadata?.cart) {
      try {
        JSON.parse(session.metadata.cart);
      } catch (err) {
        logger.warn(
          { err, sessionId: session.id },
          "Failed to parse cart metadata"
        );
        Sentry.captureException(err);
      }
    }
  }

  // ⚠️ Stripe exige toujours un 200
  return NextResponse.json({ received: true });
}
