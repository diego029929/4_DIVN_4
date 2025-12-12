// types et interface
export interface Product {
  id: number
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
  { id: 1, name: "T-Shirt Premium Noir", description: "T-shirt en coton premium...", priceInCents: 4900, category: "homme", images: ["/premium-black-tshirt-minimalist.jpg"], sizes: ["S","M","L","XL"], inStock: true, featured: true },
  { id: 2, name: "Hoodie Gold Edition", description: "Sweat à capuche exclusif...", priceInCents: 8900, category: "homme", images: ["/black-hoodie-with-gold-accents.jpg"], sizes: ["S","M","L","XL","XXL"], inStock: true, featured: true },
  // ... continue pour tous les produits
]

// fonctions utilitaires
export function getProductById(id: number): Product | undefined {
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
