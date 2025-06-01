// hooks/useAuth.js
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "http://localhost:8080";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const getStoredToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("admin_token");
    }
    return null;
  };

  const setStoredToken = (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_token", token);
    }
  };

  const removeStoredToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
    }
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE}/users/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Token verification failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Token verification error:", error);
      throw error;
    }
  };

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();

      // Store token
      setStoredToken(data.access_token);

      // Set user data
      setUser(data.user);
      setIsAuthenticated(true);
      setError(null);

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    removeStoredToken();
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    router.push("/admin/login");
  };

  const makeAuthenticatedRequest = async (url, options = {}) => {
    const token = getStoredToken();
    if (!token) {
      logout();
      throw new Error("No authentication token");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        logout();
        throw new Error("Authentication failed");
      }

      return response;
    } catch (error) {
      if (error.message === "Authentication failed") {
        throw error;
      }
      throw new Error(`Request failed: ${error.message}`);
    }
  };

  // Check authentication on hook initialization
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const token = getStoredToken();

      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await verifyToken(token);
        setUser(userData.user);
        setIsAuthenticated(true);
        setError(null);
      } catch (error) {
        console.error("Auth check failed:", error);
        removeStoredToken();
        setIsAuthenticated(false);
        setError("Session expired. Please login again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    makeAuthenticatedRequest,
    setError,
  };
};
