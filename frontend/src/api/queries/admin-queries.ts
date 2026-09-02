import { api } from "@/api";
import type {
  IAdminLoginResponse,
  IAdminLogoutResponse,
  IAdminMeResponse,
  IAdminRefreshResponse,
} from "@/types";

export const adminQueries = {
  login: async (email: string, password: string) => {
    const res = await api.post<IAdminLoginResponse>("/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await api.post<IAdminLogoutResponse>("/auth/logout");
    return res.data;
  },

  refresh: async () => {
    const res = await api.get<IAdminRefreshResponse>("/auth/refresh");
    return res.data;
  },

  me: async () => {
    const res = await api.get<IAdminMeResponse>("/auth/me");
    return res.data;
  },
};
