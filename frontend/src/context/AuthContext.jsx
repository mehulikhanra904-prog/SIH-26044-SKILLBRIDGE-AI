import { createContext, useContext, useState } from "react";

const AuthContext = createContext();
const VALID_ROLES = ["student", "college", "company"];

function readSavedUser() {
  try {
    const saved = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!saved || !token) return null;

    const parsed = JSON.parse(saved);
    if (!parsed?.role || !VALID_ROLES.includes(parsed.role)) return null;

    return parsed;
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSavedUser);

  const login = (userData, token) => {
    if (!userData?.role || !VALID_ROLES.includes(userData.role) || !token) {
      throw new Error("Invalid login data returned by the server.");
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
