import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Initialisation de la base de données DIVN...");

  // --- USERS ---
  const userCount = await prisma.user.count();
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10); // mot de passe admin
    await prisma.user.create({
      data: {
        email: "admin@divn.com",
        password: hashedPassword,
        name: "Admin",
      },
    });
    console.log("Utilisateur admin créé ✅");
  }

  // --- PRODUCTS ---
  const productCount = await prisma.product.count();
  if (productCount === 0) {
    await prisma.product.createMany({
      data: [
        { name: "T-shirt Noir", price: 29.99, description: "T-shirt minimaliste noir", stock: 50 },
        { name: "Hoodie Gold", price: 79.99, description: "Hoodie premium noir avec détails dorés", stock: 30 },
      ],
    });
    console.log("Produits initiaux créés ✅");
  }

  // --- ORDERS (optionnel) ---
  const orderCount = await prisma.order.count();
  if (orderCount === 0) {
    console.log("Aucune commande initiale à créer pour le moment");
  }

  console.log("Initialisation terminée ✅");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
