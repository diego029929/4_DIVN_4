"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CartProvider } from "@/context/cart-context";
export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    </CartProvider>
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-8 prose prose-invert text-muted-foreground">
          <h1 className="text-4xl font-bold">Contactez-nous</h1>
          <p>
            Vous pouvez nous contacter par email à contact@divn.com ou via le formulaire ci-dessous.
          </p>

          <section>
            <h2 className="text-2xl font-bold mt-6">Formulaire de contact</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-2 border rounded-md"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded-md"
              />
              <textarea
                placeholder="Votre message"
                className="w-full p-2 border rounded-md"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-md"
              >
                Envoyer
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </div>
    </CartProvider>
  );
}
