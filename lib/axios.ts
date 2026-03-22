import axios, { AxiosError } from "axios";

export const koraApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KORA_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    throw error;
  }
  throw new AxiosError("An unexpected error occurred");
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="))
      ?.split("=")[1];
  }
  return null;
};

apiClient.interceptors.request.use(
  (config) => {
    if (!apiBaseUrl) {
      return Promise.reject(
        new AxiosError(
          "NEXT_PUBLIC_API_URL is not configured. Set it in your environment before making API calls.",
          "ERR_MISSING_API_URL",
          config,
        ),
      );
    }

    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default apiClient;
