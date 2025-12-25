import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "username" VARCHAR(255) NOT NULL UNIQUE,
      "email" VARCHAR(255) NOT NULL UNIQUE,
      "password" VARCHAR(255) NOT NULL,
      "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS "verification_tokens" (
      "id" SERIAL PRIMARY KEY,
      "token" VARCHAR(255) NOT NULL UNIQUE,
      "userId" INTEGER NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
      "expires" TIMESTAMP NOT NULL
    );
  `);

  console.log("Tables créées !");
}

main()
  .catch(e => console.error(e))
  .finally(async () => { await prisma.$disconnect() });
