import axios, { type AxiosError } from "axios";
import type { UninterceptedApiError } from "../types/api";
import { getToken } from "./cookies";

const api = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }

  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
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
