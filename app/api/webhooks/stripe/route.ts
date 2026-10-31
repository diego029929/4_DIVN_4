import { NextRequest, NextResponse } from "next/server"
import * as Sentry from "@sentry/nextjs"
import type Stripe from "stripe"
import { getStripe } from "@/lib/stripe"
import { sendEmail } from "@/lib/send-email"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function escapeHtml(value: string | null | undefined): string {
  return (value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function formatEuros(cents: number | null | undefined): string {
  return ((cents ?? 0) / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

async function handleCompletedCheckout(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return

  const stripe = getStripe()
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 })

  const shipping = session.shipping_details
  const address = shipping?.address
  const customerEmail = session.customer_details?.email

  const itemsHtml = lineItems.data
    .map(
      (li) =>
        `<li>${escapeHtml(li.description)} × ${li.quantity ?? 1} : ${formatEuros(li.amount_total)}</li>`
    )
    .join("")

  const addressHtml = [
    shipping?.name,
    address?.line1,
    address?.line2,
    `${address?.postal_code ?? ""} ${address?.city ?? ""}`.trim(),
    address?.country,
    session.customer_details?.phone,
  ]
    .filter(Boolean)
    .map((line) => escapeHtml(line))
    .join("<br/>")

  const orderHtml = `
    <p>Référence Stripe : <code>${escapeHtml(session.id)}</code></p>
    <ul>${itemsHtml}</ul>
    <p><strong>Total payé : ${formatEuros(session.amount_total)}</strong></p>
    <p><strong>Livraison :</strong><br/>${addressHtml}</p>
  `

  // 1. Notification à la marque (pour lancer l'impression / l'expédition)
  const shopEmail = process.env.ORDER_NOTIFICATION_EMAIL
  if (shopEmail) {
    await sendEmail({
      to: shopEmail,
      subject: `Nouvelle commande DIVN : ${formatEuros(session.amount_total)}`,
      html: `<h1>Nouvelle commande</h1><p>Client : ${escapeHtml(customerEmail)}</p>${orderHtml}`,
    })
  } else {
    console.warn("ORDER_NOTIFICATION_EMAIL non défini : commande visible uniquement dans Stripe")
  }

  // 2. Confirmation au client
  if (customerEmail) {
    await sendEmail({
      to: customerEmail,
      subject: "Merci pour votre commande DIVN",
      html: `<h1>Merci pour votre commande !</h1><p>Nous préparons votre commande et vous tiendrons informé(e) de l'expédition.</p>${orderHtml}`,
    })
  }
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    Sentry.captureException(err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded"
    ) {
      await handleCompletedCheckout(event.data.object as Stripe.Checkout.Session)
    }
  } catch (err) {
    // On renvoie 500 pour que Stripe réessaie plus tard.
    Sentry.captureException(err)
    console.error("Erreur traitement webhook Stripe", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
