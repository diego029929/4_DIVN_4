import { useEffect, useState } from "react";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {

  // Image au début, vidéo ensuite
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 2000); // 2 secondes avant la vidéo

    return () => clearTimeout(timer);
  }, []);

  // Quand la vidéo se termine → on revient à l'image
  const handleVideoEnd = () => {
    setShowVideo(false);
  };

  return (
    <main className="pt-20 bg-neutral-900 min-h-screen text-white">

      {/* IMAGE / VIDEO AVEC RETOUR A L'IMAGE */}
      <div className="w-full">
        {!showVideo ? (
          <img
            src="image1.jpg"
            className="w-full h-154 md:h-96 object-cover"
            alt="Image principale"
          />
        ) : (
          <video
            src="/video.mp4"
            className="w-full h-154 md:h-96 object-cover"
            autoPlay
            muted
            playsInline
            onEnded={handleVideoEnd}   // ⬅ REVIENT À L’IMAGE
          />
        )}
      </div>

      {/* TRI */}
      <div className="flex items-center justify-end px-4 py-4">
        <select className="border p-2 rounded-lg bg-neutral-800 text-white border-neutral-600">
          <option>Pertinence</option>
          <option>Prix croissant</option>
          <option>Prix décroissant</option>
        </select>
      </div>

      {/* GRILLE DE PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-16">

        <ProductCard
          product={{
            id: "1",
            name: "Écharpe Solis",
            description: "Écharpe chaude et élégante",
            priceInCents: 2990,
            images: ["image1.jpg"],
            inStock: true,
            category: "accessoires",
          }}
        />

        <ProductCard
          product={{
            id: "2",
            name: "Écharpe chaleurur",
            description: "Modèle doux et premium",
            priceInCents: 2599,
            images: ["https://via.placeholder.com/300x300?text=Produit+2A"],
            inStock: true,
            category: "accessoires",
          }}
        />

        <ProductCard
          product={{
            id: "3",
            name: "Écharpe Eryos",
            description: "Version luxe haute qualité",
            priceInCents: 3990,
            images: ["https://via.placeholder.com/300x300?text=Produit+3A"],
            inStock: true,
            category: "accessoires",
          }}
        />

        <ProductCard
          product={{
            id: "4",
            name: "Écharpe Oslo",
            description: "Confort et chaleur premium",
            priceInCents: 4990,
            images: ["https://via.placeholder.com/300x300?text=Produit+4A"],
            inStock: true,
            category: "accessoires",
          }}
        />

        <ProductCard
          product={{
            id: "5",
            name: "Écharpe Liora",
            description: "Design élégant et intemporel",
            priceInCents: 2990,
            images: ["https://via.placeholder.com/300x300?text=Produit+5A"],
            inStock: true,
            category: "accessoires",
          }}
        />

      </div>
    </main>
  );
            }
