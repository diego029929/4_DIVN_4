"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { type Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative group card-glow rounded-xl"
      >
        <Card className="overflow-hidden border border-neutral-700 bg-neutral-800 text-white transition-all duration-300 hover:border-primary/70 rounded-xl relative z-10">
          <CardContent className="p-0">

            {/* IMAGE */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
              <Image
                src={product.images?.[0] ?? "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* RUPTURE */}
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <span className="text-sm font-semibold">Rupture de stock</span>
                </div>
              )}
            </div>

            {/* INFOS */}
            <div className="p-4 space-y-2">
              <h3 className="font-medium transition-colors group-hover:text-primary">
                {product.name}
              </h3>

              <p className="text-xs uppercase tracking-wide text-neutral-400">
                {product.category}
              </p>

              <p className="text-sm text-neutral-400 line-clamp-2">
                {product.description}
              </p>

              <p className="text-lg font-semibold text-primary">
                {formatPrice(product.priceInCents)}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
                }
                
