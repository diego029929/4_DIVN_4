import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/verify?success=false", url.origin)
      );
    }

    // DEBUG SAFE
    console.log(
      "VERIFY TOKENS:",
      await prisma.verificationToken.findMany()
    );

    const verificationToken = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL("/verify?success=invalid", url.origin)
      );
    }

    if (verificationToken.expires < new Date()) {
      // ❗ suppression UNIQUEMENT si expiré
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id },
      });

      return NextResponse.redirect(
        new URL("/verify?success=expired", url.origin)
      );
    }

    await prisma.user.update({
      where: { id: verificationToken.userId },
      data: { isVerified: true },
    });

    // ❗ suppression UNIQUEMENT APRÈS succès
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.redirect(
      new URL("/verify?success=true", url.origin)
    );
  } catch (err) {
    console.error("VERIFY_ERROR", err);
    return NextResponse.redirect(
      new URL("/verify?success=false", new URL(req.url).origin)
    );
  }
    }
