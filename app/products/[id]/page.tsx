import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AddToCartForm } from "@/components/add-to-cart-form";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} width={500} height={500} />
          </div>
          <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <AddToCartForm product={product} />
          </div>
        </div>
      </main>
    </div>
  );
}
