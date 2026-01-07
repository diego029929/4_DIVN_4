import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-server";

export default async function AdminUsersPage() {
  await requireAdmin();

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Users</h1>

      {users.map((u) => (
        <div key={u.id} className="flex gap-4 mb-2">
          <span>{u.email}</span>
          <span>{u.role}</span>
          <span>{u.isBlocked ? "❌" : "✅"}</span>

          <form action={`/api/admin/users/${u.id}/block`} method="POST">
            <button>Block</button>
          </form>

          <form action={`/api/admin/impersonate/${u.id}`} method="POST">
            <button>Impersonate</button>
          </form>
        </div>
      ))}
    </div>
  );
}

