// products.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  category: "homme" | "femme" | "accessoires";
  images: string[];
  sizes?: string[];
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  { id: "1", name: "Écharpe Solis", description: "Écharpe chaude et élégante", priceInCents: 2990, category: "accessoires", images: ["image1.jpg"], inStock: true },
  // ...autres produits
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
