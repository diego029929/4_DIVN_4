import { NextResponse } from "next/server"
import { z } from "zod"
import * as Sentry from "@sentry/nextjs"
import { getStripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"
import { getSiteUrl } from "@/lib/site-url"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

// Le navigateur n'envoie que l'identifiant, la quantité et la taille.
// Le prix et le nom viennent TOUJOURS du catalogue côté serveur.
const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        quantity: z.number().int().min(1).max(10),
        size: z.string().max(20).optional(),
      })
    )
    .min(1)
    .max(30),
})

// Pays de livraison acceptés (à ajuster selon ce que propose ton imprimeur).
const SHIPPING_COUNTRIES = ["FR", "BE", "CH", "LU", "MC"] as const

export async function POST(req: Request) {
  try {
    const parsed = checkoutSchema.safeParse(await req.json().catch(() => null))

    if (!parsed.success) {
      return NextResponse.json({ error: "Panier invalide" }, { status: 400 })
    }

    const lineItems = []
    const cartSummary: { id: string; q: number; s?: string }[] = []

    for (const item of parsed.data.items) {
      const product = getProductById(item.productId)

      if (!product || !product.inStock) {
        return NextResponse.json(
          { error: "Un article de votre panier n'est plus disponible" },
          { status: 400 }
        )
      }

      if (product.sizes?.length && (!item.size || !product.sizes.includes(item.size))) {
        return NextResponse.json({ error: "Taille invalide" }, { status: 400 })
      }

      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.size ? `${product.name} (taille ${item.size})` : product.name,
          },
          unit_amount: product.priceInCents,
        },
        quantity: item.quantity,
      })

      cartSummary.push({ id: product.id, q: item.quantity, ...(item.size ? { s: item.size } : {}) })
    }

    const siteUrl = getSiteUrl(req)

    const checkoutSession = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [...SHIPPING_COUNTRIES],
      },
      phone_number_collection: { enabled: true },
      locale: "fr",
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      metadata: {
        // Résumé compact du panier, relu par le webhook (500 caractères max côté Stripe).
        cart: JSON.stringify(cartSummary).slice(0, 500),
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    Sentry.captureException(error)
    console.error("Erreur checkout", error)

    return NextResponse.json(
      { error: "Erreur lors du paiement" },
      { status: 500 }
    )
  }
}
