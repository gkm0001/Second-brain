import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { AuthState } from "./Auth";



const ProtectedRoute = () => {
  const auths = useRecoilValue(AuthState);
  return  auths.isAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default ProtectedRoute;
