"use client";

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS, getProductsByCategory } from "@/lib/products"
import { Button } from "@/components/ui/button"

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category

  const products = category ? getProductsByCategory(category) : PRODUCTS

  const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : "Tous les produits"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{categoryTitle}</h1>
          <p className="text-muted-foreground">
            {products.length} produit{products.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-4 mb-8 flex-wrap">
          <Button variant={!category ? "default" : "outline"} asChild>
            <a href="/boutique">Tout</a>
          </Button>
          <Button variant={category === "homme" ? "default" : "outline"} asChild>
            <a href="/boutique?category=homme">Homme</a>
          </Button>
          <Button variant={category === "femme" ? "default" : "outline"} asChild>
            <a href="/boutique?category=femme">Femme</a>
          </Button>
          <Button variant={category === "accessoires" ? "default" : "outline"} asChild>
            <a href="/boutique?category=accessoires">Accessoires</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
