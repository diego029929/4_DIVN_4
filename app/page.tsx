"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS } from "@/lib/products";

export default function ShopPage() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <main className="pt-20 bg-neutral-900 min-h-screen text-white">

      {/* IMAGE → VIDEO → IMAGE */}
      <div className="w-full">
        {!showVideo ? (
          <img
            src="/image1.jpg"
            className="w-full h-154 md:h-96 object-cover"
            alt="Image principale"
          />
        ) : (
          <video
            src="/video.mp4"
            className="w-full h-84 md:h-96 object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}
          />
        )}
      </div>

      {/* TRI */}
      <div className="flex items-center justify-end px-4 py-4">
        <select className="border p-2 rounded-lg bg-neutral-800 text-white border-neutral-600">
          <option>Pertinence</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
        </select>
      </div>

      {/* GRILLE DE PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-16">
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
