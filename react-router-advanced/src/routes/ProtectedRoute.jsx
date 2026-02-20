import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Fake auth check
  const isAuthenticated = localStorage.getItem("isAuth") === "true";

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}