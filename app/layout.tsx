"use client";

import "./globals.css";
import { ReactNode } from "react";
import { CartProvider } from "@/context/cart-context";
import { Header } from "@/components/Header"; // majuscule pour être sûr
import { Footer } from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>DIVN</title>
        <meta name="description" content="Site DIVN" />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <CartProvider>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 sm:py-12">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
