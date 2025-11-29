"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic"; // Empêche le prerendering côté serveur

export default function CGVPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold text-center md:text-left">
              Conditions Générales de Vente
            </h1>

            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <section>
                <h2 className="text-2xl font-bold text-foreground">1. Objet</h2>
                <p className="leading-relaxed">
                  Les présentes conditions générales de vente régissent les ventes de produits proposés sur le site DIVN.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">2. Prix</h2>
                <p className="leading-relaxed">
                  Les prix sont indiqués en euros TTC. DIVN se réserve le droit de modifier ses prix à tout moment.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">3. Commande</h2>
                <p className="leading-relaxed">
                  Toute commande implique l'acceptation sans réserve des présentes conditions générales de vente.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">4. Livraison</h2>
                <p className="leading-relaxed">
                  Les produits sont livrés sous 48h à l'adresse indiquée lors de la commande. La livraison est gratuite
                  pour toute commande supérieure à 100€.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground">5. Droit de rétractation</h2>
                <p className="leading-relaxed">
                  Conformément aux dispositions légales, vous disposez d'un délai de 30 jours pour retourner un produit
                  qui ne vous conviendrait pas.
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
        
