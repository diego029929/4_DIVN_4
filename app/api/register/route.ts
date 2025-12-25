import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    let { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${token}`;

    sendEmail({
  to: email,
  subject: "Confirme ton compte",
  text: `Bonjour ${username},

Merci de t'être inscrit.
Clique sur ce lien pour vérifier ton compte :
${verificationUrl}

Ce lien expirera dans 24h.`,
}).catch(err => {
  console.error("EMAIL_ASYNC_ERROR", err);
});

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
