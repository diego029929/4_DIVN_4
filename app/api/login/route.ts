import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// bcrypt = Node runtime obligatoire
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    // 1️⃣ Sécurité : JSON invalide
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Requête invalide" },
        { status: 400 }
      );
    }

    const { email, password } = body;

    // 2️⃣ Validation
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "Email ou mot de passe invalide" },
        { status: 400 }
      );
    }

    // 3️⃣ Normalisation email
    const normalizedEmail = email.toLowerCase().trim();

    // 4️⃣ Recherche utilisateur
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 5️⃣ Vérification mot de passe
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 6️⃣ Cookie de session
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

    response.cookies.set({
      name: "user",
      value: user.id,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return response;
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
