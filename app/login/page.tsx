"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const { user, refresh } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error);
      setLoading(false);
      return;
    }

    await refresh();
    setLoading(false);
  }

  if (user) {
    return <p className="text-green-500 text-center mt-20">✅ Connecté</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4">
      <input value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      {error && <p className="text-red-500">{error}</p>}
      <button disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
