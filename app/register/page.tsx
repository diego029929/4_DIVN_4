"use client"

export default function RegisterPage() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const email = (form.elements.namedItem("email") as HTMLInputElement).value
    const password = (form.elements.namedItem("password") as HTMLInputElement).value

    const res = await fetch("/api/register/route.ts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    if (res.ok) {
      alert("Compte créé")
    } else {
      alert("Erreur inscription")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" />
      <button type="submit">Créer un compte</button>
    </form>
  )
}

