"use client";

import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import ProductsGrid from "@/components/products-grid";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function BoutiquePage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category")
    ? decodeURIComponent(searchParams.get("category")!)
    : "Tous les produits";

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={false} />
        <main className="pt-20 bg-black min-h-screen text-white">
          <h1 className="text-3xl font-bold mb-6">{category}</h1>
          <ProductsGrid />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
