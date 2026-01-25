import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { logtail } from "lib/logger";
import * as Sentry from "@sentry/nextjs";

export async function POST(req: Request) {
  try {
    logtail.info("Reset mot de passe - tentative");

    const { token, password } = await req.json();

    if (!token || !password) {
      logtail.warn("Reset mot de passe - données manquantes");

      return NextResponse.json(
        { error: "Requête invalide" },
        { status: 400 }
      );
    }

    const record = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!record) {
      logtail.warn("Reset mot de passe - token invalide", { token });

      return NextResponse.json(
        { error: "Lien expiré ou invalide" },
        { status: 400 }
      );
    }

    if (record.expires < new Date()) {
      logtail.warn("Reset mot de passe - token expiré", {
        userId: record.userId,
      });

      await prisma.passwordResetToken.delete({
        where: { id: record.id },
      });

      return NextResponse.json(
        { error: "Lien expiré ou invalide" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: record.userId },
      data: {
        password: hashedPassword,
        isVerified: true, // optionnel mais recommandé
      },
    });

    await prisma.passwordResetToken.delete({
      where: { id: record.id },
    });

    // 🔥 SENTRY — attacher l'utilisateur à l'action
    Sentry.setUser({ id: record.userId });

    logtail.info("Mot de passe réinitialisé avec succès", {
      userId: record.userId,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    // 🔥 Capture l’erreur dans Sentry
    Sentry.captureException(error, {
      tags: {
        scope: "reset-password",
      },
    });

    logtail.error("Erreur reset mot de passe", {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    await logtail.flush();
  }
}
