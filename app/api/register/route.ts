import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    // Récupère les données du body
    const { email, password, username } = await req.json();

    // Vérifie que tous les champs obligatoires sont présents
    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    // Normalise l'email pour éviter les doublons dus à la casse ou espaces
    const emailNormalized = email.trim().toLowerCase();

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        password: hashedPassword,
        username,
      },
    });

    // Création du token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    // URL de vérification
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

    // Envoi email (safe, ne plante pas si SMTP mal configuré)
    await sendEmail({
      to: emailNormalized,
      subject: "Confirme ton compte",
      text: `Bonjour ${username},\n\nClique ici pour vérifier ton compte : ${verificationUrl}`,
    });

    // Réponse succès
    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
