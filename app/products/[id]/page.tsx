import { getProductById } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = getProductById(Number(id));

  if (!product) {
    return (
      <main className="pt-20 text-white">
        <h1 className="text-center text-2xl">Produit introuvable</h1>
      </main>
    );
  }

  return (
    <main className="pt-20 text-white px-4">
      <ProductCard product={product} />
    </main>
  );
}
