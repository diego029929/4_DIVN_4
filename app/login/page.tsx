"use client"

import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FiEye, FiEyeOff } from "react-icons/fi"

export default function LoginPage() {
  const { status } = useSession()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/profile")
    }
  }, [status, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // 🔑 OBLIGATOIRE
    })

    setLoading(false)

    if (!res) {
      setError("Erreur inconnue")
      return
    }

    if (res.error) {
      if (res.error === "CredentialsSignin") {
        setError("Email ou mot de passe incorrect")
      } else {
        setError(res.error)
      }
      return
    }

    // ✅ Connexion OK
    router.push("/profile")
  }

  if (status === "loading") return null

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1f1f1f]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-black">Connexion</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center text-sm">❌ {error}</p>
        )}

        <p className="text-center text-sm mt-4 text-black">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
    }
      
