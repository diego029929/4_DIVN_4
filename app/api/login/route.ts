import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json(
      { message: "Identifiants invalides" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return NextResponse.json(
      { message: "Identifiants invalides" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("user-email", email, { httpOnly: true });

  return NextResponse.json({ success: true });
}
