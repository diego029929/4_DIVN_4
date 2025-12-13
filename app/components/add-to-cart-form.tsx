"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { type Product } from "@/lib/products"
import { useToast } from "@/hooks/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

      {/* TAILLES */}
      {product.sizes && (
        <div className="space-y-2">
          <label className="text-xs uppercase tracking-widest text-neutral-400">
            Taille
          </label>

          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="bg-neutral-900 border-neutral-700 hover:border-neutral-500 transition">
              <SelectValue placeholder="Choisir une taille" />
            </SelectTrigger>

            <SelectContent className="bg-neutral-900 border-neutral-700">
              {product.sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* BOUTON PANIER */}
      <Button
        size="lg"
        className="
          w-full
          rounded-full
          py-6
          text-sm
          uppercase
          tracking-widest
          bg-white
          text-black
          hover:bg-neutral-200
          transition
        "
        onClick={handleAddToCart}
        disabled={!product.inStock}
      >
        {product.inStock ? "Ajouter au panier" : "Rupture de stock"}
      </Button>

      {product.inStock && (
        <p className="text-xs text-green-500">
          En stock — expédition sous 48h
        </p>
      )}
    </div>
  )
}
