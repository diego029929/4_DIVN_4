import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { sendEmail } from "@/lib/email";
import { renderResetPasswordEmail } from "@/lib/email-renderer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

    const token = randomUUID();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1h

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${encodeURIComponent(token)}`;
    const htmlContent = renderResetPasswordEmail(resetUrl);

    await sendEmail({
      to: email,
      subject: "Réinitialisation de mot de passe DIVN",
      html: htmlContent,
    });

    return NextResponse.json({ success: true, message: "Email de réinitialisation envoyé !" });
  } catch (err: any) {
    console.error("Erreur /api/forgot-password:", err);
    return NextResponse.json({ error: err.message || "Erreur serveur" }, { status: 500 });
  }
}
