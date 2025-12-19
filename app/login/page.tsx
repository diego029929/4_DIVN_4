// /app/login/page.tsx
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "connected">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setStatus("loading");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur");
      setStatus("idle");
      return;
    }

    // 🔥 TEST DIRECT DE LA SESSION
    const check = await fetch("/api/check-session", {
      credentials: "include",
    });

    const data = await check.json();

    if (data.user) {
      setStatus("connected");
    } else {
      setError("Session non créée");
      setStatus("idle");
    }
  }

  return (
    <main className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-6">Connexion</h1>

      {status === "connected" ? (
        <p className="text-green-500 text-lg">
          ✅ CONNECTÉ
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2"
            required
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full border p-2"
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-black text-white py-2"
          >
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      )}
    </main>
  );
               }
