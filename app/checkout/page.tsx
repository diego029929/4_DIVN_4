// app/checkout/page.tsx
"use client";

import dynamic from "next/dynamic";

const CheckoutForm = dynamic(() => import("@/components/checkout-form"), {
  ssr: false, // never render server-side
});

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
