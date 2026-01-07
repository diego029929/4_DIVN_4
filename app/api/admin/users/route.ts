import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users → liste tous les utilisateurs
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        isVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET /api/admin/users error:", err);
    return NextResponse.json(
      { error: "Impossible de récupérer les utilisateurs" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users?id=USER_ID → supprime un utilisateur
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing user id" },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    console.error("DELETE /api/admin/users error:", err);
    return NextResponse.json(
      { error: "Impossible de supprimer l'utilisateur" },
      { status: 500 }
    );
  }
}
  
