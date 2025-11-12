"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { type Product, formatPrice } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddToCartFormProps {
  product: Product
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast({
        title: "Veuillez sélectionner une taille",
        variant: "destructive",
      })
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      priceInCents: product.priceInCents,
      size: selectedSize || undefined,
      image: product.images[0],
    })

    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-3xl font-bold text-primary">{formatPrice(product.priceInCents)}</p>
      </div>

      {product.sizes && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Taille</label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner une taille" />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!product.inStock}>
        {product.inStock ? "Ajouter au panier" : "Rupture de stock"}
      </Button>

      {product.inStock && <p className="text-sm text-green-500">En stock - Expédition sous 48h</p>}
    </div>
  )
}
