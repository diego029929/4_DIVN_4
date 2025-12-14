"use client";

export const dynamic = "force-dynamic";

import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      <CheckoutForm />
    </main>
  );
}
