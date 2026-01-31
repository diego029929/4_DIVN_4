"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { CartContent } from "@/components/cart-content";

export default function CartClient() {
  const { data: session, status } = useSession();
  const { items } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  const handleCheckout = async () => {
    if (loading || items.length === 0) return;
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error("Stripe session invalid");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert("Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>

      <CartContent />

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleCheckout}
          disabled={loading || items.length === 0}
          className="px-8 py-4 bg-white text-black font-bold"
        >
          {loading ? "Redirection..." : "Passer la commande"}
        </button>
      </div>
    </main>
  );
}
