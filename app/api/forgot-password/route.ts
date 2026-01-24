import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderForgotPasswordEmail } from "@/lib/email-templates";
import { logtail } from "lib/logger";

export async function POST(req: Request) {
  try {
    logtail.info("Mot de passe oublié - tentative");

    const { email } = await req.json();

    if (!email) {
      logtail.warn("Mot de passe oublié - email manquant");

      return NextResponse.json(
        { error: "Email requis" },
        { status: 400 }
      );
    }

    logtail.info("Recherche utilisateur pour reset password", { email });

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    // Anti-enumération : on répond OK même si l'utilisateur n'existe pas
    if (!user) {
      logtail.warn("Mot de passe oublié - utilisateur introuvable", { email });

      return NextResponse.json({ success: true });
    }

    const token = randomUUID();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expires,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    logtail.info("Envoi email reset mot de passe", {
      userId: user.id,
      email,
    });

    await sendEmail({
      to: user.email,
      subject: "Reset your DIVN password",
      html: renderForgotPasswordEmail(user.username, resetUrl),
    });

    logtail.info("Email de reset envoyé avec succès", {
      userId: user.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logtail.error("Erreur serveur - mot de passe oublié", {
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  } finally {
    // Important pour Better Stack
    await logtail.flush();
  }
      }
                 
