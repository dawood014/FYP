import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { authApi, type User } from "../api/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (input: { name: string; email: string; password: string; role: "buyer" | "seller" }) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<User | null>;
};
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try { const current = await authApi.me(); setUser(current); return current; }
    catch { setUser(null); return null; }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const value = useMemo<AuthContextValue>(() => ({
    user, loading, refresh,
    login: async (email, password) => { const next = await authApi.login(email, password); setUser(next); return next; },
    register: async (input) => { const next = await authApi.register(input); setUser(next); return next; },
    logout: async () => { try { await authApi.logout(); } finally { setUser(null); } },
  }), [user, loading, refresh]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider.");
  return value;
}
export function RequireRole({ role, children }: { role: User["role"]; children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div aria-busy="true" />;
  if (!user) return <Navigate to={role === "admin" ? "/admin/login" : "/login"} replace state={{ from: location.pathname }} />;
  if (user.role !== role) return <Navigate to={user.role === "admin" ? "/admin" : user.role === "seller" ? "/seller" : "/buyer"} replace />;
  return <>{children}</>;
}
