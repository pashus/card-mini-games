import { api } from "@/api";

export const adminQueries = {
  login: async (email: string, password: string) => {
    const res = await api.post<any>("/auth/login", {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await api.post<any>("/auth/logout");
    return res.data;
  },

  refresh: async () => {
    const res = await api.get<any>("/auth/refresh");
    return res.data;
  },

  me: async () => {
    const res = await api.get<any>("/auth/me");
    return res.data;
  },
};
