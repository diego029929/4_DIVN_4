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

  // Redirection si l'utilisateur est déjà connecté
  useEffect(() => {
    if (status === "authenticated") {
      console.log("Utilisateur déjà connecté, redirection vers /profile", email)
      router.replace("/profile")
    }
  }, [status, router, email])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setError("")
    setLoading(true)
    console.log("Tentative de connexion avec email :", email)

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      setLoading(false)

      if (!res || res.error) {
        setError("Email ou mot de passe incorrect")
        console.warn("Échec de connexion pour :", email)
        return
      }

      console.log("Connexion réussie pour :", email)
      router.push("/profile")
    } catch (err) {
      setError("Une erreur est survenue.")
      setLoading(false)
      console.error("Erreur lors de la connexion :", err)
    }
  }

  if (status === "loading") {
    return <p className="text-center mt-20 text-white">Chargement...</p>
  }

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
            className="w-full border p-3 rounded-lg text-black"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-lg text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-center text-sm">❌ {error}</p>
        )}

        <p className="text-center text-sm text-black">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline">
            Créer un compte
          </Link>
        </p>
      </div>
    </main>
  )
}
