"use client";

import { useState } from "react";
import Image from "next/image";
import { getProductById, formatPrice } from "@/lib/products";
import { AddToCartForm } from "@/components/add-to-cart-form";

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <main className="pt-32 text-white text-center">
        <h1 className="text-3xl font-semibold">Produit introuvable</h1>
      </main>
    );
  }

  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <main className="pt-16 pb-24 px-6 max-w-6xl mx-auto text-white">

      <div className="grid md:grid-cols-2 gap-14 items-start">

        {/* IMAGES */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>

          {/* MINIATURES */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-28 rounded-lg overflow-hidden border transition
                    ${
                      activeImage === img
                        ? "border-white"
                        : "border-neutral-700 opacity-60 hover:opacity-100"
                    }`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFOS */}
        <div className="flex flex-col gap-8">

          <div>
            <p className="uppercase text-xs tracking-widest text-neutral-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-neutral-300 leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-medium">
            {formatPrice(product.priceInCents)}
          </p>

          {/* TAILLES CLIQUABLES */}
          {product.sizes && (
            <div>
              <p className="text-sm text-neutral-400 mb-3">
                Sélectionner une taille
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 rounded-full border text-sm transition-all
                      ${
                        selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-neutral-600 hover:border-white"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PANIER */}
          <AddToCartForm
            product={{
              ...product,
              selectedSize,
            }}
          />

          {/* INFOS LUXE */}
          <div className="border-t border-neutral-800 pt-6 text-sm text-neutral-400 space-y-2">
            <p>Livraison offerte dès 100€</p>
            <p>Retours sous 30 jours</p>
            <p>Paiement sécurisé & chiffré</p>
          </div>
        </div>
      </div>
    </main>
  );
}
