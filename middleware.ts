import { withAuth } from "next-auth/middleware";

// Les pages /admin sont réservées aux administrateurs.
// Les routes /api/admin vérifient aussi le rôle elles-mêmes (requireAdmin).
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token) return false;

      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail && token.email === adminEmail) return true;

      return token.role === "ADMIN";
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
