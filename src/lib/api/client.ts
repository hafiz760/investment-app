import axios, { AxiosError, AxiosInstance } from "axios";
import { ApiError } from "../types/auth";
import { store } from "../store";
import { clearAuth } from "../store/slices/authSlice";
import { clearAuthCookie } from "../utils/cookies";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://roi-backend-7rbr.onrender.com";

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    let token = state.auth.accessToken;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const apiError: ApiError = {
      statusCode:
        error.response?.data?.statusCode || error.response?.status || 500,
      message:
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred",
      error: error.response?.data?.error || "Error",
    };

    if (apiError.statusCode === 401 && typeof window !== "undefined") {
      store.dispatch(clearAuth());
      clearAuthCookie();
      // if (
      //   !window.location.pathname.startsWith("/sign-in") &&
      //   !window.location.pathname.startsWith("/sign-up")
      // ) {
      //   window.location.href = "/sign-in";
      // }
    }

    return Promise.reject(apiError);
  }
);

export default apiClient;
