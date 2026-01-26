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
    description: "Écharpe chaude et élégante, idéale pour l’hiver avec un style intemporel.",
    priceInCents: 2990,
    category: "accessoires",
    images: ["/images/echarpe-solis.jpg"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Écharpe Eryos",
    description: "Modèle premium à la texture douce, pensé pour un confort maximal au quotidien.",
    priceInCents: 3490,
    category: "accessoires",
    images: ["/images/echarpe-eryos.jpg"],
    inStock: true,
  },
  {
    id: "3",
    name: "Écharpe Liora",
    description: "Design élégant et moderne, parfaite pour compléter une tenue raffinée.",
    priceInCents: 2790,
    category: "accessoires",
    images: ["/images/echarpe-liora.jpg"],
    inStock: true,
  },
  {
    id: "4",
    name: "Écharpe Oslo",
    description: "Écharpe épaisse et enveloppante, conçue pour affronter le froid avec style.",
    priceInCents: 3990,
    category: "accessoires",
    images: ["/images/echarpe-oslo.jpg"],
    inStock: true,
  },
  {
    id: "5",
    name: "Écharpe Veyra",
    description: "Modèle minimaliste et léger, idéale pour la mi-saison et les looks sobres.",
    priceInCents: 2590,
    category: "accessoires",
    images: ["/images/echarpe-veyra.jpg"],
    inStock: true,
  },
];

/* ============================
   FONCTIONS UTILITAIRES
============================ */

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(
  cat: Product["category"]
): Product[] {
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
