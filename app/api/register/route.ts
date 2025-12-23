import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    // 🔒 Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    // 🔍 Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    // 🔐 Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 👤 Création de l'utilisateur (IMPORTANT)
    const user = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        isVerified: false, // ✅ OBLIGATOIRE
      },
    });

    // 🔑 Génération du token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // 🔗 Lien de vérification
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_APP_URL non défini");
    }

    const verificationUrl = `${baseUrl}/api/verify?token=${token}`;

    // 📧 Envoi de l'email
    await sendEmail({
      to: email,
      subject: "Confirme ton compte",
      text: `Bonjour ${name || ""},

Merci pour ton inscription sur DIVN.
Clique sur ce lien pour activer ton compte :

${verificationUrl}

Ce lien expire dans 24 heures.`,
    });

    // ✅ Réponse OK
    return NextResponse.json({
      success: true,
      message: "Compte créé. Vérifie ton e-mail pour l’activer.",
    });

  } catch (err: any) {
    console.error("❌ Erreur /api/register:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
  
