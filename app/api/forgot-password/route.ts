import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { sendEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = body?.email

    if (!email) {
      return NextResponse.json({ success: true })
    }

    const cleanedEmail = email.trim().toLowerCase()

    const user = await prisma.user.findUnique({
      where: { email: cleanedEmail },
    })

    // 🔒 Sécurité : on répond OK même si le compte n'existe pas
    if (!user) {
      return NextResponse.json({ success: true })
    }

    // 🧹 Nettoyage anciens tokens
    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    })

    const token = randomUUID()
    const expires = new Date(Date.now() + 1000 * 60 * 30) // 30 min

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    await sendEmail(
      user.email,
      "Réinitialisation de ton mot de passe",
      `Bonjour ${user.username},

Tu as demandé à réinitialiser ton mot de passe.

Clique sur ce lien pour continuer :
${resetUrl}

Ce lien est valable 30 minutes.
Si tu n'es pas à l'origine de cette demande, ignore cet email.
`
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("FORGOT_PASSWORD_ERROR:", err)

    // 🔒 Toujours répondre OK (pas de leak)
    return NextResponse.json({ success: true })
  }
}
