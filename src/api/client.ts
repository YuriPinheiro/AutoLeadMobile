import axios from "axios";
import { getToken } from "../store/authStorage";

export const api = axios.create({
  baseURL: "http://192.168.1.5:8080",
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
