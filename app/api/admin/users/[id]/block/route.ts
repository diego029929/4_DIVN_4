import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/users/[id]/block?block=true|false
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });
    }

    const { searchParams } = new URL(req.url);
    const blockParam = searchParams.get("block");
    const block = blockParam === "true";

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Mettre à jour l'état bloqué
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isBlocked: block },
      select: { id: true, username: true, isBlocked: true },
    });

    return NextResponse.json({
      message: block ? "Utilisateur bloqué" : "Utilisateur débloqué",
      user: updatedUser,
    });
  } catch (err) {
    console.error("PATCH /api/admin/users/[id]/block error:", err);
    return NextResponse.json(
      { error: "Impossible de bloquer/débloquer l'utilisateur" },
      { status: 500 }
    );
  }
}
  
