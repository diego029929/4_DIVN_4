import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderVerifyEmail } from "@/lib/email-templates";
import { logtail } from "lib/logger";
import * as Sentry from "@sentry/nextjs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    logtail.info("Début de l’inscription");

    const contentType = req.headers.get("content-type") || "";
    let body: any = {};

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      body = Object.fromEntries(
        new URLSearchParams(await req.text()).entries()
      );
    } else if (contentType.includes("multipart/form-data")) {
      body = Object.fromEntries(
        (await req.formData()).entries()
      );
    }

    const email = body.email?.toString().trim();
    const password = body.password?.toString();
    const username = body.username?.toString().trim();

    if (!email || !password || !username) {
      logtail.warn("Champs manquants lors de l’inscription", { body });

      return NextResponse.json(
        { success: false, error: "Champs manquants" },
        { status: 400 }
      );
    }

    logtail.info("Tentative d’inscription", { email });

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      logtail.warn("Utilisateur déjà existant", { email });

      return NextResponse.json(
        { success: false, error: "Utilisateur déjà existant" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        isVerified: false,
      },
    });

    // 🔥 SENTRY — associer l'utilisateur
    Sentry.setUser({
      id: user.id,
      email: user.email,
    });

    logtail.info("Utilisateur créé", { userId: user.id });

    const token = randomUUID();

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
      logtail.error("NEXT_PUBLIC_BASE_URL manquant");

      return NextResponse.json(
        { success: false, error: "Erreur serveur" },
        { status: 500 }
      );
    }

    const verifyUrl = `${baseUrl}/api/verify?token=${token}`;

    logtail.info("Envoi de l’email de vérification", {
      email,
      verifyUrl,
    });

    await sendEmail({
      to: email,
      subject: "Vérifie ton compte",
      html: renderVerifyEmail(username, verifyUrl),
    });

    logtail.info("Inscription terminée avec succès", {
      userId: user.id,
      email,
    });

    return NextResponse.json({
      success: true,
      message: "Utilisateur créé et email envoyé",
    });

  } catch (error) {
    // 🔥 SENTRY
    Sentry.captureException(error, {
      tags: {
        scope: "register",
      },
    });

    logtail.error("Erreur lors de l’inscription", {
      erreur: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { success: false, error: "Erreur interne du serveur" },
      { status: 500 }
    );
  } finally {
    await logtail.flush();
  }
}
