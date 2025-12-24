import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },

      async authorize(credentials) {
        // Sécurité de base
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Normalisation email (TRÈS IMPORTANT)
        const email = credentials.email.trim().toLowerCase();

        // Recherche user
        const user = await prisma.user.findUnique({
          where: { email },
        });

        // ❌ user inexistant ou sans mot de passe
        if (!user || !user.password) {
          return null;
        }

        // Vérification du mot de passe
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        // ✅ User OK
        return {
          id: user.id,
          email: user.email,
          name: user.username ?? user.email, // NextAuth attend "name"
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
