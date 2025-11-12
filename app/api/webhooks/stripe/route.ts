import { type NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { notifyManufacturer } from "@/lib/email"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET || "")
  } catch (err) {
    console.error("[v0] Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    console.log("[v0] Payment successful for session:", session.id)

    // Retrieve line items from the session
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id)

    const items = lineItems.data.map((item) => ({
      productId: item.price?.product as string,
      productName: item.description || "Produit",
      quantity: item.quantity || 1,
      size: item.description?.includes("Taille:") ? item.description.split("Taille: ")[1] : undefined,
      price: item.amount_total,
    }))

    // Notify manufacturer
    try {
      await notifyManufacturer({
        orderId: session.id,
        customerEmail: session.customer_details?.email || "client@example.com",
        items,
        totalAmount: session.amount_total || 0,
        orderDate: new Date(),
      })
      console.log("[v0] Manufacturer notified successfully")
    } catch (error) {
      console.error("[v0] Failed to notify manufacturer:", error)
    }
  }

  return NextResponse.json({ received: true })
}
