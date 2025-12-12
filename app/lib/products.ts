// types et interface
export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
  category: "homme" | "femme" | "accessoires"
  images: string[]
  sizes?: string[]
  inStock: boolean
  featured?: boolean
}

// liste des produits
export const PRODUCTS: Product[] = [
  // (tes produits ici, exactement comme tu m’as envoyé)
]

// fonctions utilitaires
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter((p) => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured)
}

export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(priceInCents / 100)
}
