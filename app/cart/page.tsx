"use client";

import { useCart } from "@/components/cart-provider";

export function CartContent() {
  const { items, removeItem } = useCart();

  if (!items || items.length === 0) {
    return <p className="text-white/70">Votre panier est vide.</p>;
  }

  const totalInCents = items.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
    0
  );

  const total = (totalInCents / 100).toFixed(2);

  return (
    <div className="space-y-6 text-white">
      {/* PRODUITS */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId + (item.size ?? "")}
            className="flex gap-4 border border-white/15 p-4"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover"
            />

            {/* TEXTE */}
            <div className="flex flex-col justify-between flex-1">
              <div>
                <p className="font-semibold uppercase">{item.name}</p>
                {item.size && (
                  <p className="text-sm text-white/60">
                    Taille : {item.size}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-white/80">
                  {item.quantity} × {(item.priceInCents / 100).toFixed(2)} €
                </span>

                <button
                  onClick={() => removeItem(item.productId, item.size)}
                  className="underline text-white/60 hover:text-white"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between items-center pt-6 border-t border-white/20 text-lg font-semibold">
        <span>Total</span>
        <span>{total} €</span>
      </div>
    </div>
  );
}
