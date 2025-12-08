"use client";

import  Header  from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
import ProductsGrid from "@/components/products-grid"; // exemple

export const dynamic = "force-dynamic";

export default function BoutiquePage({ searchParams }: any) {
  const category = searchParams?.category
    ? decodeURIComponent(searchParams.category)
    : "Tous les produits";

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">{category}</h1>
          <ProductsGrid />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
