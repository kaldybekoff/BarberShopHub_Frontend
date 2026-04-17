import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import colors from "../../constants/colors";

function MainLayout() {
  const { pathname } = useLocation();
  const shouldHideHeader = pathname.startsWith("/booking/");
  const shouldHideBottomNav =
    pathname.startsWith("/booking/") ||
    pathname === "/booking-success" ||
    pathname.startsWith("/shops/");

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.primary }}>
      {!shouldHideHeader && <Header />}
      <main className={`flex-1 overflow-y-auto ${shouldHideBottomNav ? "pb-0" : "pb-20 md:pb-0"}`}>
        <Outlet />
      </main>
      {!shouldHideBottomNav && <BottomNav />}
    </div>
  );
}

export default MainLayout;
