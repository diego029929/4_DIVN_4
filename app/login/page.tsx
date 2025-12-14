"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Erreur");
      return;
    }

    // ✅ ICI la redirection (OBLIGATOIRE)
    router.push("/checkout"); // ou "/"
  }

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Connexion</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button className="w-full bg-black text-white py-2">
          Se connecter
        </button>
      </form>
    </main>
  );
      }
