import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const items = body.items || []

    // Vérification du cookie auth
    const cookieStore = cookies()
    const authCookie = cookieStore.get("auth")
    console.log("🔹 Auth cookie:", authCookie?.value)

    if (!authCookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    // Récupération de l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: authCookie.value },
      select: { id: true, email: true },
    })
    console.log("🔹 User found:", user)

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 })

    if (!items || items.length === 0) {
      console.log("❌ Panier vide ou invalide")
      return NextResponse.json({ error: "Panier vide" }, { status: 400 })
    }

    // Transformation du panier en line_items Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: item.priceInCents,
      },
      quantity: item.quantity,
    }))
    console.log("🔹 Line items:", lineItems)

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
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
    })

    console.log("✅ Session Stripe créée:", session.id)

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error("❌ Checkout session error:", err)
    return NextResponse.json({ error: err.message || "Checkout failed" }, { status: 500 })
  }
      }
    
