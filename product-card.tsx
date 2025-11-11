"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { type Product, formatPrice } from "@/lib/products"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-border/40 bg-card hover:border-primary/50 transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="text-sm font-semibold">Rupture de stock</span>
              </div>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-medium text-balance group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            <p className="text-lg font-semibold text-primary">{formatPrice(product.priceInCents)}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
