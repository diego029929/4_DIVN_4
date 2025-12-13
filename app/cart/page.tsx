"use client";

import { useEffect, useState } from "react";
import { CartContent } from "@/components/cart-content";

// Empêche toute tentative de prerender côté serveur
export const dynamic = "force-dynamic";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // ⛔ Rien côté serveur → safe build

  // Fonction pour lancer le paiement
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirection vers Stripe
      } else {
        alert("Erreur lors de la création de la session de paiement.")
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors du paiement.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
      <CartContent />

      {/* Bouton payer maintenant */}
      <div className="mt-8">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Chargement..." : "Payer maintenant"}
        </button>
      </div>
    </main>
  );
}
