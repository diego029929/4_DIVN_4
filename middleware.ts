import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Zone admin
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.id !== undefined;
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
