import api from "../api/axios";

const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

const register = async (username, email, password) => {
  const res = await api.post("users/register/", { username, email, password });
  return res.data;
};

const login = async (username, password) => {
  const res = await api.post("users/login/", { username, password });
  if (res.data.access) {
    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);
    setAuthHeader(res.data.access); // ✅ attach token to axios
  }
  return res.data;
};

const logout = async () => {
  const refresh = localStorage.getItem("refresh");
  await api.post("users/logout/", { refresh });
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  setAuthHeader(null);
};

const getProfile = async () => {
  const token = localStorage.getItem("access");
  if (token) setAuthHeader(token); // ✅ ensure header is set
  const res = await api.get("users/profile/");
  return res.data;
};

export default { register, login, logout, getProfile };
