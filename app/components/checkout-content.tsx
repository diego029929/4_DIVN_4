"use client";

import { useCart } from "@/context/cart-context";

export function CheckoutContent() {
  const { items, total } = useCart();

  if (items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Récapitulatif du panier</h2>

      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg">
            <div className="flex justify-between">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold">
        Total : {total.toFixed(2)} €
      </h3>
    </div>
  );
}
  
