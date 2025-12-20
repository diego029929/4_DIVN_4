import { prisma } from "../app/lib/prisma.ts"; // ajuste le chemin si nécessaire

async function main() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        id SERIAL PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Table User créée ou existait déjà");
  } catch (error) {
    console.error("❌ Erreur lors de la création de la table :", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
