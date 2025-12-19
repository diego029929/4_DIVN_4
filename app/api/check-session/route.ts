// /app/api/check-session/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const auth = cookie
    .split(";")
    .find(c => c.trim().startsWith("auth="))
    ?.split("=")[1];

  if (!auth) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(auth) },
    select: { id: true, email: true },
  });

  return NextResponse.json({ user: user ?? null });
}
