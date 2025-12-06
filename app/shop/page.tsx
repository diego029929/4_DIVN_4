import { Header } from "@/components/header";
import SideMenu from "@/components/side-menu";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, Product } from "@/lib/products";

export default function ShopPage() {
  return (
    <main className="pt-20 bg-white min-h-screen">
      {/* Side menu et header */}
      <SideMenu />
      <Header />

      {/* IMAGE PRINCIPALE */}
      <div className="w-full">
        <img
          src="/image1.jpg"
          alt="Image principale"
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
          <option value="pertinence">Pertinence</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      {/* PRODUITS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-16">
        {PRODUCTS.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
            }
        
