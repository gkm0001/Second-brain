import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [token, setToken] = useState<boolean>(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      setToken(!!storedToken);   
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
