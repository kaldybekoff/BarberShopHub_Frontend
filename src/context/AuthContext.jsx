import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function getSavedUser() {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
}

function getSavedToken() {
  return localStorage.getItem("token") || null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedUser);
  const [token, setToken] = useState(getSavedToken);

  function login(userData, userToken) {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}