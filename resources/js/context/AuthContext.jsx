import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/user");
      setUser(data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateProfile = async (formData) => {
    const updated = await apiFetch("/api/user", {
      method: "PATCH",
      body: formData,
    });
    setUser((prev) => ({ ...prev, ...updated }));
    return updated;
  };

  const logout = async () => {
    try {
      await apiFetch("/logout", { method: "POST" });
    } catch {
      // Continue to redirect
    } finally {
      setUser(null);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        fetchUser,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
