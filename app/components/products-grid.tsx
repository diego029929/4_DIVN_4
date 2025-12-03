"use client";

import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductsGridProps {
  products?: Product[];
}

export default function ProductsGrid({ products = [] }: ProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-10">
        Aucun produit disponible pour le moment.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition"
        >
          <div className="relative w-full h-64 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-muted-foreground">{product.price} €</p>

          <button className="mt-4 w-full px-4 py-2 bg-black text-white rounded-lg">
            Ajouter au panier
          </button>
        </div>
      ))}
    </div>
  );
}
