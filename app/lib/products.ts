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
  {
    id: "tee-premium-noir",
    name: "T-Shirt Premium Noir",
    description:
      "T-shirt en coton premium avec une coupe moderne et un design minimaliste. Parfait pour un look décontracté mais élégant.",
    priceInCents: 4900,
    category: "homme",
    images: ["/premium-black-tshirt-minimalist.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    featured: true,
  },
  {
    id: "hoodie-gold-edition",
    name: "Hoodie Gold Edition",
    description:
      "Sweat à capuche exclusif avec détails dorés. Confort ultime et style premium pour vos journées décontractées.",
    priceInCents: 8900,
    category: "homme",
    images: ["/black-hoodie-with-gold-accents.jpg"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    featured: true,
  },
  {
    id: "robe-elegante-noire",
    name: "Robe Élégante Noire",
    description:
      "Robe sophistiquée en tissus nobles. Design intemporel pour toutes les occasions spéciales.",
    priceInCents: 12900,
    category: "femme",
    images: ["/elegant-black-dress-minimalist.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
    featured: true,
  },
  {
    id: "top-premium-blanc",
    name: "Top Premium Blanc",
    description: "Top en soie premium avec une coupe flatteuse. Élégance et confort au quotidien.",
    priceInCents: 6900,
    category: "femme",
    images: ["/white-premium-silk-top.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
  },
  {
    id: "casquette-signature",
    name: "Casquette Signature",
    description:
      "Casquette premium avec logo DIVN brodé. Accessoire parfait pour compléter votre look.",
    priceInCents: 3900,
    category: "accessoires",
    images: ["/premium-black-cap-with-gold-logo.jpg"],
    inStock: true,
    featured: true,
  },
  {
    id: "sac-leather-noir",
    name: "Sac Cuir Premium",
    description:
      "Sac en cuir véritable noir avec finitions dorées. Design intemporel et pratique.",
    priceInCents: 15900,
    category: "accessoires",
    images: ["/premium-black-leather-bag-gold-details.jpg"],
    inStock: true,
    featured: true,
  },
  {
    id: "veste-oversized",
    name: "Veste Oversized",
    description: "Veste oversized en coton épais. Style streetwear haut de gamme.",
    priceInCents: 14900,
    category: "homme",
    images: ["/oversized-black-jacket-streetwear.jpg"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: "pantalon-cargo",
    name: "Pantalon Cargo Premium",
    description:
      "Pantalon cargo avec coupe moderne. Confort et style pour toutes les occasions.",
    priceInCents: 7900,
    category: "homme",
    images: ["/premium-black-cargo-pants.jpg"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
  },
  {
    id: "pull-cachemire",
    name: "Pull Cachemire Noir",
    description: "Pull en cachemire pur. Douceur et chaleur pour les saisons froides.",
    priceInCents: 18900,
    category: "femme",
    images: ["/black-cashmere-sweater.jpg"],
    sizes: ["XS", "S", "M", "L"],
    inStock: true,
  },
  {
    id: "lunettes-soleil",
    name: "Lunettes de Soleil Premium",
    description: "Lunettes de soleil avec verres polarisés et monture noire mat.",
    priceInCents: 8900,
    category: "accessoires",
    images: ["/premium-black-sunglasses.jpg"],
    inStock: true,
  },
  {
    id: "ceinture-cuir",
    name: "Ceinture Cuir Premium",
    description: "Ceinture en cuir italien avec boucle dorée. Accessoire essentiel.",
    priceInCents: 5900,
    category: "accessoires",
    images: ["/premium-black-leather-belt-gold-buckle.jpg"],
    inStock: true,
  },
  {
    id: "jeans-noir-slim",
    name: "Jean Noir Slim",
    description: "Jean noir en denim premium avec coupe slim moderne.",
    priceInCents: 9900,
    category: "homme",
    images: ["/premium-black-slim-jeans.jpg"],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
  },
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
    
