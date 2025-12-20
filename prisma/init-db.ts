import { prisma, sql } from "../app/lib/prisma"; // ajuste selon ton projet

async function main() {
  await prisma.$executeRaw(
    sql`CREATE TABLE IF NOT EXISTS "User" (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT NOW()
    );`
  );

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
