import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import * as Sentry from "@sentry/nextjs"

import { prisma } from "@/lib/prisma"
import { logtail } from "@/lib/logger"
import bcrypt from "bcryptjs"

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
            logtail.warn("Auth refusée : champs manquants")
            return null
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            logtail.warn("Auth refusée : utilisateur introuvable", {
              email: credentials.email,
            })
            return null
          }

          if (!user.isVerified) {
            logtail.warn("Auth refusée : compte non vérifié", {
              userId: user.id,
            })
            return null
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!valid) {
            logtail.warn("Auth refusée : mot de passe incorrect", {
              userId: user.id,
            })
            return null
          }

          logtail.info("Connexion réussie", {
            userId: user.id,
          })

          // 🔍 Sentry context
          Sentry.setUser({
            id: user.id,
            email: user.email,
          })

          return {
            id: user.id,
            email: user.email,
            name: user.username ?? user.email,
          }
        } catch (error) {
          // 🧠 Sentry
          Sentry.captureException(error)

          // 📜 Logtail
          logtail.error("Erreur lors de l’authentification", {
            error,
          })

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
