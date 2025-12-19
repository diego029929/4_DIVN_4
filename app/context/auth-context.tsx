"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = { id: number; email: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/check-session", { credentials: "include" });
      if (!res.ok) return setUser(null);
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
