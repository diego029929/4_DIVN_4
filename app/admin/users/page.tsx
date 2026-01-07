"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type User = {
  id: string;
  email: string;
  username: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  async function deleteUser(id: string) {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="p-4">Chargement…</p>;

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Gestion des utilisateurs</h1>
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.username} ({user.email})</CardTitle>
              <CardDescription>
                Role : {user.role} | Verified : {user.isVerified ? "Oui" : "Non"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteUser(user.id)}
              >
                Supprimer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
      }
        
