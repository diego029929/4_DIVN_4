import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export default async function AdminOrdersPage() {
  const session = await getServerSession(authOptions);

  // 🔥 DEV OVERRIDE (TEMPORAIRE)
  const allow =
    process.env.ADMIN_EMAIL &&
    session?.user?.email === process.env.ADMIN_EMAIL;

  if (!allow) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Admin Orders (Preview)</h1>
        <p>Access denied (dev override not active)</p>
        <p>
          USER: {session?.user?.email}
          <br />
          ADMIN: {process.env.ADMIN_EMAIL}
        </p>
      </div>
    );
  }

  // 👉 ICI TON UI EXISTANTE
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Orders</h1>
      <p>🎉 Tu vois enfin la page admin</p>
    </div>
  );
}
