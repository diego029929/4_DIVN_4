// /api/checkout-session/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"

export async function POST() {
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

  // ⚠️ EXEMPLE — adapte avec ton panier réel
  const lineItems = [
    {
      price_data: {
        currency: "eur",
        product_data: {
          name: "Commande DIVN",
        },
        unit_amount: 2000, // 20€
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
      userId: user.id, // 🔥 CRUCIAL
    },
  })

  return NextResponse.json({ url: session.url })
    }
    
