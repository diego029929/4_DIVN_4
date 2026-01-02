import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    console.log("VERIFY TOKEN RECEIVED:", token);

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=false`);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    console.log("TOKEN IN DB:", verificationToken);

    if (!verificationToken) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/verify?success=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      // Supprime le token expiré
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
