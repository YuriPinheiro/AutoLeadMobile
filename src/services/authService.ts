import { api } from "@/src/api/client";
import axios from "axios";
import { CommonError } from "../api/errors/common-error";

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message = error.response?.data?.message || "Erro ao fazer login";

      throw new CommonError(status, message);
    }

    throw new Error("Erro desconhecido");
  }
};

export const register = async (name: string, phone: string, email: string, password: string) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      phone,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 0;
      const message = error.response?.data?.message || "Erro ao registrar usuário";

      throw new CommonError(status, message);
    }

    throw new Error("Erro desconhecido");
  }
};
