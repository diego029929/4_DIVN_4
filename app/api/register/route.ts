import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ⚡ Force le mode dynamique pour cette route

export async function GET(req: Request) {
  try {
    const url = new URL(req.url); // ✅ URL complète pour éviter les problèmes
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=false`);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=expired`);
    }

    // Active le compte
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // Supprime le token
    await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=true`);
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=false`);
  }
}
