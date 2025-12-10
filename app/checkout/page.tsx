"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import { CheckoutForm } from "@/components/checkout-form";

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>
          <CheckoutForm />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
