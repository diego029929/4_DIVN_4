import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();

    // Trim et normalisation
    const emailNormalized = email?.trim().toLowerCase();
    const passwordTrimmed = password?.trim();
    const usernameTrimmed = username?.trim();

    if (!emailNormalized || !passwordTrimmed || !usernameTrimmed) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    // Cherche tous les utilisateurs avec cet email (au cas où doublons)
    const usersWithEmail = await prisma.user.findMany({
      where: { email: emailNormalized },
    });

    // Filtrer ceux avec password
    const realUser = usersWithEmail.find(u => u.password);

    if (realUser) {
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);

    // S'il existe un utilisateur fantôme, update ; sinon create
    const user = usersWithEmail.length
      ? await prisma.user.update({
          where: { id: usersWithEmail[0].id },
          data: { password: hashedPassword, username: usernameTrimmed },
        })
      : await prisma.user.create({
          data: {
            email: emailNormalized,
            password: hashedPassword,
            username: usernameTrimmed,
          },
        });

    // Token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    // Email
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;
    await sendEmail({
      to: emailNormalized,
      subject: "Confirme ton compte",
      text: `Bonjour ${usernameTrimmed},\n\nClique ici pour vérifier ton compte : ${verificationUrl}`,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
