"use client";

import { useCart } from "@/context/cart-context";

export function CartContent() {
  const { items, total } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Résumé du panier</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{(item.price * item.quantity).toFixed(2)} €</span>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold flex justify-between pt-4 border-t">
        <span>Total :</span>
        <span>{total.toFixed(2)} €</span>
      </div>
    </div>
  );
}
