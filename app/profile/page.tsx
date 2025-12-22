"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🔒 Protection : redirige si non connecté
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Chargement...</p>
  }

  if (!session) return null

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Mon profil</h1>

      <p>
        <strong>Email :</strong> {session.user?.email}
      </p>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
  )
}
  
