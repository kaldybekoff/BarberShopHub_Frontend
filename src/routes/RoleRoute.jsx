import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function RoleRoute({ allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
}

export default RoleRoute;
