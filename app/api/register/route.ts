// app/api/register/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Vérifie si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crée l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  // Crée un cookie de session
  const response = NextResponse.json({ message: "User registered" });
  response.cookies.set({
    name: "user-email",
    value: user.email,
    httpOnly: true,
    path: "/", // cookie accessible sur tout le site
    maxAge: 60 * 60 * 24 * 7, // 1 semaine
  });

  return response;
}
