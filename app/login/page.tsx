"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // 🔁 Si déjà connecté
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile")
    }
  }, [status, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/profile", // ✅ LA CLÉ
    })
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
      
