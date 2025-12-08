"use client";

import  Header  from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic";

export default function CgvPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8 prose prose-invert text-muted-foreground">
            
            <h1 className="text-4xl font-bold">Conditions Générales de Vente (CGV)</h1>

            <section>
              <h2 className="text-2xl font-bold mt-6">1. Objet</h2>
              <p>
                Les présentes conditions générales de vente régissent toutes les ventes conclues par le site DIVN.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-6">2. Produits</h2>
              <p>
                Les produits proposés sont décrits et présentés avec la plus grande exactitude possible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-6">3. Commande</h2>
              <p>
                Toute commande implique l’acceptation sans réserve des présentes conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-6">4. Paiement</h2>
              <p>
                Le paiement est exigible immédiatement à la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-6">5. Livraison</h2>
              <p>
                La livraison est effectuée à l’adresse indiquée lors de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-6">6. Rétractation</h2>
              <p>
                Conformément à la loi, vous disposez d’un délai de 14 jours pour vous rétracter.
              </p>
            </section>

          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
                }
