import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderVerifyEmail } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
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

    // Vérifie si utilisateur existe
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: cleanedEmail }, { username: cleanedUsername }] },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crée utilisateur NON vérifié
    const user = await prisma.user.create({
      data: {
        username: cleanedUsername,
        email: cleanedEmail,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // Création du token
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // ✅ Lien exact pour ton environnement
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;
    console.log("Lien de vérification:", verificationUrl);

    // Envoi de l'email
    await sendEmail({
      to: cleanedEmail,
      subject: "Confirme ton compte DIVN",
      html: renderVerifyEmail(cleanedUsername, verificationUrl),
    });

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
  
