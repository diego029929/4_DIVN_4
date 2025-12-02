"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartContent } from "@/components/cart-content";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
          <CartContent />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
