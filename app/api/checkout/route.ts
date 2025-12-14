import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  try {
    // Récupérer correctement le cookie
    const cookieStore = await cookies(); // <- await ici
    const email = cookieStore.get("user-email")?.value;

    if (!email) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const body = await req.json();
    const items: {
      name: string;
      price: number;
      quantity: number;
      manufacturerShare?: number;
    }[] = body.items;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const application_fee_amount = items.reduce((acc, item) => {
      const share = item.manufacturerShare ?? 0;
      return acc + Math.round(item.price * share * 100 * item.quantity);
    }, 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      payment_intent_data: { application_fee_amount },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Erreur checkout:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
      }
        
