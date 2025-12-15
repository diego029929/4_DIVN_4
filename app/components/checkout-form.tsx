"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";

function formatCents(priceInCents: number) {
  return (priceInCents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

export function CheckoutForm() {
  const { items, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <p className="text-neutral-400">
        Votre panier est vide.
      </p>
    );
  }

  return (
    <div className="space-y-6 max-w-lg">
      {/* Articles */}
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size ?? "default"}`}
            className="flex justify-between text-sm"
          >
            <span>
              {item.name}
              {item.size && (
                <span className="text-neutral-400"> ({item.size})</span>
              )}{" "}
              × {item.quantity}
            </span>

            <span>
              {formatCents(item.priceInCents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg border-t border-neutral-800 pt-4">
        <span>Total</span>
        <span>{formatCents(totalPrice)}</span>
      </div>

      {/* Paiement */}
      <Button className="w-full">
        Payer
      </Button>
    </div>
  );
        }
        
