import { PrismaClient } from "@prisma/client";

// ✅ Gestion globale pour éviter plusieurs instances en dev
declare global {
  // Utilise InstanceType pour typer correctement PrismaClient
  var prisma: InstanceType<typeof PrismaClient> | undefined;
}

// Crée l’instance si elle n’existe pas
export const prisma =
  global.prisma ?? new PrismaClient({
    log: ["error"], // optionnel, utile pour debug
  });

// Stocke l’instance globale en dev pour HMR
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
