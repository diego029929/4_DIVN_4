import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    if (!token || !newPassword) return NextResponse.json({ error: "Champs requis" }, { status: 400 });

    const record = await prisma.passwordResetToken.findUnique({ where: { token } });
    if (!record || record.expires < new Date()) {
      if (record) await prisma.passwordResetToken.delete({ where: { id: record.id } });
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: record.userId }, data: { password: hashedPassword } });
    await prisma.passwordResetToken.delete({ where: { id: record.id } });

    return NextResponse.json({ message: "Mot de passe mis à jour ✅" });
  } catch (err) {
    console.error("Erreur /reset-password :", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
  }
      
