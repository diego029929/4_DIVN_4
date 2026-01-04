"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false, // ⬅️ COMME AVANT
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false); // ⬅️ 🔥 LA SEULE MODIF

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("/api/check-session", {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user ?? null);
        }
      } catch {
        setUser(null);
      } finally {
        // loading reste false → header OK
      }
    }

    check();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
