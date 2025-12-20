// /app/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

// On utilise un singleton pour éviter de recréer PrismaClient à chaque reload en développement
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // optionnel pour debug
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
