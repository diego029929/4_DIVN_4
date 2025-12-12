export interface Product {
  id: string; // RESTE string ici
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
  { id: "2", name: "Écharpe chaleurur", description: "Modèle doux et premium", priceInCents: 2599, category: "accessoires", images: ["image2.jpg"], inStock: true },
  // ...etc
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
