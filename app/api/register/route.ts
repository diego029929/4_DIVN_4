import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderVerifyEmail } from "@/lib/email-templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
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
      console.log("REGISTER missing fields:", body);
      return NextResponse.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
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

    // ⚠️ IMPORTANT : on ne supprime RIEN ici
    const token = randomUUID();

    await prisma.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    // DEBUG SAFE (à enlever après)
    console.log(
      "REGISTER TOKENS:",
      await prisma.verificationToken.findMany()
    );

    const origin =
      req.headers.get("x-forwarded-proto")
        ? `${req.headers.get("x-forwarded-proto")}://${req.headers.get("host")}`
        : new URL(req.url).origin;

    const verifyUrl = `${origin}/api/verify?token=${token}`;

    await sendEmail({
      to: email,
      subject: "Vérifie ton compte",
      html: renderVerifyEmail(username, verifyUrl),
    });

    return NextResponse.json({
      success: true,
      message: "User created, verification email sent",
    });
  } catch (err) {
    console.error("REGISTER_ERROR", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
             }
