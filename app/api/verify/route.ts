import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams, origin } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/verify?success=false", origin)
      );
    }

    // 🔍 Récupérer le token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/verify?success=false", origin)
      );
    }

    // ⏰ Vérifier expiration
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.redirect(
        new URL("/verify?success=false", origin)
      );
    }

    // ✅ Activer l’utilisateur
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // 🧹 Supprimer le token
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    // 🎉 Succès
    return NextResponse.redirect(
      new URL("/verify?success=true", origin)
    );
  } catch (error) {
    console.error("VERIFY_ERROR:", error);

    return NextResponse.redirect(
      new URL("/verify?success=false", new URL(req.url).origin)
    );
  }
}
