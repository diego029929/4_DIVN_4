"use client";
import { useCart } from "@/components/cart-provider";

export function CheckoutContent() {
  const { items } = useCart();

  if (!items?.length) {
    return <p className="text-lg">Votre panier est vide.</p>;
  }

  // Calcul du total depuis priceInCents
  const totalInCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );

  const formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Contenu du panier</h2>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between border-b pb-2"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>
              {formatter.format((item.priceInCents * item.quantity) / 100)}
            </span>
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold flex justify-between pt-4 border-t">
        <span>Total :</span>
        <span>{formatter.format(totalInCents / 100)}</span>
      </div>
    </div>
  );
}
