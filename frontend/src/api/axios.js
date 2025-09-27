import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptor to attach access token only for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");

  // Normalize URL (remove leading slash if any)
  const url = config.url.replace(/^\/+/, "");

  // ✅ Public endpoints (no Authorization)
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
    delete config.headers.Authorization; // force remove if public
  }

  // 🐞 Debug logs
  console.log("➡️ Request:", {
    fullUrl: config.baseURL + url,
    headers: config.headers,
  });

  return config;
});

export default api;
