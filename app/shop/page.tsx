import { Header } from "@/components/header";
import { SideMenu } from "@/components/side-menu";
import { ProductCard } from "@/components/product-card";

export default function ShopPage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      <SideMenu />
      <Header />

      {/* MAIN IMAGE */}
      <div className="w-full">
        <img
          src="/image1.jpg"
          className="w-full h-64 object-cover"
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
          title="Écharpe Solis"
          price="29,90"
          images={[
            "https://via.placeholder.com/300x300?text=Produit+1A",
            "https://via.placeholder.com/300x300?text=Produit+1B",
            "https://via.placeholder.com/300x300?text=Produit+1C",
            "https://via.placeholder.com/300x300?text=Produit+1D",
          ]}
        />

        <ProductCard
          title="Écharpe Veyra"
          price="25,99"
          images={[
            "https://via.placeholder.com/300x300?text=Produit+2A",
            "https://via.placeholder.com/300x300?text=Produit+2B",
            "https://via.placeholder.com/300x300?text=Produit+2C",
            "https://via.placeholder.com/300x300?text=Produit+2D",
          ]}
        />

        <ProductCard
          title="Écharpe Eryos"
          price="39,90"
          images={[
            "https://via.placeholder.com/300x300?text=Produit+3A",
            "https://via.placeholder.com/300x300?text=Produit+3B",
            "https://via.placeholder.com/300x300?text=Produit+3C",
            "https://via.placeholder.com/300x300?text=Produit+3D",
          ]}
        />
      </div>
    </main>
  );
      }
          
