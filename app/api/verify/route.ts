import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logtail } from "lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    logtail.info("Vérification email - tentative");

    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      logtail.warn("Vérification échouée : token manquant");

      return NextResponse.redirect(
        new URL("/verify?success=false", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      logtail.warn("Vérification échouée : token invalide", { token });

      return NextResponse.redirect(
        new URL("/verify?success=invalid", process.env.NEXT_PUBLIC_BASE_URL!)
      );
    }

    if (verificationToken.expires < new Date()) {
      logtail.warn("Vérification échouée : token expiré", {
        token,
        userId: verificationToken.userId,
      });

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

    logtail.info("Email vérifié avec succès", {
      userId: verificationToken.userId,
    });

    return NextResponse.redirect(
      new URL("/verify?success=true", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  } catch (error) {
    logtail.error("Erreur lors de la vérification email", {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.redirect(
      new URL("/verify?success=false", process.env.NEXT_PUBLIC_BASE_URL!)
    );
  } finally {
    await logtail.flush();
  }
  }
