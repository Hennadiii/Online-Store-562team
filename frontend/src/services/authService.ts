const AUTH_API_URL = process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:8081";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const authService = {
  async login(data: LoginRequest): Promise<TokenResponse> {
    const res = await fetch(`${AUTH_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.message || "Невірний email або пароль");
    }
    return res.json();
  },

  async register(data: RegisterRequest): Promise<void> {
    const res = await fetch(`${AUTH_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.message || "Помилка реєстрації");
    }
  },

  async getMe(): Promise<UserProfile | null> {
    const token = this.getAccessToken();
    if (!token) return null;
    const res = await fetch(`${AUTH_API_URL}/user/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    return res.json();
  },

  async logout(): Promise<void> {
    const token = this.getAccessToken();
    if (token) {
      await fetch(`${AUTH_API_URL}/user/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  saveTokens(tokens: TokenResponse): void {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },

  getAccessToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  isLoggedIn(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("accessToken");
  },

  clearTokens(): void {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};