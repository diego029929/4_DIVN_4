// app/(client)/client-layout.tsx
"use client";
import { ReactNode } from "react";
import { CartProvider } from "@/components/cart-provider";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
