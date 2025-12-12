import { getProductById } from "@/data/products";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  const product = getProductById(params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-xl object-cover"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-gray-600">{product.description}</p>

          <p className="text-2xl font-semibold mt-6">
            {(product.priceInCents / 100).toFixed(2)} €
          </p>

          {product.sizes?.length ? (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Tailles disponibles</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-4 py-2 rounded-lg border cursor-pointer hover:bg-gray-100"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
