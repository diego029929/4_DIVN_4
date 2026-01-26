"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getAllProducts, formatPrice } from "@/lib/products";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const products = getAllProducts();

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query)
  );

  return (
    <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto text-white">
      <h1 className="text-3xl font-semibold mb-10">
        Résultats pour “{query}”
      </h1>

      {results.length === 0 ? (
        <p className="text-neutral-400">
          Aucun produit ne correspond à votre recherche.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-neutral-400">
                  {product.category}
                </p>
                <h2 className="text-lg font-medium mt-1">
                  {product.name}
                </h2>
                <p className="text-neutral-300 mt-1">
                  {formatPrice(product.priceInCents)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
