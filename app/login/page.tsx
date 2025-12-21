"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    console.log(res)

    if (res?.ok) {
      alert("Connexion OK")
    } else {
      alert("Connexion échouée")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Se connecter</button>
    </form>
  )
}
