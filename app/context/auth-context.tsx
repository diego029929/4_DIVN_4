"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

        const res = await fetch(`${baseUrl}/api/check-session`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // ⬇️ PAS D’ERREUR SERVEUR
        if (!res.ok) {
          if (isMounted) setUser(null);
          return;
        }

        const data = await res.json();

        if (isMounted) {
          setUser(data?.user ?? null);
        }
      } catch (err) {
        // ⬇️ JAMAIS throw
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
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
            
