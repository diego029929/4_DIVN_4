"use client";

import { useCart } from "@/context/cart-context";

export function CheckoutContent() {
  const { items, total } = useCart(); // fonctionne maintenant côté client

  if (items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Résumé de la commande</h2>

      <ul className="space-y-4 mb-6">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>{item.name} × {item.quantity}</span>
            <span>{item.price * item.quantity}€</span>
          </li>
        ))}
      </ul>

      <p className="text-xl font-bold">
        Total : {total}€
      </p>
    </div>
  );
}
