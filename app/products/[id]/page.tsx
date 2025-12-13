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
      <main className="pt-32 pb-32 text-center text-white">
        <h1 className="text-3xl font-semibold">Produit introuvable</h1>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto text-white">
      <div className="grid lg:grid-cols-2 gap-20 items-start">

        {/* GALERIE MULTI-IMAGES (CSS only) */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-900">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* BADGE LUXE */}
            <span className="absolute top-4 left-4 bg-black/70 backdrop-blur px-4 py-1 text-xs uppercase tracking-widest rounded-full">
              Édition limitée
            </span>
          </div>

          {/* MINIATURES */}
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-20 aspect-square rounded-xl overflow-hidden bg-neutral-800 hover:ring-2 hover:ring-white transition"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* INFOS PRODUIT */}
        <div className="flex flex-col gap-10">

          {/* TITRE */}
          <div>
            <p className="uppercase tracking-[0.3em] text-xs text-neutral-400 mb-3">
              {product.category}
            </p>
            <h1 className="text-5xl font-semibold leading-tight">
              {product.name}
            </h1>
          </div>

          {/* PRIX */}
          <p className="text-3xl font-light">
            {formatPrice(product.priceInCents)}
          </p>

          {/* DESCRIPTION */}
          <p className="text-neutral-300 leading-relaxed max-w-xl">
            {product.description}
          </p>

          {/* TAILLES CLIQUABLES (CSS ONLY) */}
          {product.sizes && (
            <div>
              <p className="text-sm text-neutral-400 mb-4">
                Choisir une taille
              </p>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <label
                    key={size}
                    className="cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="size"
                      className="peer hidden"
                    />
                    <span className="px-6 py-2 rounded-full border border-neutral-600 text-sm transition
                      peer-checked:bg-white peer-checked:text-black
                      hover:border-white">
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* PANIER */}
          <AddToCartForm product={product} />

          {/* INFOS PREMIUM */}
          <div className="border-t border-neutral-800 pt-8 grid grid-cols-2 gap-6 text-sm text-neutral-400">
            <p>✓ Livraison offerte dès 100€</p>
            <p>✓ Retours sous 30 jours</p>
            <p>✓ Fabrication premium</p>
            <p>✓ Paiement sécurisé</p>
          </div>
        </div>
      </div>
    </main>
  );
}
