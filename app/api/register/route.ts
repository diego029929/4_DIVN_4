import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Vérifier que l'email et le password sont fournis
    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 400 });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur (sans "name" pour éviter l'erreur)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (err: any) {
    console.error("Erreur /api/register:", err); // Affiche l'erreur réelle dans Render
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
