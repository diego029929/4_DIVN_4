import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email"; // Ta fonction pour envoyer des mails

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

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

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Génération du token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // Création du lien de vérification
    const verificationUrl = `https://ton-site.com/api/verify?token=${token}`;

    // Envoi de l'e-mail
    await sendEmail({
      to: email,
      subject: "Confirme ton compte",
      text: `Bonjour ${name || ""},\n\nMerci de t'être inscrit. Clique sur ce lien pour vérifier ton compte : ${verificationUrl}\n\nCe lien expirera dans 24h.`,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour l'activer.",
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
  }
