import { Outlet } from "react-router-dom";
import Header from "./Header";
import BottomNav from "./BottomNav";
import colors from "../../styles/colors";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.primary }}>
      <Header />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}

export default MainLayout;
