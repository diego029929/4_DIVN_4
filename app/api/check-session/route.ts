import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getServerSession } from "next-auth/next";
import { handler as authHandler } from "./auth/[...nextauth]"; // ton NextAuth existant

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 🔹 Récupération de la session NextAuth
    const sessionAuth = await getServerSession(authHandler);

    if (!sessionAuth?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const items = body.items || [];

    if (!items.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    // 🔹 Récupération de l'utilisateur depuis Prisma
    const user = await prisma.user.findUnique({
      where: { id: sessionAuth.user.id },
      select: { id: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // 🔹 Transformation du panier en line_items Stripe
    const lineItems = items.map((item: any) => {
      // Validation basique pour éviter des erreurs Stripe
      if (!item.name || !item.priceInCents || !item.quantity || item.quantity <= 0) {
        throw new Error("Invalid item in cart");
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      };
    });

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

    return NextResponse.json({ url: stripeSession.url });
  } catch (err: any) {
    console.error("❌ Checkout session error:", err);
    return NextResponse.json(
      { error: err.message || "Checkout failed" },
      { status: 500 }
    );
  }
        }
      
