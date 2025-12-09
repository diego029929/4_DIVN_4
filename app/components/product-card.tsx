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
        className="relative group"
      >
        {/* ANNEAU BRILLANT ANIMÉ */}
        <div className="absolute inset-0 rounded-xl pointer-events-none before:absolute before:inset-0 before:rounded-xl before:border before:border-transparent before:animate-spin-slow before:bg-[conic-gradient(from_0deg,transparent,transparent,transparent,#ffffff30,transparent,transparent)]"></div>

        <Card className="group overflow-hidden border border-neutral-700 bg-neutral-800 text-white transition-all duration-300 hover:border-primary/70 rounded-xl relative z-10">
          <CardContent className="p-0">

            {/* IMAGE */}
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
              <Image
                src={product.images?.[0] ?? "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* BADGE RUPTURE */}
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                  <span className="text-sm font-semibold">Rupture de stock</span>
                </div>
              )}
            </div>

            {/* INFOS PRODUIT */}
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
            <Link href={`/product/${product.id}`}>
  <div className="card-glow">
    <Card className="group overflow-hidden border border-border/40 bg-card transition-all duration-300 hover:border-primary/50">
      <CardContent className="p-0">
        
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}

/* ANIMATION SPIN LENTE */
/* Dans globals.css ou tailwind config: 
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin-slow 6s linear infinite;
}
*/
