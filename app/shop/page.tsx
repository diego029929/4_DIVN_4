"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { logtail } from "@/lib/logger";

import ProductsGrid from "@/components/products-grid";
import { useSearchParams } from "next/navigation";

export default function BoutiquePage() {
  const searchParams = useSearchParams();

  const category = searchParams?.get("category")
    ? decodeURIComponent(searchParams.get("category")!)
    : "Tous les produits";

  useEffect(() => {
    // 🔹 Log côté client
    logtail.info("Boutique page mounted", { category });
    Sentry.addBreadcrumb({
      category: "page",
      message: `Boutique page loaded - category: ${category}`,
      level: "info",
    });

    // 🔹 Appel côté serveur pour déclencher les logs API
    fetch("/api/shop")
      .then(() => {
        logtail.info("Call to /api/shop succeeded");
      })
      .catch((error) => {
        logtail.warn("Call to /api/shop failed", { error });
        // Sentry capture optional
        Sentry.captureException(error);
      });
  }, [category]);

  return (
    <main className="pt-20 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">{category}</h1>
      <ProductsGrid />
    </main>
  );
}
