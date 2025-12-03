"use client";

import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
