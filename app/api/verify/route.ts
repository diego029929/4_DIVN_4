import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 400 });
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.json({ error: "Token invalide" }, { status: 400 });
    }

    // ✅ COMPARAISON UTC CORRECTE
    if (verificationToken.expires.getTime() < Date.now()) {
      return NextResponse.json({ error: "Token expiré" }, { status: 400 });
    }

    // ✅ Valider l'utilisateur
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // ✅ Supprimer le token après usage
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur verify:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
