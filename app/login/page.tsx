// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simuler un login (en vrai, tu appellerais une API pour vérifier)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (data.success) {
        // redirige vers le panier après login
        router.push("/cart");
      } else {
        alert("Échec de la connexion. Essaie encore !");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur serveur, réessaie plus tard.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 container mx-auto px-4 py-12 max-w-md">
      <h1 className="text-4xl font-bold mb-8">Connexion</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Ton email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-black text-white font-bold rounded hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}
