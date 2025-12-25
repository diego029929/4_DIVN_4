import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ error: "Compte non vérifié" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err: any) {
    console.error("Erreur /api/login:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
                                                                     }
                               
