import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // ex: https://four-divn-4-1.onrender.com
    if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL non défini");

    const token = (req as any).nextUrl?.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/verify?success=false`);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${baseUrl}/verify?success=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { id: verificationToken.id } });
      return NextResponse.redirect(`${baseUrl}/verify?success=expired`);
    }

    // ✅ Active le compte
    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // Supprime le token
    await prisma.verificationToken.delete({ where: { id: verificationToken.id } });

    return NextResponse.redirect(`${baseUrl}/verify?success=true`);
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return NextResponse.redirect(`${baseUrl}/verify?success=false`);
  }
      }
                             
