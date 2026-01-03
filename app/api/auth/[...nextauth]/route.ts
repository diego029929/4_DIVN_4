import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            throw new Error("Champs manquants")
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })

          if (!user) {
            throw new Error("Utilisateur introuvable")
          }

          if (!user.isVerified) {
            throw new Error("Compte non vérifié")
          }

          const valid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!valid) {
            throw new Error("Mot de passe incorrect")
          }

          // ✅ OBLIGATOIRE : retourner un objet user SIMPLE
          return {
            id: user.id,
            email: user.email,
            name: user.username ?? user.email,
          }
        } catch (err) {
          console.error("AUTH_ERROR", err)
          return null // ⚠️ IMPORTANT
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
  
