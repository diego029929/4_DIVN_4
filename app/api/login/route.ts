import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
    }

    // Crée un cookie de session
    cookies().set({
      name: "user-email",
      value: user.email,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });

    return NextResponse.json({ message: "Connexion réussie" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
