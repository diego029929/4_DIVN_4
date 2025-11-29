"use client";

export const dynamic = "force-dynamic"; // Empêche le prerender côté serveur

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartContent } from "@/components/cart-content";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <CartContent />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
