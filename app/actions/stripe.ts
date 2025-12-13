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
  // Récupération du panier depuis les cookies
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

  // Si le panier est vide, ajout d’un produit par défaut
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

  // Création des line_items pour Stripe
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

  // Vérification de la variable d'environnement
  if (!process.env.SUPPLIER_ACCOUNT_ID) {
    throw new Error("SUPPLIER_ACCOUNT_ID non défini dans les variables d'environnement")
  }

  // Création de la session Stripe
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    customer_email: "client@example.com", // ici récupère l'email du client connecté
    payment_intent_data: {
      transfer_data: {
        destination: process.env.SUPPLIER_ACCOUNT_ID!, // paiement automatique au fournisseur
      },
    },
    metadata: {
      source: "divn-ecommerce",
      cart: JSON.stringify(cartItems), // pour le webhook
    },
    success_url: "https://tonsite.com/success",
    cancel_url: "https://tonsite.com/cancel",
  })

  return session.client_secret
}
