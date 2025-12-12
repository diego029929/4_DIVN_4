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
  {
    id: "1",
    name: "Écharpe Solis",
    description: "Écharpe chaude et élégante",
    priceInCents: 2990,
    category: "accessoires",
    images: ["/images/echarpe.jpg"],
    inStock: true,
  },
  {
    id: "2",
    name: "Pull Nova",
    description: "Pull doux et confortable",
    priceInCents: 4990,
    category: "femme",
    images: ["/images/pull.jpg"],
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(cat: Product["category"]): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInCents / 100);
}
