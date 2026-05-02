import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Scissors,
  BarChart3,
  LogOut,
} from "lucide-react";
import { barbershopNavItems } from "../../constants/navItems";
import useAuth from "../../hooks/useAuth";

const iconMap = {
  dashboard: LayoutDashboard,
  calendar: CalendarDays,
  clipboard: ClipboardList,
  scissors: Scissors,
  chart: BarChart3,
};

function BarbershopBottomNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout?.();
    navigate("/");
  }

  const visibleItems = barbershopNavItems.slice(0, 4);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 flex items-center justify-around"
      style={{
        backgroundColor: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        height: "60px",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {visibleItems.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
        const Icon = iconMap[item.icon];
        return (
          <Link
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center"
            style={{
              flex: 1,
              gap: "3px",
              textDecoration: "none",
              color: isActive ? "#E94560" : "#A8B2C1",
              paddingTop: "6px",
              paddingBottom: "6px",
            }}
          >
            {Icon && <Icon size={20} />}
            <span style={{ fontSize: "10px", fontWeight: isActive ? 600 : 500 }}>
              {item.label}
            </span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="flex flex-col items-center justify-center"
        style={{
          flex: 1,
          gap: "3px",
          background: "none",
          border: "none",
          color: "#A8B2C1",
          cursor: "pointer",
          paddingTop: "6px",
          paddingBottom: "6px",
        }}
      >
        <LogOut size={20} />
        <span style={{ fontSize: "10px", fontWeight: 500 }}>Выйти</span>
      </button>
    </nav>
  );
}

export default BarbershopBottomNav;
