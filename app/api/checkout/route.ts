import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { stripe } from "@/lib/stripe"
import { logtail } from "@/lib/logger"
import * as Sentry from "@sentry/nextjs"

export async function POST(req: Request) {
  try {
    logtail.info("🛒 Début checkout")

    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      logtail.warn("⛔ Utilisateur non authentifié")

      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    const { items } = await req.json()

    if (!items || items.length === 0) {
      logtail.warn("🛑 Panier vide ou invalide")
      return NextResponse.json(
        { error: "Panier invalide" },
        { status: 400 }
      )
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),

      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,

      metadata: {
        userEmail: session.user.email,
      },
    })

    logtail.info("✅ Session Stripe créée", {
      sessionId: checkoutSession.id,
      email: session.user.email,
    })

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error) {
    Sentry.captureException(error)

    logtail.error("❌ Erreur checkout", {
      error: error instanceof Error ? error.message : error,
    })

    return NextResponse.json(
      { error: "Erreur lors du paiement" },
      { status: 500 }
    )
  } finally {
    await logtail.flush()
  }
}
