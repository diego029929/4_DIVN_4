// /api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    const cleanedUsername = username.trim();
    const cleanedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: cleanedEmail }, { username: cleanedUsername }] },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Email ou nom d'utilisateur déjà utilisé" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ⚡ Créer l'utilisateur non vérifié
    const user = await prisma.user.create({
      data: {
        username: cleanedUsername,
        email: cleanedEmail,
        password: hashedPassword,
        isVerified: false,
      },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // ⚡ Créer le token de vérification
    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${token}`;

    // ⚡ Envoi email via Brevo
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: { name: "DIVN", email: "wist.infodev@gmail.com" },
          to: [{ email: cleanedEmail }],
          subject: "Confirme ton compte ✅",
          textContent: `Bonjour ${cleanedUsername},\n\nMerci de t'être inscrit.\nClique sur ce lien pour vérifier ton compte :\n${verificationUrl}\n\nCe lien expirera dans 24h.`,
        }),
      });

      if (!res.ok) console.error(await res.text());
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'email :", err);
    }

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour activer ton compte.",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified,
      },
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
        }
    
