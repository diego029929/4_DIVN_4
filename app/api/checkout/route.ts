import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { stripe } from "@/lib/stripe";
import { logtail } from "lib/logger";
import * as Sentry from "@sentry/nextjs";

type CheckoutItem = {
  id: string;
  quantity: number;
};

const PRODUCTS = {
  prod_1: { name: "Produit A", price: 1999 },
  prod_2: { name: "Produit B", price: 4999 },
};

export async function POST(req: Request) {
  try {
    logtail.info("Checkout - tentative");

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      logtail.warn("Checkout refusé : utilisateur non authentifié");

      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { items }: { items: CheckoutItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Panier invalide" },
        { status: 400 }
      );
    }

    const line_items = items.map((item) => {
      const product = PRODUCTS[item.id];

      if (!product) {
        throw new Error(`Produit invalide: ${item.id}`);
      }

      if (item.quantity < 1 || item.quantity > 10) {
        throw new Error("Quantité invalide");
      }

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      client_reference_id: session.user.id,

      line_items,
      automatic_tax: { enabled: true },

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,

      metadata: {
        userEmail: session.user.email,
      },
    });

    logtail.info("Session Stripe créée", {
      sessionId: checkoutSession.id,
    });

    return NextResponse.json({ url: checkoutSession.url });

  } catch (error) {
    // 🔥 SENTRY
    Sentry.captureException(error, {
      tags: {
        area: "checkout",
      },
    });

    logtail.error("Erreur checkout", {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { error: "Erreur lors du paiement" },
      { status: 500 }
    );
  } finally {
    await logtail.flush();
  }
}
