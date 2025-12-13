import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Crée un cookie de session
  const response = NextResponse.json({ message: "Logged in" });
  response.cookies.set({
    name: "user-email",
    value: user.email,
    httpOnly: true,
    path: "/",
  });

  return response;
}
