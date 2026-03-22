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
    this.clearTokens();
  },

  saveTokens(tokens: TokenResponse): void {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    // Cookie для middleware (захист роутів)
    document.cookie = `accessToken=${tokens.accessToken}; path=/; max-age=3600; SameSite=Lax`;
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
    // Очищаємо cookie
    document.cookie = "accessToken=; path=/; max-age=0; SameSite=Lax";
  },

  async updateProfile(data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  }): Promise<{ name: string; email: string; phone: string } | null> {
    const token = this.getAccessToken();
    if (!token) return null;

    const res = await fetch(`${AUTH_API_URL}/user/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Помилка оновлення профілю");
    }

    return res.json();
  },

  async changePassword(data: {
    oldPassword: string;
    newPassword: string;
  }): Promise<void> {
    const token = this.getAccessToken();
    if (!token) throw new Error("Не авторизовано");

    const res = await fetch(`${AUTH_API_URL}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Помилка зміни паролю");
    }

    const tokens: TokenResponse = await res.json();
    this.saveTokens(tokens);
  },
};