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
  const [showPassword, setShowPassword] = useState(false) // 👁️
  const [error, setError] = useState("")

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
      callbackUrl: "/profile",
    })
  }

  if (status === "loading") return null

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-black">Connexion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-black"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} // 👁️
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Se connecter
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center">❌ {error}</p>
        )}

        <p className="text-center text-sm mt-4 text-black">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline text-black">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
    }
        
