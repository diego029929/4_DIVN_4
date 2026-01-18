// app/api/checkout/route.ts
import { NextResponse } from "next/server"
import { auth } from "auth"
import { stripe } from "@/lib/stripe"

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "Non authentifié" },
      { status: 401 }
    )
  }

  const { items } = await req.json()

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

  return NextResponse.json({ url: checkoutSession.url })
}
