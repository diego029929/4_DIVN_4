"use client";

import ProductsGrid from "@/components/products-grid";
import { useSearchParams } from "next/navigation";

export default function BoutiquePage() {
  const searchParams = useSearchParams();

  const category = searchParams?.get("category")
    ? decodeURIComponent(searchParams.get("category")!)
    : "Tous les produits";

  return (
    <main className="pt-20 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>
      <ProductsGrid />
    </main>
  );
}
