import axios from "axios";
import { adminQueries } from "./queries/admin-queries";
import { queryClient } from "@/main";

let isRefreshing = false;
let queue: Array<() => void> = [];

const processQueue = () => {
  queue.forEach((cb) => cb());
  queue = [];
};

function forceLogout() {
  queryClient.setQueryData(["me"], null);
}

export const api = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        queue.push(() => {
          resolve(api(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      console.log("трай рефреша");
      await adminQueries.refresh();

      processQueue();

      return api(originalRequest);
    } catch (err) {
      console.log("ошибка при рефреше");
      console.log(err);
      queue = [];
      forceLogout();
      return Promise.reject(err);
    } finally {
      console.log("рефреш завершен");
      isRefreshing = false;
    }
  },
);
