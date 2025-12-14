import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

export async function POST(req: Request) {
  try {
    // Récupérer l'email du client depuis le cookie
    const email = cookies().get("user-email")?.value;
    if (!email) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }

    const { items } = await req.json();
    // items = [
    //   { name: "Produit 1", price: 1000, fabricantPart: 300, fabricantStripeAccount: "acct_XXX" },
    //   { name: "Produit 2", price: 2000, fabricantPart: 500, fabricantStripeAccount: "acct_XXX" }
    // ]

    if (!items || !items.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // Calculer les totaux
    let total = 0;
    let fabricantTotal = 0;
    let fabricantStripeAccount = "";

    items.forEach((item) => {
      total += item.price;
      fabricantTotal += item.fabricantPart;
      fabricantStripeAccount = item.fabricantStripeAccount; // un seul fabricant ici
    });

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: 1,
      })),
      payment_intent_data: {
        application_fee_amount: total - fabricantTotal, // ton gain
        transfer_data: {
          destination: fabricantStripeAccount, // part fabricant
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
        }
        
