import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { stripe } from "@/lib/stripe"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    // Récupère le panier envoyé depuis le frontend
    const body = await req.json()
    const items = body.items || []

    // Auth via cookie
    const cookieStore = cookies()
    const authCookie = cookieStore.get("auth")
    if (!authCookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    // Récupère l'utilisateur
    const user = await prisma.user.findUnique({
      where: { id: authCookie.value },
      select: { id: true, email: true },
    })
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 401 })

    if (items.length === 0) return NextResponse.json({ error: "Panier vide" }, { status: 400 })

    // Transforme le panier en line_items Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: item.priceInCents, // ⚠️ en centimes
      },
      quantity: item.quantity,
    }))

    console.log("✅ Auth cookie:", authCookie.value)
    console.log("✅ User:", user)
    console.log("✅ Line items:", lineItems)

    // Crée la session Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: user.id,
        cart: JSON.stringify(items), // pour webhook
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("❌ Checkout session error:", err)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
