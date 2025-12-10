"use client";
import { useCart } from "@/components/cart-provider";

export function CartContent() {
  const { items } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  // Calcul du total en centimes
  const totalInCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );

  // Conversion en euros
  const total = (totalInCents / 100).toFixed(2);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contenu du panier</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.productId} className="flex justify-between border-b pb-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{((item.priceInCents * item.quantity) / 100).toFixed(2)} €</span>
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
