"use client";

export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <main className="flex-1 container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">À propos de nous</h1>
      <p className="text-muted-foreground">
        Nous sommes une entreprise dédiée à [...]
      </p>
    </main>
  );
}
