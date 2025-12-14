// app/checkout/page.tsx
"use client";

import dynamic from "next/dynamic";

const CheckoutForm = dynamic(
  () =>
    import("@/components/checkout-form").then((mod) => mod.CheckoutForm),
  { ssr: false }
);

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
