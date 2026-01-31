"use client";

import { useCart } from "@/components/cart-provider";
import { FaTrash } from "react-icons/fa"; // icône "supprimer"

export function CartContent() {
  const { items, removeItem } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  const totalInCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );
  const total = (totalInCents / 100).toFixed(2);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contenu du panier</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productId + (item.size ?? "")}
            className="flex items-center justify-between border p-2 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                {item.size && <p className="text-sm text-gray-500">Taille : {item.size}</p>}
                <p className="text-sm">
                  Quantité : {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold">{((item.priceInCents * item.quantity) / 100).toFixed(2)} €</span>
              <button
                onClick={() => removeItem(item.productId, item.size)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold flex justify-between pt-4 border-t">
        <span>Total :</span>
        <span>{total} €</span>
      </div>
    </div>
  );
}
