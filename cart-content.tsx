"use client"

import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/products"
import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { CheckoutButton } from "@/components/checkout-button"

export function CartContent() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground mb-6">Votre panier est vide</p>
        <Link href="/boutique">
          <Button>Continuer vos achats</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item, index) => (
          <Card key={`${item.productId}-${item.size}-${index}`}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="relative w-24 h-32 flex-shrink-0 overflow-hidden rounded-md bg-secondary">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      {item.size && <p className="text-sm text-muted-foreground">Taille: {item.size}</p>}
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId, item.size)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="font-semibold">{formatPrice(item.priceInCents * item.quantity)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card className="sticky top-20">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-bold">Résumé</h2>

            <div className="space-y-2 border-b border-border/40 pb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Livraison</span>
                <span>Gratuite</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(totalPrice)}</span>
            </div>

            <CheckoutButton />

            <Link href="/boutique">
              <Button variant="outline" className="w-full bg-transparent">
                Continuer vos achats
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
