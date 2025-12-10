"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartContent } from "@/components/cart-content";

// Indique à Next.js de ne pas prerender la page côté serveur
export const dynamic = "force-dynamic";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header avec accès au panier */}
      <Header />

      {/* Contenu principal */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
        <CartContent />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
