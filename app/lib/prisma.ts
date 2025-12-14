import { PrismaClient } from "@prisma/client";

// Gestion globale pour éviter plusieurs instances en dev
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
