"use client";

import { useState } from "react";

export function CheckoutForm({ items }: { items: { name: string; price: number; quantity: number; manufacturerShare?: number }[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
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

      // Redirige vers Stripe
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      console.error(err);
      setError("Erreur serveur");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <div key={idx}>
          {item.name} x {item.quantity} - {item.price}€
        </div>
      ))}

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className="w-full bg-black text-white py-2"
      >
        {loading ? "Chargement..." : "Payer"}
      </button>
    </div>
  );
    }
