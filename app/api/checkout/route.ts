import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    console.log("SESSION:", session)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const { items } = await req.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Panier vide" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true },
    })

    if (!user?.email) {
      return NextResponse.json(
        { error: "Utilisateur invalide" },
        { status: 401 }
      )
    }

    const line_items = items.map((item: any, index: number) => {
      if (
        !item.name ||
        !Number.isInteger(item.priceInCents) ||
        !Number.isInteger(item.quantity) ||
        item.quantity <= 0
      ) {
        throw new Error(`Item invalide index ${index}`)
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      }
    })

    console.log("LINE ITEMS:", line_items)

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId: user.id,
      },
    })

    console.log("STRIPE SESSION:", stripeSession.id)

    return NextResponse.json({ url: stripeSession.url })
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err)
    return NextResponse.json(
      { error: err.message || "Checkout failed" },
      { status: 500 }
    )
  }
}
