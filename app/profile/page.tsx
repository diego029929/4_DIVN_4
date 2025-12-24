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
    return <p className="text-center mt-20 text-white">Chargement...</p>
  }

  if (!session) return null

  // Générer les initiales pour le logo/avatar
  const userName = session.user?.name || session.user?.email || "U"
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#1f1f1f]">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center space-y-6">
        {/* Avatar utilisateur */}
        <div className="w-24 h-24 mx-auto rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
          {initials}
        </div>

        <h1 className="text-2xl font-bold text-black">Mon profil</h1>

        <p className="mt-2 text-gray-800">
          Connecté en tant que : <strong>{session.user?.email}</strong>
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Se déconnecter
        </button>
      </div>
    </main>
  )
      }
