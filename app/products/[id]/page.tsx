import { getProductById, formatPrice } from "@/lib/products";
import { notFound } from "next/navigation";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-4">{formatPrice(product.priceInCents)}</p>
      <img src={product.images[0]} className="mt-4 w-64 rounded-lg" />
    </div>
  );
}
