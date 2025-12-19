"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { user, loading, refreshUser } = useAuth(); // ajout de refreshUser
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // ✅ Met à jour le contexte auth directement
    if (refreshUser) await refreshUser();
  }

  if (loading) return null;

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>

      {user ? (
        <p className="text-green-500 text-lg">
          ✅ Connecté en tant que : {user.email}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2"
            required
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button className="w-full bg-black text-white py-2">
            Se connecter
          </button>
        </form>
      )}
    </main>
  );
}
