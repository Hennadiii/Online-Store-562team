"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, TokenResponse } from "@/services/authService";

interface AuthUser {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (tokens: TokenResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Декодує JWT без зовнішніх бібліотек
function parseJwt(token: string): AuthUser | null {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(base64));
    return {
      id: json.sub,
      email: json.email || "",
      role: json.role || "USER",
    };
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      const parsed = parseJwt(token);
      setUser(parsed);
    }
    setLoading(false);
  }, []);

  const login = (tokens: TokenResponse) => {
    authService.saveTokens(tokens);
    const parsed = parseJwt(tokens.accessToken);
    setUser(parsed);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};