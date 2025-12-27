"use client"

import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue")
      } else {
        // Message volontairement flou (sécurité)
        setMessage("Si cet email existe, un lien de réinitialisation a été envoyé.")
      }
    } catch {
      setError("Erreur serveur")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1f1f1f]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-black">
          Mot de passe oublié
        </h1>

        <p className="text-sm text-center text-gray-600">
          Entre ton email et tu recevras un lien pour réinitialiser ton mot de passe.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer le lien"}
          </button>
        </form>

        {message && <p className="text-green-600 text-center">✅ {message}</p>}
        {error && <p className="text-red-500 text-center">❌ {error}</p>}
      </div>
    </main>
  )
}
