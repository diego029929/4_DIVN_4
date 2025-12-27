import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    const cleanedUsername = username.trim();
    const cleanedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: cleanedEmail }, { username: cleanedUsername }] },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⚡ Création utilisateur mais non vérifié
    const user = await prisma.user.create({
      data: {
        username: cleanedUsername,
        email: cleanedEmail,
        password: hashedPassword,
        isVerified: false, // <--- important
      },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`;

    // ⚡ EMAIL NON BLOQUANT
    sendEmail({
      to: cleanedEmail,
      subject: "Confirme ton compte",
      text: `Bonjour ${cleanedUsername},\n\nMerci de t'être inscrit.\nClique sur ce lien pour vérifier ton compte :\n${verificationUrl}\n\nCe lien expirera dans 24h.`,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour l'activer.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified, // false
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
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
      }
    
