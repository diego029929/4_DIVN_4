import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";
import { forgotPasswordEmailHtml } from "@/emails/forgot-password";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

  const token = randomUUID();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h
  await prisma.resetToken.create({ data: { token, userId: user.id, expires } });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`;
  const html = forgotPasswordEmailHtml(user.username, resetUrl);

  await sendEmail({ to: user.email, subject: "Réinitialisation du mot de passe DIVN", html });

  return NextResponse.json({ success: true, message: "Email de réinitialisation envoyé." });
}
