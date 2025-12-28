import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 🔹 Récupération de la session NextAuth
    const sessionAuth = await getServerSession(authOptions);

    if (!sessionAuth?.user) {
      console.log("❌ User not authenticated");
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // 🔹 Récupération des items envoyés depuis le front
    const body = await req.json();
    const items = body.items || [];

    if (!items.length) {
      console.log("❌ Panier vide");
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // 🔹 Récupération de l'utilisateur dans la DB
    const user = await prisma.user.findUnique({
      where: { id: sessionAuth.user.id },
      select: { id: true, email: true },
    });

    if (!user) {
      console.log("❌ User not found in DB", sessionAuth.user.id);
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 🔹 Validation et transformation des items pour Stripe
    const lineItems = items.map((item: any, index: number) => {
      if (
        !item.name ||
        typeof item.priceInCents !== "number" ||
        !Number.isInteger(item.priceInCents) ||
        !item.quantity ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        throw new Error(`Invalid item at index ${index}: ${JSON.stringify(item)}`);
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.priceInCents, // déjà en centimes
        },
        quantity: item.quantity,
      };
    });

    console.log("🔹 Stripe line items:", lineItems);
    console.log("🔹 Customer email:", user.email);

    // 🔹 Création de la session Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: user.id,
        cart: JSON.stringify(items),
      },
    });

    console.log("✅ Stripe session created:", stripeSession.id);

    return NextResponse.json({ url: stripeSession.url });
  } catch (err: any) {
    console.error("❌ Checkout session error:", err);
    return NextResponse.json(
      { error: err.message || "Checkout failed" },
      { status: 500 }
    );
  }
    }
    
