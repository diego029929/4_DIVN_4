"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-provider";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function CartPage() {
  const { data: session, status } = useSession();
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
      const checkoutRes = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ items }),
      });

      const data = await checkoutRes.json();

      if (!checkoutRes.ok || !data.url) {
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
    <main className="max-w-5xl mx-auto px-4 py-12 text-white">
      <h1 className="text-4xl font-bold mb-8 text-white">Votre panier</h1>

      {items.length === 0 ? (
        <p className="text-lg text-gray-300">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-6">
          {items.map((item) => (
            <li
              key={item.productId + (item.size ?? "")}
              className="flex flex-col md:flex-row justify-between items-center bg-gray-900 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.name}</p>
                  {item.size && (
                    <p className="text-gray-400 text-sm">Taille : {item.size}</p>
                  )}
                  <p className="text-gray-300 text-sm">
                    {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 mt-4 md:mt-0">
                <span className="font-bold text-lg">
                  {((item.priceInCents * item.quantity) / 100).toFixed(2)} €
                </span>
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-red-500 hover:text-red-600 transition-colors"
                  aria-label="Supprimer du panier"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 gap-4">
          <span className="text-2xl font-bold">{total} €</span>
          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
          >
            {loading ? "Redirection..." : "Payer maintenant"}
          </button>
        </div>
      )}
    </main>
  );
}
