// hooks/useAuth.ts
"use client";

import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (cookie) setIsAuthenticated(true);
  }, []);

  return { isAuthenticated };
}
