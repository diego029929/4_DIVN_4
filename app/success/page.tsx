"use client";

import { useEffect } from "react";

export default function SuccessPage() {
  useEffect(() => {
    console.log("Payment success page loaded");
  }, []);

  return (
    <div>
      <h1>Paiement confirmé ✅</h1>
      <p>Merci pour votre commande</p>
    </div>
  );
}
