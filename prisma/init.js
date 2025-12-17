// prisma/init.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Début de l'initialisation de la base de données...");

  // Création d'utilisateurs de test
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    },
  });

  // Création de produits de test
  const products = [
    {
      name: "Produit 1",
      description: "Description du produit 1",
      price: 19.99,
      image: "/images/product1.jpg",
    },
    {
      name: "Produit 2",
      description: "Description du produit 2",
      price: 29.99,
      image: "/images/product2.jpg",
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { name: p.name },
      update: {},
      create: p,
    });
  }

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
