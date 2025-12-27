import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return NextResponse.json({ message: "Si cet email existe, un lien sera envoyé" });

    const token = randomUUID();
    const expires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1h

    await prisma.passwordResetToken.create({
      data: { token, userId: user.id, expires },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    // ⚡ Envoi email direct
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
          sender: { name: "DIVN", email: "wist.infodev@gmail.com" },
          to: [{ email: user.email }],
          subject: "Réinitialisation de ton mot de passe",
          textContent: `Bonjour ${user.username},\n\nClique sur ce lien pour réinitialiser ton mot de passe :\n${resetUrl}\n\nCe lien expirera dans 1h.`,
        }),
      });

      if (!res.ok) console.error(await res.text());
    } catch (err) {
      console.error("Erreur envoi email :", err);
    }

    return NextResponse.json({ message: "Si cet email existe, un lien a été envoyé." });
  } catch (err) {
    console.error("Erreur /forgot-password :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
  
