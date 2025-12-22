"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 🔁 Si déjà connecté → profil
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile")
    }
  }, [status, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      router.push("/profile")
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  if (status === "loading") return null

  return (
    <main className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Connexion</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 text-black"
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 text-black"
          required
        />

        <button className="w-full bg-black text-white py-2">
          Se connecter
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-center">❌ {error}</p>
      )}

      <p className="text-center text-sm mt-4">
        Pas encore de compte ?{" "}
        <Link href="/register" className="underline">
          Créer un compte
        </Link>
      </p>
    </main>
  )
        }
