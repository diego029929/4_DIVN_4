"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!token) {
      setError("Lien invalide ou expiré")
      return
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Lien expiré ou invalide")
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.replace("/login")
        }, 2000)
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
          Réinitialiser le mot de passe
        </h1>

        {success ? (
          <p className="text-green-600 text-center">
            ✅ Mot de passe mis à jour. Redirection…
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
              required
            />

            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
              required
            />

            <button
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
            >
              {loading ? "Mise à jour..." : "Réinitialiser"}
            </button>
          </form>
        )}

        {error && <p className="text-red-500 text-center">❌ {error}</p>}
      </div>
    </main>
  )
    }
        
