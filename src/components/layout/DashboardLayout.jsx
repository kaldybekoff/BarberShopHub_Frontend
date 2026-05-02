import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BarbershopBottomNav from "./BarbershopBottomNav";
import colors from "../../constants/colors";

function DashboardLayout() {
  const { pathname } = useLocation();
  const isBarbershop = pathname.startsWith("/barbershop/");
  const shouldHideTopbar = isBarbershop;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: colors.primary }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        {!shouldHideTopbar && <Topbar />}
        <main className={`flex-1 overflow-y-auto ${isBarbershop ? "pb-16 md:pb-0" : ""}`}>
          <Outlet />
        </main>
      </div>
      {isBarbershop && <BarbershopBottomNav />}
    </div>
  );
}

export default DashboardLayout;
