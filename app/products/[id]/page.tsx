// app/products/[id]/page.tsx
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartForm } from "@/components/add-to-cart-form";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) {
    notFound(); // renvoie un 404 si produit introuvable
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE */}
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

        {/* INFOS */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
