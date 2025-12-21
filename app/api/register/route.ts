"use client"

import { FormEvent } from "react"

export default function RegisterPage() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    console.log("CLICK REGISTER", email, password)

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    console.log("RESPONSE STATUS", res.status)

    if (res.ok) {
      alert("Compte créé")
    } else {
      const data = await res.json()
      alert(data.error || "Erreur")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Mot de passe" />
      <button type="submit">Créer un compte</button>
    </form>
  )
}
