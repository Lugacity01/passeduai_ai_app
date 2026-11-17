import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { LoginCredentials, User } from "../types/auth.types";

import { authService } from "../services/auth.service";
import { authStorage } from "../services/auth.storage";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore an existing session when the app starts.
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const [refreshToken, storedUser] = await Promise.all([
          authStorage.getRefreshToken(),
          authStorage.getUser(),
        ]);

        if (!refreshToken || !storedUser) {
          await authStorage.clearSession();
          return;
        }

        // Verify the session and obtain a fresh access token.
        await authService.refreshAccessToken();

        if (isMounted) {
          setUser(storedUser);
        }
      } catch {
        await authStorage.clearSession().catch(() => {});
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const authenticatedUser = await authService.login(credentials);

    setUser(authenticatedUser);

    return authenticatedUser;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, isLoading, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
