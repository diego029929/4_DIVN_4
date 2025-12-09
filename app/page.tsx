import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
  return (
<main className="pt-20 bg-gray-100 min-h-screen">

      {/* MAIN IMAGE */}
      <div className="w-full">
        <img
          src="image1.jpg"
          className="w-full h-180 object-cover"
        />
      </div>

      {/* TRI */}
      <div className="flex items-center justify-between px-4 py-4">
        <a
          href="/"
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          Accueil
        </a>

        <select className="border p-2 rounded-lg">
          <option>Pertinence</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
        </select>
      </div>

      {/* PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-16">
        
        <ProductCard
          product={{
            id: "1",
            name: "Écharpe Solis",
            description: "Écharpe chaude et élégante",
            priceInCents: 2990,
            images: ["image1.jpg"],
            inStock: true,
            category: "femme",
          }}
        />

        <ProductCard
          product={{
            id: "2",
            name: "Écharpe Veyra",
            description: "Modèle doux et premium",
            priceInCents: 2599,
            images: [
              "https://via.placeholder.com/300x300?text=Produit+2A"
            ],
            inStock: true,
            category: "femme",
          }}
        />

        <ProductCard
          product={{
            id: "3",
            name: "Écharpe Eryos",
            description: "Version luxe haute qualité",
            priceInCents: 3990,
            images: [
              "https://via.placeholder.com/300x300?text=Produit+3A"
            ],
            inStock: true,
            category: "femme",
          }}
        />

      </div>
    </main>
  );
}
