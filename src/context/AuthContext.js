import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";

const getRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const decoded = jwtDecode(token);
    const authority = decoded.authorities && decoded.authorities[0];
    let roleString =
      typeof authority === "object" ? authority.authority : authority;
    if (roleString && roleString.startsWith("ROLE_")) {
      roleString = roleString.substring(5);
    }
    return roleString;
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("user_token");
      if (token) {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > new Date().getTime()) {
          setUser({ token, role: getRoleFromToken(token) });
        } else {
          localStorage.removeItem("user_token");
        }
      }
    } catch (e) {
      localStorage.removeItem("user_token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    const response = await AuthService.login(credentials);
    const token = response.data.token || response.data;
    if (token && typeof token === "string") {
      localStorage.setItem("user_token", token);
      const role = getRoleFromToken(token);
      setUser({ token, role });

      if (role === "PATIENT") {
        navigate("/dashboard");
      } else {
        navigate("/doctor-dashboard");
      }
    }
  };

  const logout = () => {
    AuthService.logout().catch((err) =>
      console.error("Backend logout failed", err)
    );
    localStorage.removeItem("user_token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    isAuthenticated: !!user,
    userRole: user?.role,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
