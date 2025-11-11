"use client"

import { useCart } from "@/components/cart-provider"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/products"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { StripeCheckout } from "@/components/stripe-checkout"

export function CheckoutForm() {
  const { items, totalPrice } = useCart()
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (items.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Résumé de commande</h2>
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={`${item.productId}-${item.size}-${index}`} className="flex justify-between text-sm">
                <span>
                  {item.name} {item.size && `(${item.size})`} x {item.quantity}
                </span>
                <span>{formatPrice(item.priceInCents * item.quantity)}</span>
              </div>
            ))}
            <div className="border-t border-border/40 pt-3 flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <StripeCheckout />
    </div>
  )
}
