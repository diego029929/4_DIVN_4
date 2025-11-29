"use client";

export const dynamic = "force-dynamic"; // 🔥 empêche le prerender côté serveur

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckoutContent } from "@/components/checkout-content";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Paiement</h1>
        <CheckoutContent />
      </main>

      <Footer />
    </div>
  );
}
