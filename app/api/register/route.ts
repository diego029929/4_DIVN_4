import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderVerifyEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic"; // ⚡ Empêche la pré-génération

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let body: any;

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = new URLSearchParams(await req.text());
      body = Object.fromEntries(formData.entries());
    } else {
      // fallback pour form-data classique
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries() as any);
    }

    const { email, password, username } = body;

    if (!email || !password || !username) {
      console.log("Missing fields detected:", body);
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    // Vérifie si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // Génération du token de vérification
    const token = randomUUID();
    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      },
    });

    // Envoie de l'email de vérification
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    await sendEmail({
      to: email,
      subject: "Vérifie ton compte",
      html: renderVerifyEmail(`${baseUrl}/api/verify?token=${token}`, name),
    });

    return NextResponse.json({
      success: true,
      message: "User created, verification email sent",
    });
  } catch (err: any) {
    console.error("REGISTER_ERROR", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
        }
    
