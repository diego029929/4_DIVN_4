import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    // 1️⃣ Session NextAuth
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // 2️⃣ Body
    const body = await req.json()
    const items = body.items

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Panier vide ou invalide" },
        { status: 400 }
      )
    }

    // 3️⃣ Stripe line_items (SÉCURISÉ)
    const lineItems = items.map((item: any) => {
      if (
        !item.name ||
        typeof item.priceInCents !== "number" ||
        typeof item.quantity !== "number"
      ) {
        throw new Error("Item invalide dans le panier")
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

    // 4️⃣ Création session Stripe (🔥 ICI STRIPE EST APPELÉ)
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        email: session.user.email,
        cart: JSON.stringify(items),
      },
    })

    // 5️⃣ Retour URL Stripe
    return NextResponse.json({ url: stripeSession.url })
  } catch (err: any) {
    console.error("❌ STRIPE CHECKOUT ERROR:", err)

    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    )
  }
}
