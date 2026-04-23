import { getToken, removeToken, saveToken } from "@/src/store/authStorage";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";
import { AuthRole, AuthTokenPayload } from "../types.ts/auth";

export type User = {
  id: string;
  email: string;
  role: AuthRole;
};

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  checkAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,
  user: null,

  checkAuth: async () => {
    const token = await getToken();

    if (!token) {
      set({
        token: null,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
      return;
    }

    try {
      const decoded = jwtDecode<AuthTokenPayload>(token);

      const now = Date.now() / 1000;

      // token expirado
      if (decoded.exp < now) {
        await removeToken();

        set({
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        return;
      }

      set({
        token,
        isAuthenticated: true,
        user: {
          id: decoded.sub,
          email: decoded.email,
          role: decoded.role,
        },
        isLoading: false,
      });
    } catch (err) {
      await removeToken();

      set({
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  login: async (token: string) => {
    await saveToken(token);
    await get().checkAuth();
  },

  logout: async () => {
    await removeToken();

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },
}));
