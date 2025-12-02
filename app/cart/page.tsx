"use client";

export const dynamic = "force-dynamic"; // Empêche tout prerender

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Votre panier</h1>
        <CartContent />
      </main>

      <Footer />
    </div>
  );
}
