import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    console.error("NEXT_PUBLIC_BASE_URL is missing");
    return NextResponse.redirect("/verify?success=false");
  }

  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/verify?success=invalid`);
    }

    // 🔍 Token unique → findUnique
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${baseUrl}/verify?success=invalid`);
    }

    // ⏰ Expiration
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token },
      });

      return NextResponse.redirect(`${baseUrl}/verify?success=expired`);
    }

    // ✅ Vérifie l'utilisateur
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // 🧹 Nettoyage
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.redirect(`${baseUrl}/verify?success=true`);
  } catch (error) {
    console.error("VERIFY_ERROR:", error);
    return NextResponse.redirect(`${baseUrl}/verify?success=false`);
  }
}
