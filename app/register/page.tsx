"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { FiEye, FiEyeOff } from "react-icons/fi"

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // <-- ici
      })

      if (res.ok) {
        alert("Compte créé")
        router.push("/login")
      } else {
        const data = await res.json()
        setError(data.error || "Erreur inscription")
      }
    } catch (err) {
      console.error(err)
      setError("Erreur inscription")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1f1f1f]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-black">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black placeholder-black"
            required
          />

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
              type={showPassword ? "text" : "password"}
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
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition">
            Créer un compte
          </button>
        </form>

        {error && <p className="text-red-500 text-center">❌ {error}</p>}

        <p className="text-center text-sm mt-4 text-black">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline text-black">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  )
          }
