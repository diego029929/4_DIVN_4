"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";

export default function SuccessPage() {
  const { clearCart } = useCart();

  // Le paiement est confirmé par Stripe : on vide le panier local.
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container mx-auto px-4 py-32 text-center text-white">
      <h1 className="text-4xl font-bold mb-4">Merci pour votre commande</h1>
      <p className="text-neutral-400 mb-10">
        Votre paiement est confirmé. Vous allez recevoir un email récapitulatif.
      </p>
      <Link href="/shop" className="px-8 py-4 bg-white text-black font-bold">
        Continuer mes achats
      </Link>
    </main>
  );
}
