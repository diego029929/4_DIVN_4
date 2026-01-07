import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  return prisma.user.findUnique({
    where: { id: session.user.id },
  });
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // 🔥 ADMIN VIA ENV (DEV / PREVIEW)
  if (
    process.env.ADMIN_EMAIL &&
    user.email === process.env.ADMIN_EMAIL
  ) {
    return user;
  }

  // 🔒 ADMIN NORMAL VIA DB
  if (user.role !== "ADMIN" || user.isBlocked) {
    throw new Error("Not authorized");
  }

  return user;
    }
  
