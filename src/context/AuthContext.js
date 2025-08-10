import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AuthService from "../services/AuthService";

// 1. Create the Context
const AuthContext = createContext(null);

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for a token on initial app load
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > new Date().getTime()) {
          setUser({ token, role: getRoleFromToken(token) });
        }
      } catch (e) {
        setUser(null);
      }
    }
  }, []);

  const login = async (credentials) => {
    const response = await AuthService.login(credentials);
    const token = response.data.token || response.data;
    if (token && typeof token === "string") {
      localStorage.setItem("user_token", token);
      const role = getRoleFromToken(token);
      setUser({ token, role });
      // Navigate to the correct dashboard based on role
      if (role === "PATIENT") {
        navigate("/dashboard");
      } else {
        navigate("/patients");
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

  const getRoleFromToken = (token) => {
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
      return null;
    }
  };

  const value = {
    isAuthenticated: !!user,
    userRole: user?.role,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Create the custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
};
