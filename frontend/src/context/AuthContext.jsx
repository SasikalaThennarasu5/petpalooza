import { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getProfile();
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };
    fetchProfile();
  }, []);

  const login = async (username, password) => {
    await authService.login(username, password);
    const data = await authService.getProfile();
    setUser(data);
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const register = async (username, email, password) => {
    await authService.register(username, email, password);
    // Auto login after registration
    await authService.login(username, password);
    const data = await authService.getProfile();
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
