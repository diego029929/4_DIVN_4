"use client"

import { useState } from "react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"

function formatCents(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  })
}

export function CheckoutForm() {
  const { items, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    if (items.length === 0) return

    try {
      setLoading(true)

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ IMPORTANT POUR NEXTAUTH
        body: JSON.stringify({ items }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error("Checkout error:", data)
        alert(data?.error || "Erreur lors du paiement")
        return
      }

      if (!data?.url) {
        alert("Session Stripe invalide")
        return
      }

      // ✅ Redirection Stripe
      window.location.href = data.url
    } catch (err) {
      console.error("Checkout error:", err)
      alert("Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return <p className="text-neutral-400">Votre panier est vide.</p>
  }

  return (
    <div className="space-y-6 max-w-lg">
      {items.map((item) => (
        <div
          key={`${item.productId}-${item.size ?? "default"}`}
          className="flex justify-between text-sm"
        >
          <span>
            {item.name}
            {item.size && (
              <span className="text-neutral-400"> ({item.size})</span>
            )}{" "}
            × {item.quantity}
          </span>
          <span>{formatCents(item.priceInCents * item.quantity)}</span>
        </div>
      ))}

      <div className="flex justify-between font-semibold text-lg border-t border-neutral-800 pt-4">
        <span>Total</span>
        <span>{formatCents(totalPrice)}</span>
      </div>

      <Button className="w-full" onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirection..." : "Payer"}
      </Button>
    </div>
  )
}
