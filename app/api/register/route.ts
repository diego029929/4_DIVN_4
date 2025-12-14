
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Optionnel mais recommandé : force le runtime Node (bcrypt)
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

    // 2️⃣ Validation minimale
    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      password.length < 6
    ) {
      return NextResponse.json(
        { error: "Email ou mot de passe invalide (min 6 caractères)" },
        { status: 400 }
      );
    }

    // 3️⃣ Normalisation email
    const normalizedEmail = email.toLowerCase().trim();

    // 4️⃣ Vérifier si l’utilisateur existe
    const exists = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (exists) {
      return NextResponse.json(
        { error: "Email déjà utilisé" },
        { status: 409 }
      );
    }

    // 5️⃣ Hash sécurisé
    const hashedPassword = await bcrypt.hash(password, 12);

    // 6️⃣ Création utilisateur
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
      },
    });

    // 7️⃣ Réponse + cookie sécurisé
    const response = NextResponse.json({
      success: true,
      user,
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
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
