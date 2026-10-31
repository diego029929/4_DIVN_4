import Stripe from "stripe"

let stripeClient: Stripe | null = null

// Créé à la première utilisation : le build ne plante plus
// quand STRIPE_SECRET_KEY n'est pas définie.
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY")
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    })
  }

  return stripeClient
}
