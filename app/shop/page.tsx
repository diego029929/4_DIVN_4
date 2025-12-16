import Header from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/components/cart-provider";
import ProductsGrid from "@/components/products-grid";
import { cookies } from "next/headers"; // lecture serveur
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

interface BoutiquePageProps {
  searchParams?: { category?: string };
}

export default async function BoutiquePage({ searchParams }: BoutiquePageProps) {
  // ⚠️ côté serveur
  const cookieStore = cookies();
  const authCookie = cookieStore.get("auth");
  const isAuthenticated = Boolean(authCookie?.value);

  const category = searchParams?.category
    ? decodeURIComponent(searchParams.category)
    : "Tous les produits";

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} /> {/* 👈 passe la prop */}
        <main className="pt-20 bg-black min-h-screen text-white">
          <h1 className="text-3xl font-bold mb-6">{category}</h1>
          <ProductsGrid />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
                                                              }
    
