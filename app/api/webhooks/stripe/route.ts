import { NextRequest, NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { logtail } from "lib/logger";
import { createGelatoOrder } from "@/lib/gelato";
import type Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // 🔒 Anti-doublon
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      return NextResponse.json({ received: true });
    }

    // ✅ Création commande interne
    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total ?? 0) / 100,
        status: "CONFIRMED",
        stripeSessionId: session.id,
      },
    });

    try {
      // 🚀 CRÉATION COMMANDE GELATO
      const gelatoOrder = await createGelatoOrder({
        externalId: order.id,
        items: [
          {
            productUid: "GELATO_PRODUCT_UID",
            variantUid: "GELATO_VARIANT_UID",
            quantity: 1,
            files: [
              {
                url: session.metadata?.printFileUrl, // IMPORTANT
              },
            ],
          },
        ],
        shippingAddress: {
          firstName: session.shipping_details?.name,
          addressLine1: session.shipping_details?.address?.line1,
          city: session.shipping_details?.address?.city,
          postalCode: session.shipping_details?.address?.postal_code,
          country: session.shipping_details?.address?.country,
        },
      });

      // 💾 Sauvegarde lien Gelato
      await prisma.order.update({
        where: { id: order.id },
        data: {
          gelatoOrderId: gelatoOrder.id,
          status: "PRINTING",
        },
      });
    } catch (err) {
      logtail.error({ err, orderId: order.id }, "Gelato order failed");
      Sentry.captureException(err);

      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PRINT_FAILED" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
