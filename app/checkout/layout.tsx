"use client";

import { CartProvider } from "@/components/cart-provider";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartProvider>{children}</CartProvider>;
}
