"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, TokenResponse } from "@/services/authService";

/* ================= TYPES ================= */

interface AuthUser {
  id: string;
  email: string;
  role: string;
  name?: string;
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

// Инициалы
export const getInitials = (fullName?: string, email?: string) => {
  if (fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  // fallback на email
  if (email) return email[0].toUpperCase();

  return "";
};

// Цвет как в Gmail (стабильный от строки)
export const getAvatarColor = (text?: string) => {
    if (!text) return "#A3C1AD"; // Ніжний шавлієвий колір замість темного
  
    const colors = [
      "#FFB3BA", // Ніжно-рожевий (замість Red)
      "#FFDFBA", // Світлий персик (замість Pink)
      "#FFFFBA", // Лимонний пастель (замість Purple)
      "#BAFFC9", // М'ятний (замість Deep Purple)
      "#BAE1FF", // Небесно-блакитний (замість Indigo)
      "#D4A5A5", // Пастельна роза
      "#FAD7A0", // М'який беж
      "#A2E1DB", // Аквамарин пастель
      "#D7BDE2", // Лавандовий
      "#E6B0AA", // Попеляста роза
      "#D5DBDB", // Світло-сірий перламутр
      "#A9DFBF", // Блідо-зелений
      "#AED6F1"  // Волошковий пастель
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

  /* -------- FETCH PROFILE (/user/me) -------- */

  const fetchUserProfile = async (token: string) => {
    try {
      const res = await fetch("http://localhost:8081/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      const data = await res.json();

      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: data.name,
            }
          : prev
      );
    } catch (e) {
      console.error("Failed to fetch user profile", e);
    }
  };

  /* -------- INIT -------- */

  useEffect(() => {
    const token = authService.getAccessToken();

    if (token) {
      const parsed = parseJwt(token);
      setUser(parsed);

      // 👇 догружаем имя
      fetchUserProfile(token);
    }

    setLoading(false);
  }, []);

  /* -------- LOGIN -------- */

  const login = (tokens: TokenResponse) => {
    authService.saveTokens(tokens);

    const parsed = parseJwt(tokens.accessToken);
    setUser(parsed);

    // 👇 сразу подтягиваем name
    fetchUserProfile(tokens.accessToken);
  };

  /* -------- LOGOUT -------- */

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

/* ================= HOOK ================= */

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
};
