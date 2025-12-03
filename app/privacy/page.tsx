"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
export const dynamic = "force-dynamic";

export default function PrivacyPage() {
  return (
   </CartProvider>
     <div className="min-h-screen flex flex-col">
       <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8 prose prose-invert text-muted-foreground">
          <h1 className="text-4xl font-bold">Politique de confidentialité</h1>

          <section>
            <h2 className="text-2xl font-bold text-foreground">1. Collecte des données</h2>
            <p className="leading-relaxed">
              Nous collectons uniquement les informations nécessaires pour le traitement des commandes et la gestion du compte client.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">2. Utilisation des données</h2>
            <p className="leading-relaxed">
              Vos données sont utilisées exclusivement pour le traitement de vos commandes et pour vous informer des nouveautés et offres spéciales, si vous y consentez.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">3. Partage des données</h2>
            <p className="leading-relaxed">
              Nous ne partageons jamais vos données personnelles avec des tiers non partenaires. Les prestataires logistiques peuvent recevoir vos informations pour assurer la livraison.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">4. Sécurité</h2>
            <p className="leading-relaxed">
              Nous mettons en place toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données contre tout accès non autorisé.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground">5. Vos droits</h2>
            <p className="leading-relaxed">
              Vous pouvez accéder, rectifier ou supprimer vos données personnelles à tout moment en nous contactant à l'adresse indiquée sur le site.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
   </CartProvider>
  );
}
