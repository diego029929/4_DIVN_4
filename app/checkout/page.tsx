"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-8 text-4xl font-bold">Paiement</h1>
          <CheckoutForm />
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
