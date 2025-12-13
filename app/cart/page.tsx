
"use client";

import { useEffect, useState } from "react";
import { CartContent } from "@/components/cart-content";
import { useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // rien côté serveur

  const handleCheckout = async () => {
    // Vérifie si l'utilisateur est connecté
    const res = await fetch("/api/check-session"); // à créer côté API
    const data = await res.json();

    if (!data.loggedIn) {
      // redirige vers login si non connecté
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.userEmail }),
      });

      const checkoutData = await res.json();
      if (checkoutData.url) {
        window.location.href = checkoutData.url;
      } else {
        alert("Erreur lors de la création de la session de paiement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors du paiement.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
      <CartContent />

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
