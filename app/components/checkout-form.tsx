"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

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
      {/* Liste des articles */}
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
              {formatPrice(item.priceInCents * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between font-semibold text-lg border-t border-neutral-800 pt-4">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>

      {/* Paiement */}
      <Button className="w-full">
        Payer
      </Button>
    </div>
  );
            }
        
