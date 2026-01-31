"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { status } = useSession();
  const { items, removeItem } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Redirection si pas connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return null;

  const totalInCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );
  const total = (totalInCents / 100).toFixed(2);

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
      if (!res.ok || !data.url) throw new Error();
      window.location.href = data.url;
    } catch {
      alert("Erreur lors du paiement");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-semibold mb-8">Votre panier</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Votre panier est vide.</p>
      ) : (
        <>
          {/* LIGNES PRODUITS */}
          <ul className="space-y-4 text-sm">
            {items.map((item) => (
              <li
                key={item.productId + (item.size ?? "")}
                className="flex items-center gap-4"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                {/* Nom + taille */}
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.size && (
                    <p className="text-gray-400 text-xs">Taille : {item.size}</p>
                  )}
                </div>

                {/* Quantité × prix unitaire */}
                <span className="text-gray-300 text-sm">
                  {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                </span>

                {/* Bouton supprimer */}
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-gray-400 hover:text-red-500"
                  aria-label="Supprimer"
                >
                  <FaTrash size={16} />
                </button>

                {/* Prix total */}
                <span className="font-semibold text-sm">
                  {((item.priceInCents * item.quantity) / 100).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>

          {/* TOTAL + CHECKOUT */}
          <div className="flex justify-between items-center pt-6 border-t border-white/20 mt-8">
            <span className="text-xl font-bold">{total} €</span>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-6 py-3 bg-white text-black font-semibold rounded"
            >
              {loading ? "Redirection..." : "Payer maintenant"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
