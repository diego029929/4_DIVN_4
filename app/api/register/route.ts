import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";
import { renderVerifyEmail } from "@/lib/email-renderer";

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

    const user = await prisma.user.create({
      data: { username: cleanedUsername, email: cleanedEmail, password: hashedPassword, isVerified: false },
    });

    const token = randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { token, userId: user.id, expires },
    });

    const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/verify?token=${encodeURIComponent(token)}`;

    const htmlContent = renderVerifyEmail(cleanedUsername, verificationUrl);

    await sendEmail({
      to: cleanedEmail,
      subject: "Confirme ton compte DIVN",
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      message: "Compte créé ! Vérifie ton e-mail pour activer ton compte.",
    });
  } catch (err: any) {
    console.error("Erreur /api/register:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
        }
                               
