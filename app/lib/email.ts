// /lib/email.ts
import SibApiV3Sdk from "sib-api-v3-sdk"

interface EmailOptions {
  to: string
  subject: string
  text: string
  html?: string
}

const client = SibApiV3Sdk.ApiClient.instance
client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY!

const api = new SibApiV3Sdk.TransactionalEmailsApi()

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: EmailOptions) {
  if (!process.env.BREVO_API_KEY || !process.env.BREVO_FROM) {
    throw new Error("Variables d'environnement Brevo manquantes")
  }

  await api.sendTransacEmail({
    sender: { email: process.env.BREVO_FROM },
    to: [{ email: to }],
    subject,
    textContent: text,
    htmlContent: html,
  })
}
