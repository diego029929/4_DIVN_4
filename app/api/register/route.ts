import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Champs manquants" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
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

    // ⚠️ EMAIL NON BLOQUANT
    try {
      await sendEmail({
        to: email,
        subject: "Confirme ton compte",
        text: `Bonjour ${name || ""},

Merci de t'être inscrit.
Clique sur ce lien pour vérifier ton compte :
${verificationUrl}

Ce lien expire dans 24h.`,
      });
    } catch (emailError) {
      console.error("Erreur envoi email :", emailError);
      // on continue quand même
    }

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour l'activer.",
      user: { id: user.id, email: user.email },
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
      }
      
