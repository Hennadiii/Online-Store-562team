"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, TokenResponse } from "@/services/authService";

/* ================= TYPES ================= */

interface AuthUser {
  id: string;
  email: string;
  role: string;
  name?: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (tokens: TokenResponse) => void;
  logout: () => Promise<void>;
}

/* ================= CONTEXT ================= */

const AuthContext = createContext<AuthContextType | null>(null);

/* ================= JWT PARSER ================= */

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

/* ================= HELPERS ================= */

export const getInitials = (fullName?: string, email?: string) => {
  if (fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  if (email) return email[0].toUpperCase();
  return "";
};

export const getAvatarColor = (text?: string) => {
  if (!text) return "#A3C1AD";
  const colors = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#D4A5A5", "#FAD7A0", "#A2E1DB", "#D7BDE2", "#E6B0AA",
    "#D5DBDB", "#A9DFBF", "#AED6F1"
  ];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/* ================= PROVIDER ================= */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();

      setUser((prev) =>
        prev ? { ...prev, name: data.name, phone: data.phone, email: data.email } : prev
      );
    } catch (e) {
      console.error("Failed to fetch user profile", e);
    }
  };

  useEffect(() => {
    const token = authService.getAccessToken();
    if (token) {
      const parsed = parseJwt(token);
      setUser(parsed);
      fetchUserProfile(token);
    }
    setLoading(false);
  }, []);

  const login = (tokens: TokenResponse) => {
    authService.saveTokens(tokens);
    const parsed = parseJwt(tokens.accessToken);
    setUser(parsed);
    fetchUserProfile(tokens.accessToken);
    // Повідомляємо OrderContext що з'явився новий залогінений юзер
    window.dispatchEvent(new CustomEvent("auth:login", { detail: { userId: parsed?.id } }));
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    // Повідомляємо OrderContext що юзер вийшов — треба очистити замовлення
    window.dispatchEvent(new Event("auth:logout"));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};