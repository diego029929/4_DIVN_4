import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { stripe } from "@/lib/stripe";
import * as Sentry from "@sentry/nextjs";
import { logtail } from "@/lib/logger";

export async function POST(req: Request) {
  try {
    // 🔐 Auth
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

    // 🧠 Metadata GELATO (utilisée dans le webhook Stripe)
    const cartMetadata = items.map((item: any) => ({
      gelatoProductId: item.gelatoProductId,
      gelatoVariantId: item.gelatoVariantId,
      quantity: item.quantity,
      printFileUrl: item.printFileUrl, // 🔥 indispensable
    }));

    // 💳 Création session Stripe
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      // 🧾 Produits affichés côté Stripe
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

      // 📦 Adresse requise (Gelato)
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU"],
      },
      billing_address_collection: "required",

      // 👤 Client
      customer_email: session.user.email,

      // 🔁 Redirections
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,

      // 🧠 Metadata lue par le webhook Stripe
      metadata: {
        userId: session.user.id,
        cart: JSON.stringify(cartMetadata),
      },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    Sentry.captureException(err);
    logtail.error({ err }, "Stripe checkout session creation failed");

    return NextResponse.json(
      { error: "Erreur paiement" },
      { status: 500 }
    );
  }
}
