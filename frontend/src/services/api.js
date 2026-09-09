import axios from "axios";

// Keep the API base URL consistent whether VITE_API_URL is configured as
// http://127.0.0.1:5000 or http://127.0.0.1:5000/api.
const configuredBaseUrl = import.meta.env.VITE_API_URL?.trim();
const baseURL = configuredBaseUrl
  ? `${configuredBaseUrl.replace(/\/+$/, "")}${configuredBaseUrl.replace(/\/+$/, "").endsWith("/api") ? "" : "/api"}`
  : "http://127.0.0.1:5000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Every protected request automatically uses the currently logged-in user's JWT.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
