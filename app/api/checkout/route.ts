import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    // 🔹 1. Vérification session NextAuth
    const session = await getServerSession(authOptions)

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "NOT_AUTHENTICATED" },
        { status: 401 }
      )
    }

    // 🔹 2. Lecture du body
    let body: any
    try {
      body = await req.json()
    } catch {
      return NextResponse.json(
        { error: "INVALID_JSON_BODY" },
        { status: 400 }
      )
    }

    const items = body.items

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "EMPTY_CART" },
        { status: 400 }
      )
    }

    // 🔹 3. Construction sécurisée des line_items
    const lineItems = items.map((item: any) => {
      if (
        typeof item.name !== "string" ||
        typeof item.priceInCents !== "number" ||
        typeof item.quantity !== "number"
      ) {
        throw new Error("INVALID_CART_ITEM")
      }

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      }
    })

    // 🔹 4. Appel Stripe (ICI STRIPE EST APPELÉ)
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userEmail: session.user.email,
        cart: JSON.stringify(items),
      },
    })

    // 🔹 5. Réponse frontend
    return NextResponse.json({
      url: stripeSession.url,
    })
  } catch (err: any) {
    console.error("❌ CHECKOUT ERROR:", err)

    return NextResponse.json(
      {
        error: "CHECKOUT_FAILED",
        message: err?.message ?? "Unknown error",
      },
      { status: 500 }
    )
  }
}
