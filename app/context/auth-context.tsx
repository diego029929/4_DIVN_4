"use client"

import { createContext, useContext } from "react"
import { useSession } from "next-auth/react"

type AuthContextType = {
  user: any
  status: "loading" | "authenticated" | "unauthenticated"
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}
