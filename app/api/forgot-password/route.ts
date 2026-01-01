import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/send-email";
import { renderForgotPasswordEmail } from "@/lib/email-templates";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ success: true }); // anti-enum
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

    await sendEmail({
      to: user.email,
      subject: "Reset your DIVN password",
      html: renderForgotPasswordEmail(user.username, resetUrl),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("FORGOT ERROR:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
