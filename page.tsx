import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts } from "@/lib/products"
import Link from "next/link"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "url('/luxury-fashion-dark-minimalist.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-10 text-center space-y-6 px-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-wider text-balance">DIVN</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Élévez votre style avec notre collection exclusive
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link href="/boutique">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Découvrir la collection
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline">
                  En savoir plus
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits en vedette</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez notre sélection exclusive de pièces premium
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/boutique">
              <Button variant="outline" size="lg">
                Voir tous les produits
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="bg-card py-16 border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Qualité Premium</h3>
                <p className="text-sm text-muted-foreground">Matériaux nobles et finitions soignées</p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Livraison Rapide</h3>
                <p className="text-sm text-muted-foreground">Expédition sous 48h partout en Europe</p>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold">Retours Gratuits</h3>
                <p className="text-sm text-muted-foreground">30 jours pour changer d'avis</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
