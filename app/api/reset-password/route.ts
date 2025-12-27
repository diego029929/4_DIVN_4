import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: "Requête invalide" },
        { status: 400 }
      )
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
    })

    if (!record || record.expires < new Date()) {
      return NextResponse.json(
        { error: "Lien expiré ou invalide" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { id: record.userId },
      data: {
        password: hashedPassword,
        isVerified: true, // 🔥 optionnel mais recommandé
      },
    })

    await prisma.passwordResetToken.delete({
      where: { id: record.id },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("RESET_PASSWORD_ERROR:", err)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
      }
      
