import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { renderVerifyEmail } from "@/lib/email-renderer.tsx";

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
      where: {
        OR: [
          { email: cleanedEmail },
          { username: cleanedUsername },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email ou nom d'utilisateur déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Création utilisateur NON vérifié
    const user = await prisma.user.create({
      data: {
        username: cleanedUsername,
        email: cleanedEmail,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // ✅ Token de vérification
    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    // ✅ URL de vérification
    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${encodeURIComponent(
      token
    )}`;

    // ✅ Génération EMAIL HTML premium (React Email)
    const htmlContent = renderVerifyEmail(
      cleanedUsername,
      verificationUrl
    );

    // ✅ Envoi via Brevo
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: {
            name: "DIVN",
            email: "wist.infodev@gmail.com",
          },
          to: [{ email: cleanedEmail }],
          subject: "Confirme ton compte DIVN",
          htmlContent, // 🔥 ICI le HTML premium
        }),
      });

      if (!res.ok) {
        console.error("Brevo error:", await res.text());
      }
    } catch (err) {
      console.error("Erreur lors de l'envoi de l'email :", err);
    }

    return NextResponse.json({
      success: true,
      message:
        "Compte créé ! Vérifie ton e-mail pour activer ton compte.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json(
      { error: err.message || "Erreur serveur" },
      { status: 500 }
    );
  }
}
  
