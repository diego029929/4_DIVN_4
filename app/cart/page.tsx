"use client";

import { useEffect, useState } from "react";
import { CartContent } from "@/components/cart-content";

// Empêche toute tentative de prerender côté serveur
export const dynamic = "force-dynamic";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);

  // Attendre le montage client → évite l'erreur "useCart must be used within CartProvider"
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ Rien côté serveur → safe build

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
      <CartContent />
    </main>
  );
}
