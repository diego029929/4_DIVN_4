import "@/globals.css";
import type { ReactNode } from "react";
import { CartProvider } from "@/components/cart-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Inter } from "next/font/google";
import { Bebas_Neue } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata = {
  title: "DIVN",
  description: "Boutique DIVN",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${bebas.variable}`}>
      <body
        className="
          min-h-screen flex flex-col
          bg-[#0A0A0A] text-neutral-200
          antialiased
          transition-colors duration-300
          selection:bg-[#E6B400]/40 selection:text-white
        "
      >
        <CartProvider>
          <Header />

          <main
            className="
              flex-1
              px-4 sm:px-8 lg:px-16
              pt-6 sm:pt-10
            "
          >
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
