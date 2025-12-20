

import { prisma } from "./lib/prisma";

async function main() {
  await prisma.$executeRaw(`
    CREATE TABLE IF NOT EXISTS "User" (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT NOW()
    );
  `);
  console.log("✅ Table User créée ou existait déjà");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
