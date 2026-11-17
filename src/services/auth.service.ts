import { api } from "./api";
import { authStorage } from "./auth.storage";

import type {
  LoginCredentials,
  LoginResponse,
  RefreshResponse,
  User,
} from "../types/auth.types";

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post<LoginResponse>("/api/login", credentials);

    await authStorage.saveTokens(response.accessToken, response.refreshToken);

    await authStorage.saveUser(response.user);

    return response.user;
  },

  async refreshAccessToken(): Promise<string> {
    const refreshToken = await authStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await api.post<RefreshResponse>("/api/refresh", {
      refreshToken,
    });

    await authStorage.saveAccessToken(response.accessToken);

    if (response.refreshToken) {
      await authStorage.saveRefreshToken(response.refreshToken);
    }

    return response.accessToken;
  },

  async logout(): Promise<void> {
    const refreshToken = await authStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await api.post("/api/logout", { refreshToken });
      }
    } finally {
      await authStorage.clearSession();
    }
  },
};
