import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
        },
        unit_amount: item.priceInCents, // ✅ FIX MAJEUR
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("STRIPE ERROR:", err);
    return NextResponse.json(
      { error: "Erreur Stripe" },
      { status: 500 }
    );
  }
}
