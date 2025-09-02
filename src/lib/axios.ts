import axios, { type AxiosError } from "axios";
import type { UninterceptedApiError } from "../types/api";
import { getToken, removeToken } from "./cookies";
import { persistor } from "store";

function isServer() {
  return typeof window === "undefined";
}

export const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use(async (config) => {
  const token = isServer ? await getToken() : "";
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError<UninterceptedApiError>) => {
    if (error.response.status === 401) {
      await persistor.purge();
      await removeToken();
      window.location.href = "/login";
    }

    if (error.response?.data.error) {
      return Promise.reject({
        ...error,
        response: {
          data: {
            message: error.response.data.error.message,
          },
        },
      });
    }
    return Promise.reject(error);
  }
);
