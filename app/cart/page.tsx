"use client";

import { useCart } from "@/context/cart-context";

export function CartContent() {
  const { items } = useCart(); // 🔹 retire `total` si ton contexte ne l’a pas

  if (!items || items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Résumé de commande</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between border-b pb-2">
            <span>{item.name} × {item.quantity}</span>
            <span>{item.price * item.quantity} €</span>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold flex justify-between pt-4 border-t">
        <span>Total :</span>
        <span>{totalPrice} €</span>
      </div>

      <button className="w-full bg-black text-white py-3 rounded-lg text-lg">
        Procéder au paiement
      </button>
    </div>
  );
}
