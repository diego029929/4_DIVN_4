"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";

export const dynamic = "force-dynamic"; // forcer le rendu côté client

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto space-y-8 prose prose-invert text-muted-foreground">
            <h1 className="text-4xl font-bold">Votre commande</h1>

            <p>
              Ici vous trouverez le résumé de vos articles, le total à payer et pourrez finaliser votre achat.
            </p>

            {/* Exemple simple de contenu de panier */}
            <section>
              <h2 className="text-2xl font-bold">Articles dans le panier</h2>
              <p>Votre panier est actuellement vide.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold">Paiement</h2>
              <p>Les options de paiement seront affichées ici.</p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
            }
