import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import type Stripe from "stripe"

export const runtime = "nodejs" // ⚠️ IMPORTANT POUR STRIPE

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err)
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    )
  }

  // ✅ Paiement confirmé
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId
    if (!userId) {
      console.error("❌ userId manquant dans metadata")
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      )
    }

    // 🔹 Sécurité anti-doublon
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    })

    if (existingOrder) {
      return NextResponse.json({ received: true })
    }

    // 🔹 Création de la commande
    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total ?? 0) / 100,
        status: "CONFIRMED",
        stripeSessionId: session.id,
      },
    })

    console.log("✅ Commande créée :", order.id)

    // 🔹 Récupération du panier depuis metadata (optionnel)
    let items: any[] = []

    if (session.metadata?.cart) {
      try {
        items = JSON.parse(session.metadata.cart)
      } catch (err) {
        console.error("❌ Erreur parsing cart metadata", err)
      }
    }
  }

  // ⚠️ Stripe exige toujours un 200
  return NextResponse.json({ received: true })
        }
        
