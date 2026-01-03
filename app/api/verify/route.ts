import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      return NextResponse.redirect(new URL("/verify?success=false", baseUrl));
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_BASE_URL is missing");
      return NextResponse.redirect(new URL("/verify?success=false", url.origin));
    }

    if (!verificationToken) {
      return NextResponse.redirect(new URL("/verify?success=invalid", baseUrl));
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });
      return NextResponse.redirect(new URL("/verify?success=expired", baseUrl));
    }

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.redirect(new URL("/verify?success=true", baseUrl));
  } catch (err) {
    console.error("VERIFY_ERROR", err);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(req.url).origin;
    return NextResponse.redirect(new URL("/verify?success=false", baseUrl));
  }
        }
