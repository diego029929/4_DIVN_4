import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/verify?success=false", url.origin)
    );
  }

  const record = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!record) {
    return NextResponse.redirect(
      new URL("/verify?success=false", url.origin)
    );
  }

  if (record.expires < new Date()) {
    await prisma.verificationToken.delete({
      where: { id: record.id },
    });

    return NextResponse.redirect(
      new URL("/verify?success=false", url.origin)
    );
  }

  // 🔒 sécurité : vérifier si l’utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email: record.email },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        username: record.username,
        email: record.email,
        password: record.password,
        isVerified: true,
      },
    });
  }

  // 🧹 supprimer le token
  await prisma.verificationToken.delete({
    where: { id: record.id },
  });

  // ✅ redirection vers la page de confirmation
  return NextResponse.redirect(
    new URL("/verify?success=true", url.origin)
  );
}
