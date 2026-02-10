import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { logtail } from "lib/logger";
import type Stripe from "stripe";

export const runtime = "nodejs";

// 👉 Optionnel mais utile pour éviter la 405 dans le navigateur
export async function GET() {
  return NextResponse.json(
    { message: "Stripe webhook endpoint (POST only)" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    logtail.error("Missing STRIPE_WEBHOOK_SECRET env var");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    logtail.warn("Stripe webhook missing signature");
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
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    logtail.error({ err }, "Stripe signature verification failed");
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
      logtail.error(
        { sessionId: session.id },
        "Stripe webhook missing userId"
      );

      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    // 🔒 Anti-doublon
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      logtail.info(
        { orderId: existingOrder.id },
        "Stripe webhook duplicate ignored"
      );

      return NextResponse.json({ received: true });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total ?? 0) / 100,
        status: "CONFIRMED",
        stripeSessionId: session.id,
      },
    });

    logtail.info(
      {
        orderId: order.id,
        userId,
        amount: order.total,
      },
      "Order created from Stripe webhook"
    );

    // 🛒 Cart metadata (optionnel)
    if (session.metadata?.cart) {
      try {
        JSON.parse(session.metadata.cart);
      } catch (err) {
        logtail.warn(
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
