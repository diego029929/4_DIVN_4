"use client";

import  Header  from "@/components/header";
import { Footer } from "@/components/footer";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Contactez-nous</h1>

        <p className="text-muted-foreground">
          Vous pouvez nous contacter via [...]
        </p>
      </main>

      <Footer />
    </div>
  );
}
