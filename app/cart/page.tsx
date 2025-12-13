
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

  if (!mounted) return null; // ⛔ évite tout SSR / prerender

  const handleCheckout = async () => {
    if (loading) return; // ⛔ évite double clic
    setLoading(true);

    try {
      // 1️⃣ Vérifier la session utilisateur
      const sessionRes = await fetch("/api/check-session", {
        method: "GET",
        cache: "no-store",
      });

      if (!sessionRes.ok) {
        throw new Error("Session check failed");
      }

      const sessionData = await sessionRes.json();

      if (!sessionData.loggedIn) {
        router.push("/login");
        return;
      }

      // 2️⃣ Créer la session Stripe
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!checkoutRes.ok) {
        throw new Error("Checkout creation failed");
      }

      const checkoutData = await checkoutRes.json();

      if (!checkoutData.url) {
        throw new Error("No checkout URL returned");
      }

      // 3️⃣ Redirection Stripe
      window.location.href = checkoutData.url;
    } catch (error) {
      console.error("[CART_CHECKOUT_ERROR]", error);
      alert("Une erreur est survenue lors du paiement. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>

      <CartContent />

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="px-8 py-4 bg-black text-white font-bold rounded-lg
                     hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirection..." : "Payer maintenant"}
        </button>
      </div>
    </main>
  );
}
