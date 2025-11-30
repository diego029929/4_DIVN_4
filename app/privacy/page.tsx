"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold">Politique de Confidentialité</h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground">1. Collecte des données</h2>
                <p>
                  DIVN collecte des données personnelles uniquement dans le cadre de la gestion des commandes et
                  de l'amélioration de nos services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">2. Utilisation des données</h2>
                <p>
                  Vos données sont utilisées pour traiter vos commandes, vous contacter et améliorer votre expérience
                  sur notre site.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">3. Protection des données</h2>
                <p>
                  Nous mettons en œuvre toutes les mesures nécessaires pour protéger vos données personnelles contre tout
                  accès non autorisé.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">4. Vos droits</h2>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de modification et de suppression de vos données
                  personnelles.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">5. Cookies</h2>
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment
                  désactiver les cookies dans les paramètres de votre navigateur.
                </p>
              </section>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
      }
                  
