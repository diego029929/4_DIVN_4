import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/verify?success=false", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/verify?success=invalid", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.redirect(
        new URL("/verify?success=expired", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.redirect(
      new URL("/verify?success=true", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    return NextResponse.redirect(
      new URL("/verify?success=false", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  }
}
