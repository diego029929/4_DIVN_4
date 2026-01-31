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
    <main className="max-w-6xl mx-auto px-6 py-12 text-white">
      <h1 className="text-4xl font-semibold mb-10">Votre panier</h1>

      {items.length === 0 ? (
        <p className="text-gray-400">Votre panier est vide.</p>
      ) : (
        <>
          {/* HEADER */}
          <div className="grid grid-cols-[80px_1fr_180px_40px_120px] gap-6 text-sm uppercase text-gray-400 pb-4 border-b border-white/10">
            <span />
            <span>Produit</span>
            <span>Quantité</span>
            <span />
            <span className="text-right">Total</span>
          </div>

          {/* ITEMS */}
          <ul className="divide-y divide-white/10">
            {items.map((item) => (
              <li
                key={item.productId + (item.size ?? "")}
                className="grid grid-cols-[80px_1fr_180px_40px_120px] gap-6 items-center py-6"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                {/* Infos */}
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  {item.size && (
                    <span className="text-sm text-gray-400">
                      Taille : {item.size}
                    </span>
                  )}
                </div>

                {/* Quantité */}
                <span className="text-gray-300">
                  {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                </span>

                {/* Supprimer */}
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-gray-400 hover:text-red-500 transition"
                  aria-label="Supprimer"
                >
                  <FaTrash size={14} />
                </button>

                {/* Total */}
                <span className="text-right font-medium">
                  {((item.priceInCents * item.quantity) / 100).toFixed(2)} €
                </span>
              </li>
            ))}
          </ul>

          {/* FOOTER */}
          <div className="flex justify-between items-center pt-10 border-t border-white/10 mt-10">
            <span className="text-2xl font-semibold">
              Total : {total} €
            </span>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="px-10 py-4 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition"
            >
              {loading ? "Redirection..." : "Payer maintenant"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
