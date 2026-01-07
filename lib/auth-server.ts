import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
  });
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN" || user.isBlocked) {
    throw new Error("Unauthorized");
  }

  return user;
}
