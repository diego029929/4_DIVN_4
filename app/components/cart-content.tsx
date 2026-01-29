"use client";

import { useCart } from "@/components/cart-provider";
import { FaTrash } from "react-icons/fa";

export function CartContent() {
  const { items, removeItem } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  const total = (
    items.reduce(
      (sum, item) => sum + item.priceInCents * item.quantity,
      0
    ) / 100
  ).toFixed(2);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Votre panier</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={`${item.productId}-${item.size}`}
            className="flex items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            {/* Infos produit */}
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>

              {item.size && (
                <p className="text-sm text-gray-500">
                  Taille : {item.size}
                </p>
              )}

              <p className="text-sm text-gray-600">
                Quantité : {item.quantity}
              </p>

              <p className="font-semibold mt-1">
                {((item.priceInCents * item.quantity) / 100).toFixed(2)} €
              </p>
            </div>

            {/* Bouton supprimer */}
            <button
              onClick={() => removeItem(item.productId, item.size)}
              className="text-red-500 hover:text-red-700 transition"
              aria-label="Supprimer"
            >
              <FaTrash size={18} />
            </button>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex justify-between text-xl font-bold pt-4 border-t">
        <span>Total :</span>
        <span>{total} €</span>
      </div>
    </div>
  );
}
