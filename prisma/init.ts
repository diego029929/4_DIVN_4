// prisma/init.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Début de l'initialisation de la base de données...");

  // Création d'utilisateurs de test
  const user1 = await prisma.user.upsert({
    where: { email: "user1@example.com" },
    update: {},
    create: {
      id: "user1",
      name: "Utilisateur 1",
      email: "user1@example.com",
      password: "password123",
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: "user2@example.com" },
    update: {},
    create: {
      id: "user2",
      name: "Utilisateur 2",
      email: "user2@example.com",
      password: "password123",
    },
  });

  // Produits
  await prisma.product.createMany({
    data: [
      { id: "prod1", name: "Produit 1", description: "Description produit 1", price: 29.99 },
      { id: "prod2", name: "Produit 2", description: "Description produit 2", price: 49.99 },
      { id: "prod3", name: "Produit 3", description: "Description produit 3", price: 19.99 },
    ],
    skipDuplicates: true,
  });

  // Paniers
  await prisma.cart.createMany({
    data: [
      { id: "cart1", userId: user1.id, createdAt: new Date() },
      { id: "cart2", userId: user2.id, createdAt: new Date() },
    ],
    skipDuplicates: true,
  });

  // Commandes
  await prisma.order.createMany({
    data: [
      { id: "order1", userId: user1.id, total: 79.98 },
      { id: "order2", userId: user2.id, total: 19.99 },
    ],
    skipDuplicates: true,
  });

  console.log("Initialisation terminée !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
