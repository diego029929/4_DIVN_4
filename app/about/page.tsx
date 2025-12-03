"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">À propos de nous</h1>
          <p className="text-muted-foreground">
            Nous sommes une entreprise dédiée à [...]
          </p>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
