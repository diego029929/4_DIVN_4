// app/api/checkout/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { stripe } from "@/lib/stripe";
import * as Sentry from "@sentry/nextjs";
import { logtail } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { items } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Panier vide" },
        { status: 400 }
      );
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        userId: session.user.id,
        cart: JSON.stringify(
          items.map((item: any) => ({
            gelatoProductId: item.gelatoProductId,
            quantity: item.quantity,
          }))
        ),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    Sentry.captureException(err);
    logtail.error({ err }, "Stripe checkout failed");

    return NextResponse.json(
      { error: "Erreur paiement" },
      { status: 500 }
    );
  }
}
