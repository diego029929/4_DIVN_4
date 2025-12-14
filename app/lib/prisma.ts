import { PrismaClient } from "@prisma/client";

// Déclare la variable globale pour éviter plusieurs instances en dev
declare global {
  var prisma: InstanceType<typeof PrismaClient> | undefined;
}

// Crée l’instance si elle n’existe pas
export const prisma =
  global.prisma ?? new PrismaClient({
    log: ["error"], // optionnel mais pratique pour debug
  });

// En dev, stocke l’instance globale pour HMR
if (process.env.NODE_ENV !== "production") global.prisma = prisma;
