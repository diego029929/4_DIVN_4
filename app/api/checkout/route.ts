import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { stripe } from "@/lib/stripe";
import { logtail } from "lib/logger";

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

    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      logtail.warn("Checkout refusé : panier vide", {
        userEmail: session.user.email,
      });

      return NextResponse.json(
        { error: "Panier invalide" },
        { status: 400 }
      );
    }

    logtail.info("Création session Stripe", {
      userEmail: session.user.email,
      itemsCount: items.length,
    });

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        userEmail: session.user.email,
      },
    });

    logtail.info("Session Stripe créée avec succès", {
      sessionId: checkoutSession.id,
      userEmail: session.user.email,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    logtail.error("Erreur lors du checkout", {
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
  
