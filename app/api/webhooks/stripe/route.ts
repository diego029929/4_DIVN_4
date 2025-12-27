import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import type Stripe from "stripe"
import { notifyManufacturer, notifyCustomer } from "@/lib/email"

export const runtime = "nodejs" // ⚠️ IMPORTANT POUR STRIPE

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 })
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

  // ✅ PAIEMENT CONFIRMÉ
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.metadata?.userId

    if (!userId) {
      console.error("❌ userId manquant dans metadata")
      return NextResponse.json({ error: "Missing userId" }, { status: 400 })
    }

    // 🔹 Sécurité : éviter doublons Stripe
    const existingOrder = await prisma.order.findFirst({
      where: { stripeSessionId: session.id },
    })

    if (existingOrder) {
      return NextResponse.json({ received: true })
    }

    // 🔹 Création commande
    const order = await prisma.order.create({
      data: {
        userId,
        total: (session.amount_total ?? 0) / 100,
        status: "CONFIRMED",
        stripeSessionId: session.id,
      },
    })

    console.log("✅ Commande créée :", order.id)

    // 🔹 Panier (si envoyé dans metadata)
    let items: any[] = []

    if (session.metadata?.cart) {
      try {
        items = JSON.parse(session.metadata.cart)
      } catch (err) {
        console.error("❌ Erreur parsing cart metadata", err)
      }
    }

    // 🔹 Emails (non bloquants)
    try {
      await notifyManufacturer({
        orderId: order.id,
        customerEmail: session.customer_email || "client@example.com",
        items,
        totalAmount: order.total,
        orderDate: new Date(),
      })
    } catch (err) {
      console.error("❌ Email fournisseur failed", err)
    }

    try {
      await notifyCustomer({
        orderId: order.id,
        customerEmail: session.customer_email || "client@example.com",
        items,
        totalAmount: order.total,
        estimatedDelivery: "5–7 jours ouvrés",
      })
    } catch (err) {
      console.error("❌ Email client failed", err)
    }
  }

  // ⚠️ STRIPE EXIGE TOUJOURS 200
  return NextResponse.json({ received: true })
    }
      
