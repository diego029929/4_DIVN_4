"use client"

import { useCart } from "@/components/cart-provider"
import { ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeaderCart() {
  let totalItems = 0

  // Vérifie si useCart est disponible
  try {
    const cart = useCart()
    totalItems = cart.totalItems
  } catch {
    // useCart appelé avant que le provider soit monté
    return null
  }

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>
    </Link>
  )
}
