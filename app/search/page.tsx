"use client";

import { useSearchParams } from "next/navigation";

const items = [
  { id: 1, name: "T-shirt noir" },
  { id: 2, name: "Sweat oversize" },
  { id: 3, name: "Casquette street" },
  { id: 4, name: "Hoodie blanc" },
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const results = items.filter((item) =>
    item.name.toLowerCase().includes(query)
  );

  return (
    <main className="container mx-auto px-4 py-16 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Résultats pour “{query}”
      </h1>

      {results.length === 0 ? (
        <p className="opacity-70">Aucun résultat trouvé.</p>
      ) : (
        <div className="grid gap-4">
          {results.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-white/10 border border-white/10"
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
