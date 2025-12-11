import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/add-to-cart-form";
import Image from "next/image";

export default function ProductPage({ params }: any) {
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
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <AddToCartForm product={product} />
        </div>
      </div>
    </main>
  );
}
