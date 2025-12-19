import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json(
        { error: "Identifiants incorrects" },
        { status: 401 }
      );

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return NextResponse.json(
        { error: "Identifiants incorrects" },
        { status: 401 }
      );

    // ✅ Création de la réponse JSON
    const response = NextResponse.json({ success: true });

    // ✅ Poser le cookie de session
    response.cookies.set("auth", user.id.toString(), {
      httpOnly: true,   // ✅ impossible à lire via JS
      sameSite: "lax",  // ✅ supporte navigation normale
      path: "/",        // ✅ disponible sur tout le site
      maxAge: 60 * 60 * 24 * 7, // 7 jours
      // secure: true // seulement si HTTPS en prod
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? "Erreur serveur" },
      { status: 500 }
    );
  }
}
