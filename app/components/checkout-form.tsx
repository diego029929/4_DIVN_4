"use client";

import { useState } from "react";

interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  manufacturerShare?: number;
}

interface CheckoutFormProps {
  items: CheckoutItem[];
}

export function CheckoutForm({ items }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors du paiement");
        setLoading(false);
        return;
      }

      // Redirection vers Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      setError("Erreur réseau");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx} className="flex justify-between border-b py-2">
          <span>{item.name} x {item.quantity}</span>
          <span>${item.price * item.quantity}</span>
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-2 mt-4"
      >
        {loading ? "Chargement..." : "Payer"}
      </button>
    </div>
  );
}
