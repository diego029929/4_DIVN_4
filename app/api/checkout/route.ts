import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(req: Request) {
  console.log("🔥 CHECKOUT HIT")

  try {
    // 1️⃣ Session
    const session = await getServerSession(authOptions)
    console.log("SESSION:", session)

    if (!session) {
      console.log("❌ NO SESSION")
      return NextResponse.json({ error: "NO_SESSION" }, { status: 401 })
    }

    // 2️⃣ Body
    const body = await req.json()
    console.log("BODY:", body)

    const items = body.items

    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("❌ INVALID ITEMS")
      return NextResponse.json({ error: "INVALID_ITEMS" }, { status: 400 })
    }

    // 3️⃣ Line items
    const lineItems = items.map((item: any) => {
      console.log("ITEM:", item)

      return {
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      }
    })

    console.log("LINE ITEMS:", lineItems)

    // 4️⃣ STRIPE (SI TU NE VOIS PAS CE LOG → STRIPE PAS APPELÉ)
    console.log("🚀 CALLING STRIPE")

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: session.user?.email ?? undefined,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    })

    console.log("✅ STRIPE SESSION CREATED:", stripeSession.id)

    return NextResponse.json({ url: stripeSession.url })
  } catch (err: any) {
    console.error("💥 CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: err.message || "UNKNOWN_ERROR" },
      { status: 500 }
    )
  }
}
