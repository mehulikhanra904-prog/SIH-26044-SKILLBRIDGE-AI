import axios from "axios";

// Use VITE_API_URL when deployed. For local development, use IPv4 explicitly
// because Windows may resolve localhost to ::1 while the backend is listening
// on 127.0.0.1.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
