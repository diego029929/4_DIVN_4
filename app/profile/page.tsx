"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Chargement...</p>
  }

  if (!session) return null

  return (
    <div className="max-w-xl mx-auto mt-20">
      <h1 className="text-2xl font-bold">Mon profil</h1>

      <p className="mt-4">
        Connecté en tant que : <strong>{session.user?.email}</strong>
      </p>

      <button
        onClick={() => signOut({ callbackUrl: "/" })} // redirige vers la page d'accueil après déconnexion
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Se déconnecter
      </button>
    </div>
  )
}
}
