import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export async function POST(
  _: Request,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin();

  if (admin.id === params.id) {
    return NextResponse.json(
      { error: "Cannot block yourself" },
      { status: 400 }
    );
  }

  await prisma.user.update({
    where: { id: params.id },
    data: { isBlocked: true },
  });

  await prisma.adminLog.create({
    data: {
      adminId: admin.id,
      action: "BLOCK_USER",
      targetUserId: params.id,
    },
  });

  return NextResponse.json({ ok: true });
}
