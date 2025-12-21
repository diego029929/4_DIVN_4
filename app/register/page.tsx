"use client"

export default function RegisterPage() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    alert("CLICK OK")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      <input name="password" />
      <button type="submit">Créer un compte</button>
    </form>
  )
}
