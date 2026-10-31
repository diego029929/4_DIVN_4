import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";
import { cookies } from "next/headers";

export async function POST(
  _: Request,
  { params }: { params: { id: string } }
) {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
  }

  cookies().set("impersonate", params.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  await prisma.adminLog.create({
    data: {
      adminId: admin.id,
      action: "IMPERSONATE",
      targetUserId: params.id,
    },
  });

  return NextResponse.json({ ok: true });
}
