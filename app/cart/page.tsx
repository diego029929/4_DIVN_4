"use client";

import { useEffect, useState } from "react";
import { CartContent } from "@/components/cart-content";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react"; // si tu utilises next-auth

export const dynamic = "force-dynamic";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession(); // récupère l'utilisateur connecté

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleCheckout = async () => {
    if (!session?.user?.email) {
      // utilisateur non connecté → redirige vers login
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirection vers Stripe
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
