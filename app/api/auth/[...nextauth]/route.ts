import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { logger } from "@/lib/logger.server"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            logger.warn("Auth refusée : champs manquants")
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            logger.warn("Auth refusée : utilisateur introuvable", {
              email: credentials.email,
            })
            return null
          }

          if (!user.isVerified) {
            logger.warn("Auth refusée : compte non vérifié", {
              userId: user.id,
            })
            return null
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!valid) {
            logger.warn("Auth refusée : mot de passe incorrect", {
              userId: user.id,
            })
            return null
          }

          logger.info("Connexion réussie", {
            userId: user.id,
          })

          // ✅ OBLIGATOIRE : retourner un objet simple
          return {
            id: user.id,
            email: user.email,
            name: user.username ?? user.email,
          }
        } catch (error) {
          logger.error("Erreur lors de l’authentification", { error })
          return null
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
          
