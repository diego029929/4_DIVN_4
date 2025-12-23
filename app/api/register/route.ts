import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 400 });
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur avec debug
    let user;
    try {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      console.log("Utilisateur créé avec succès:", user);
    } catch (prismaErr) {
      console.error("Erreur lors de prisma.user.create:", prismaErr);
      throw prismaErr; // relance pour catch global
    }

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
  } catch (err: any) {
    console.error("Erreur /api/register:", err); // Affiche TOUTES les erreurs
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
                              }
