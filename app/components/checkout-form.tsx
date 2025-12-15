"use client";

import { useCart } from "@/components/cart-provider";
import { useState } from "react";

export function CheckoutForm() {
  const { items } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) {
      setError("Panier vide");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error("Stripe error");
      }

      window.location.href = data.url;
    } catch (e) {
      setError("Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-lg">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.name} × {item.quantity}
          </span>
          <span>{item.price * item.quantity}€</span>
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full bg-black text-white py-3 rounded disabled:opacity-50"
      >
        {loading ? "Paiement..." : "Payer"}
      </button>
    </div>
  );
    }
