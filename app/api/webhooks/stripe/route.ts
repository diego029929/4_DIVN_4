import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { notifyManufacturer, notifyCustomer } from "@/lib/email"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    )
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    )
  }

  // Quand le paiement est complété
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    console.log("[v0] Payment successful for session:", session.id)

    // Récupérer le panier depuis metadata si existant
    let items: any[] = []
    if (session.metadata?.cart) {
      try {
        items = JSON.parse(session.metadata.cart)
      } catch (e) {
        console.error("[v0] Failed to parse cart metadata:", e)
      }
    }

    // Notify manufacturer / fournisseur
    try {
      await notifyManufacturer({
        orderId: session.id,
        customerEmail: session.customer_email || "client@example.com",
        items,
        totalAmount: session.amount_total || 0,
        orderDate: new Date(),
      })
      console.log("[v0] Manufacturer notified successfully")
    } catch (error) {
      console.error("[v0] Failed to notify manufacturer:", error)
    }

    // Notify customer / client
    try {
      await notifyCustomer({
        orderId: session.id,
        customerEmail: session.customer_email || "client@example.com",
        items,
        totalAmount: session.amount_total || 0,
        estimatedDelivery: "5-7 jours ouvrés", // tu peux adapter
      })
      console.log("[v0] Customer notified successfully")
    } catch (error) {
      console.error("[v0] Failed to notify customer:", error)
    }
  }

  return NextResponse.json({ received: true })
}
