import Image from "next/image";
import { getProductById, formatPrice } from "@/lib/products";
import { AddToCartForm } from "@/components/add-to-cart-form";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);

  // 🚫 PAS DE 404
  if (!product) {
    return (
      <main className="pt-32 text-white text-center">
        <h1 className="text-3xl font-semibold">Produit introuvable</h1>
        <p className="text-neutral-400 mt-4">
          Ce produit n’est plus disponible.
        </p>
      </main>
    );
  }

  return (
    <main className="pt-24 px-6 max-w-6xl mx-auto text-white">
      <div className="grid md:grid-cols-2 gap-16">

        {/* IMAGE */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* INFOS */}
        <div className="flex flex-col gap-8">

          <div>
            <p className="uppercase text-xs tracking-widest text-neutral-400 mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold">{product.name}</h1>
          </div>

          <p className="text-neutral-300 leading-relaxed">
            {product.description}
          </p>

          <p className="text-3xl font-semibold">
            {formatPrice(product.priceInCents)}
          </p>

          {/* TAILLES */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-sm mb-2 text-neutral-400">
                Tailles disponibles
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="border border-neutral-600 px-4 py-2 rounded-lg text-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AJOUT PANIER */}
          <AddToCartForm product={product} />

          {/* INFOS */}
          <div className="border-t border-neutral-800 pt-6 text-sm text-neutral-400 space-y-2">
            <p>Livraison gratuite dès 100€</p>
            <p>Retours sous 30 jours</p>
            <p>Paiement sécurisé</p>
          </div>
        </div>
      </div>
    </main>
  );
}
  
