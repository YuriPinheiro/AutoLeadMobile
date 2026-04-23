import { getToken, removeToken, saveToken } from "@/src/store/authStorage";
import { create } from "zustand";

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  checkAuth: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  checkAuth: async () => {
    const token = await getToken();

    set({
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  },

  login: async (token: string) => {
    await saveToken(token);

    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await removeToken();

    set({
      token: null,
      isAuthenticated: false,
    });
  },
}));
