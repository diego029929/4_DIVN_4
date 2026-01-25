// app/api/checkout/route.ts

import * as Sentry from "@sentry/nextjs"
import { logtail } from "@/lib/logger"

import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  logtail.info("Checkout API called")

  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      logtail.warn("Unauthorized checkout attempt")

      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      )
    }

    const { items } = await req.json()

    logtail.info("Creating Stripe checkout session", {
      userEmail: session.user.email,
      itemsCount: items?.length,
    })

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
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

    logtail.info("Stripe checkout session created", {
      sessionId: checkoutSession.id,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    Sentry.captureException(error)

    logtail.error("Checkout failed", {
      error,
    })

    return NextResponse.json(
      { error: "Erreur lors de la création du paiement" },
      { status: 500 }
    )
  }
}

    
