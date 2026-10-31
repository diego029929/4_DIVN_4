// URL publique du site, utilisée pour les redirections Stripe et les liens d'email.
// Définis NEXT_PUBLIC_APP_URL en production (ex. https://divn.mon-compte.workers.dev).
export function getSiteUrl(req?: Request): string {
  const fromEnv = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL

  if (fromEnv) return fromEnv.replace(/\/$/, "")

  if (req) return new URL(req.url).origin

  return "http://localhost:3000"
}
