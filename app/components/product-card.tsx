"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { type Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group overflow-hidden border border-border/40 bg-card transition-all duration-300 hover:border-primary/50">
        <CardContent className="p-0">
          
          {/* IMAGE */}
          <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
            <Image
              src={product.images?.[0] ?? "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* BADGE RUPTURE */}
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <span className="text-sm font-semibold">Rupture de stock</span>
              </div>
            )}
          </div>

          {/* INFOS PRODUIT */}
          <div className="p-4 space-y-2">

            {/* NOM */}
            <h3 className="font-medium transition-colors group-hover:text-primary">
              {product.name}
            </h3>

            {/* CATÉGORIE */}
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.category}
            </p>

            {/* DESCRIPTION */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            {/* PRIX */}
            <p className="text-lg font-semibold text-primary">
              {formatPrice(product.priceInCents)}
            </p>
          </div>

        </CardContent>
      </Card>
    </Link>
  );
}
