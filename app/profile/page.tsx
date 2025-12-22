"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // ❌ NE RIEN FAIRE pendant le loading
    if (status === "loading") return

    // 🔒 Redirection UNIQUEMENT si vraiment non connecté
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  }, [status, router])

  // ⏳ Attente de la session
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
    </div>
  )
}
