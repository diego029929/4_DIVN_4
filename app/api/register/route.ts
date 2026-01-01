import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // ✅ Utilise nextUrl pour récupérer les query params
    const token = (req as any).nextUrl?.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`/verify?success=false`);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`/verify?success=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
      return NextResponse.redirect(`/verify?success=expired`);
    }

    // ✅ Active le compte
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // Supprime le token
    await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

    return NextResponse.redirect(`/verify?success=true`);
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    return NextResponse.redirect(`/verify?success=false`);
  }
}
