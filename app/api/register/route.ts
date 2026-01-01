import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderVerifyEmail } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    // 1️⃣ Récupération des données
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const cleanedUsername = username.trim();
    const cleanedEmail = email.trim().toLowerCase();

    // 2️⃣ Vérifier si utilisateur existe
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: cleanedEmail }, { username: cleanedUsername }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    // 3️⃣ Hash mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Créer utilisateur NON vérifié
    const user = await prisma.user.create({
      data: {
        username: cleanedUsername,
        email: cleanedEmail,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // 5️⃣ Token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // 6️⃣ Lien de vérification
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`;

    // 🔍 DEBUG (IMPORTANT)
    console.log("EMAIL DEST:", cleanedEmail);

    // 7️⃣ Envoi email
    await sendEmail({
      to: cleanedEmail,
      subject: "Confirme ton compte DIVN",
      html: renderVerifyEmail(cleanedUsername, verificationUrl),
    });

    // 8️⃣ Réponse OK
    return NextResponse.json({
      success: true,
      message: "Compte créé. Vérifie ton email pour l'activer.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
