import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import Image from "next/image";

interface ProductPageProps {
  params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {product.category}
            </p>
          </div>

          <p className="text-lg text-muted-foreground">{product.description}</p>

          <AddToCartForm product={product} />

          <div className="border-t border-border/40 pt-6 space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Livraison</h3>
              <p className="text-sm text-muted-foreground">
                Livraison gratuite pour toute commande supérieure à 100€. Expédition sous 48h.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Retours</h3>
              <p className="text-sm text-muted-foreground">
                Retours gratuits sous 30 jours. Contactez-nous pour plus d'informations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
