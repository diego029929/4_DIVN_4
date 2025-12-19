"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { user, loading, refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← Très important
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return setError(data.error || "Erreur de connexion");

      await refreshUser(); // ← Mise à jour du contexte
    } catch (err: any) {
      setError(err.message || "Erreur réseau");
    }
  };

  if (loading) return <p>Chargement...</p>;

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
