import axios from "axios";

const rawBase = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/";
// ensure exactly one trailing slash
const normalizedBase = rawBase.replace(/\/+$/, "") + "/";

const api = axios.create({
  baseURL: normalizedBase,
  headers: { "Content-Type": "application/json" },
});

// interceptor (your existing logic unchanged)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // if config.url is undefined (rare), treat as empty string
  const url = (config.url || "").replace(/^\/+/, "");

  const isPublicEndpoint =
    url.startsWith("products") ||
    url.startsWith("categories") ||
    url.startsWith("pages") ||
    url.startsWith("home") ||
    url.startsWith("footer") ||
    url.startsWith("users/register") ||
    url.startsWith("users/login");

  if (token && !isPublicEndpoint) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  console.log("➡️ Request:", {
    fullUrl: config.baseURL + url,
    headers: config.headers,
  });

  return config;
});

export default api;
