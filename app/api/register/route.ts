import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    const emailNormalized = email?.trim().toLowerCase();
    const passwordTrimmed = password?.trim();
    const usernameTrimmed = username?.trim();

    if (!emailNormalized || !passwordTrimmed || !usernameTrimmed) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    // Vérifie si un utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: emailNormalized },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);

    const user = await prisma.user.create({
      data: {
        email: emailNormalized,
        password: hashedPassword,
        username: usernameTrimmed,
      },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await sendEmail({
          to: emailNormalized,
          subject: "Confirme ton compte",
          text: `Bonjour ${usernameTrimmed},\n\nClique ici pour vérifier ton compte : ${verificationUrl}`,
        });
      } catch (err) {
        console.warn("Email non envoyé :", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail (si SMTP configuré).",
    });

  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
