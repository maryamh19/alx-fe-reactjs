export default function useAuth() {
  const isAuthenticated = localStorage.getItem("isAuth") === "true";

  return { isAuthenticated };
}