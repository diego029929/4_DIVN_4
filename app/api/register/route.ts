import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  console.log("🔥 REGISTER API CALLED")

  try {
    // 1️⃣ Lecture du body
    const body = await req.json()
    console.log("📦 BODY RECEIVED:", body)

    const { email, password } = body

    // 2️⃣ Validation
    if (!email || !password) {
      console.log("❌ Champs manquants")
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      )
    }

    // 3️⃣ Vérification utilisateur existant
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("❌ Utilisateur déjà existant:", email)
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      )
    }

    // 4️⃣ Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("🔐 Password hashé")

    // 5️⃣ Création utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    console.log("✅ UTILISATEUR CRÉÉ:", user.id)

    return NextResponse.json(
      { success: true },
      { status: 201 }
    )

  } catch (error: any) {
    console.error("💥 REGISTER ERROR FULL:", error)

    return NextResponse.json(
      {
        error: error?.message || "Erreur serveur",
      },
      { status: 500 }
    )
  }
}
  
