import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL missing");
    }

    if (!token) {
      return NextResponse.redirect(`${baseUrl}/verify?success=false`);
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(`${baseUrl}/verify?success=invalid`);
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.redirect(`${baseUrl}/verify?success=expired`);
    }

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.redirect(`${baseUrl}/verify?success=true`);
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "/";
    return NextResponse.redirect(`${baseUrl}/verify?success=false`);
  }
}
