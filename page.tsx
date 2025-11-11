import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">À propos de DIVN</h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p className="text-lg leading-relaxed">
                DIVN est né d'une passion pour la mode intemporelle et le design minimaliste. Nous croyons que la vraie
                élégance réside dans la simplicité et la qualité.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Notre Vision</h2>
              <p className="leading-relaxed">
                Créer des pièces qui transcendent les tendances éphémères. Chaque produit DIVN est conçu pour durer,
                tant par sa qualité que par son style intemporel.
              </p>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Nos Valeurs</h2>
              <ul className="space-y-3">
                <li className="leading-relaxed">
                  <strong className="text-foreground">Qualité Premium:</strong> Nous sélectionnons uniquement les
                  meilleurs matériaux et travaillons avec des artisans qualifiés.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-foreground">Design Minimaliste:</strong> Chaque détail a sa raison d'être. Pas
                  de superflu, seulement l'essentiel.
                </li>
                <li className="leading-relaxed">
                  <strong className="text-foreground">Durabilité:</strong> Nous créons des pièces conçues pour durer,
                  réduisant l'impact environnemental de la mode jetable.
                </li>
              </ul>

              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Notre Engagement</h2>
              <p className="leading-relaxed">
                Nous nous engageons à offrir une expérience client exceptionnelle, de la découverte de nos produits
                jusqu'à leur livraison. Votre satisfaction est notre priorité absolue.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
