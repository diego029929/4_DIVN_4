"use server"

import { stripe } from "@/lib/stripe"
import { getProductById } from "@/lib/products"
import { cookies } from "next/headers"

interface CartItem {
  productId: string
  quantity: number
  size?: string
}

export async function createCheckoutSession() {
  const cookieStore = await cookies()
  const cartData = cookieStore.get("divn-cart")

  let cartItems: CartItem[] = []

  if (cartData) {
    try {
      cartItems = JSON.parse(cartData.value)
    } catch (e) {
      console.error("Failed to parse cart data:", e)
    }
  }

  if (cartItems.length === 0) {
    const defaultProduct = getProductById("tee-premium-noir")
    if (!defaultProduct) {
      throw new Error("No products available")
    }

    cartItems = [
      {
        productId: defaultProduct.id,
        quantity: 1,
      },
    ]
  }

  const lineItems = cartItems.map((item) => {
    const product = getProductById(item.productId)
    if (!product) {
      throw new Error(`Product with id "${item.productId}" not found`)
    }

    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: product.name,
          description: `${product.description}${item.size ? ` - Taille: ${item.size}` : ""}`,
        },
        unit_amount: product.priceInCents,
      },
      quantity: item.quantity,
    }
  })

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: lineItems,
    mode: "payment",
    metadata: {
      source: "divn-ecommerce",
      cart: JSON.stringify(cartItems), // on garde tout le panier
    },
    payment_intent_data: {
      transfer_data: {
        destination: process.env.SUPPLIER_ACCOUNT_ID, // Paiement automatique au fournisseur
      },
    },
  })

  return session.client_secret
}
