import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // 🔓 autorise admin/orders sans check
      if (req.nextUrl.pathname === "/admin/orders") {
        return true;
      }

      if (req.nextUrl.pathname.startsWith("/admin")) {
        return !!token;
      }

      return true;
    },
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
