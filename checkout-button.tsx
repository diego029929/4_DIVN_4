"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function CheckoutButton() {
  const { items } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Votre panier est vide",
        variant: "destructive",
      })
      return
    }

    router.push("/checkout")
  }

  return (
    <Button size="lg" className="w-full" onClick={handleCheckout} disabled={items.length === 0}>
      Passer au paiement
    </Button>
  )
}
