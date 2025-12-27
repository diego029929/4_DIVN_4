// app/api/forgot-password/route.ts
import { prisma } from "@/lib/prisma"
import { randomUUID } from "crypto"
import { sendEmail } from "@/lib/email"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email) {
      return NextResponse.json({ success: true })
    }

    const cleanedEmail = email.toLowerCase().trim()

    const user = await prisma.user.findUnique({
      where: { email: cleanedEmail },
    })

    // 🔒 IMPORTANT : si l'utilisateur n'existe pas
    // on répond OK sans rien faire
    if (!user || !user.isVerified) {
      return NextResponse.json({ success: true })
    }

    // 🧹 Supprime les anciens tokens pour éviter les conflits
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

    // ⚡ envoi email (non bloquant côté UX)
    await sendEmail(
      user.email,
      "Réinitialisation de ton mot de passe",
      `Bonjour ${user.username},

Clique sur ce lien pour réinitialiser ton mot de passe :
${resetUrl}

Ce lien expire dans 30 minutes.

Si tu n’es pas à l’origine de cette demande, ignore cet email.`
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("FORGOT_PASSWORD_ERROR:", err)

    // 🔒 ON NE RÉVÈLE JAMAIS L'ERREUR AU CLIENT
    return NextResponse.json({ success: true })
  }
}
