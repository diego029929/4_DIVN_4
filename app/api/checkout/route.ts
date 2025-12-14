import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // version Stripe compatible
});

export async function POST(req: Request) {
  try {
    // Récupérer l'email du client depuis le cookie
    const cookieStore = cookies();
    const email = cookieStore.get("user-email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const body = await req.json();
    const items: {
      name: string;
      price: number;
      quantity: number;
      manufacturerShare?: number; // % du fabricant
    }[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Préparer les produits pour Stripe
    const line_items = items.map((item) => {
      const unitAmount = Math.round(item.price * 100); // en cents
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Calcul de la part fabricant (optionnel)
    const application_fee_amount = items.reduce((acc, item) => {
      const share = item.manufacturerShare ?? 0;
      return acc + Math.round((item.price * share) * 100 * item.quantity);
    }, 0);

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      payment_intent_data: {
        application_fee_amount, // part fabricant
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur checkout:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
  
