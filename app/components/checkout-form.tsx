"use client";

import { CartItem, useCart } from "@/context/cart-context";
import { useState } from "react";

interface CheckoutFormProps {
  items: CartItem[];
}

export function CheckoutForm({ items }: CheckoutFormProps) {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // redirige vers Stripe
      } else {
        setError("Erreur lors de la création du paiement");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Chargement..." : "Payer"}
      </button>
    </div>
  );
                 }
