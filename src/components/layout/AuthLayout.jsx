import { Outlet } from "react-router-dom";
import colors from "../../styles/colors";

function AuthLayout() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: colors.primary }}
    >
      <Outlet />
    </div>
  );
}

export default AuthLayout;
