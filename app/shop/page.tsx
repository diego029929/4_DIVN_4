"use client";

import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import ProductsGrid from "@/components/products-grid";

export const dynamic = "force-dynamic";

interface BoutiquePageProps {
  searchParams?: {
    category?: string;
  };
}

export default function BoutiquePage({ searchParams }: BoutiquePageProps) {
  const category = searchParams?.category
    ? decodeURIComponent(searchParams.category)
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


