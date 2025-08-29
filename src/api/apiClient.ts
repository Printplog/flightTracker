import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:5174",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});
