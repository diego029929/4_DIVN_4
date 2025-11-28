"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context"; // adapter le chemin
import { useCart } from "@/hooks/use-cart";

export default function PrivacyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-12">
            <h1 className="text-4xl font-bold text-center">Politique de Confidentialité</h1>

            <article className="prose prose-invert max-w-none text-muted-foreground">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">1. Collecte des données</h2>
                <p>
                  DIVN collecte des données personnelles uniquement dans le cadre de la gestion des commandes et de
                  l'amélioration de nos services.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">2. Utilisation des données</h2>
                <p>
                  Vos données sont utilisées pour traiter vos commandes, vous contacter et améliorer votre expérience sur
                  notre site.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">3. Protection des données</h2>
                <p>
                  Nous mettons en œuvre toutes les mesures nécessaires pour protéger vos données personnelles contre tout
                  accès non autorisé.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">4. Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données
                  personnelles.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">5. Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment
                  désactiver les cookies dans les paramètres de votre navigateur.
                </p>
              </section>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}
