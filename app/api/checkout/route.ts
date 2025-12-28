// /api/checkout-session/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST() {
  try {
    const cookieStore = cookies()
    const authCookie = cookieStore.get("auth")

    if (!authCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: authCookie.value },
      select: { id: true, email: true },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 })
    }

    // 🧪 TEST SIMPLE — UNE LIGNE
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: { name: "Commande DIVN" },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ]

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: user.id,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("❌ CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: "Checkout failed" },
      { status: 500 }
    )
  }
      }
                      
