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

  // Redirection si non connecté
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
    <main className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre panier</h1>

      {items.length === 0 ? (
        <p className="text-lg text-gray-600">Votre panier est vide.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.productId + (item.size ?? "")}
              className="flex justify-between items-center border rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{item.name}</p>
                  {item.size && (
                    <p className="text-gray-500 text-sm">Taille : {item.size}</p>
                  )}
                  <p className="text-gray-700 text-sm">
                    {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-lg">
                  {((item.priceInCents * item.quantity) / 100).toFixed(2)} €
                </span>
                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="text-red-500 hover:text-red-700 transition-colors"
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
        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
          <span className="text-2xl font-bold">Total : {total} €</span>
          <button
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
            className="px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            {loading ? "Redirection..." : "Payer maintenant"}
          </button>
        </div>
      )}
    </main>
  );
}
