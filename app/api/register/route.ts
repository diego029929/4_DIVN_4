import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // Création du token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    const verificationUrl = `https://ton-site.com/api/verify?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Confirme ton compte",
      text: `Bonjour ${username},\n\nMerci de t'être inscrit. Clique sur ce lien pour vérifier ton compte : ${verificationUrl}\nCe lien expirera dans 24h.`,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour l'activer.",
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
