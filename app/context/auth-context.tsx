import { useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/check-session", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        setUser(data?.user ?? null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
}
