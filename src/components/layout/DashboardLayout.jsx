import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import colors from "../../constants/colors";

function DashboardLayout() {
  const { pathname } = useLocation();
  const shouldHideTopbar =
    pathname.startsWith("/barbershop/") || pathname.startsWith("/admin/");

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.primary }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {!shouldHideTopbar && <Topbar />}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
