import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Scissors,
  BarChart3,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { barbershopNavItems, adminNavItems } from "../../constants/navItems";
import roles from "../../constants/roles";

const iconMap = {
  dashboard: LayoutDashboard,
  calendar: CalendarDays,
  clipboard: ClipboardList,
  scissors: Scissors,
  chart: BarChart3,
  users: Users,
  message: MessageSquare,
};

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { role, user, logout } = useAuth();

  const navItems = role === roles.Admin ? adminNavItems : barbershopNavItems;

  function handleLogout() {
    logout?.();
    navigate("/");
  }

  function isActive(itemPath) {
    return pathname === itemPath || pathname.startsWith(itemPath + "/");
  }

  const isAdmin = role === roles.Admin;
  const displayName = isAdmin
    ? user?.name || "Админ"
    : user?.name || "BarbershopKZ";
  const initials = isAdmin
    ? "A"
    : displayName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "AK";

  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        backgroundColor: "#000000",
        width: "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          className="flex items-center"
          style={{
            padding: "20px 20px 16px",
            gap: "10px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span style={{ fontSize: "20px" }}>✂️</span>
          <span
            className="text-white"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            Barber<span style={{ color: "#E94560" }}>Hub</span>
          </span>
          <span
            style={{
              marginLeft: "auto",
              backgroundColor: "#E94560",
              color: "#ffffff",
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: "0.05em",
            }}
          >
            PRO
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "16px 12px 0",
          }}
        >
          {navItems.map((navItem) => (
            <SidebarItem
              key={navItem.path}
              item={navItem}
              active={isActive(navItem.path)}
            />
          ))}
        </nav>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "16px 20px",
        }}
      >
        <div
          className="flex items-center"
          style={{ gap: "12px", marginBottom: "12px" }}
        >
          <div
            className="flex items-center justify-center text-white"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
              fontSize: "14px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              className="text-white truncate"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              {displayName}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#A8B2C1",
                marginTop: "2px",
              }}
            >
              Управление
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center w-full"
          style={{
            gap: "8px",
            backgroundColor: "rgba(233, 69, 96, 0.1)",
            color: "#E94560",
            border: "1px solid rgba(233, 69, 96, 0.25)",
            borderRadius: "8px",
            padding: "9px 12px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(233, 69, 96, 0.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(233, 69, 96, 0.1)";
          }}
        >
          <LogOut size={15} />
          Выйти
        </button>
      </div>
    </aside>
  );
}

function SidebarItem({ item, active }) {
  const Icon = iconMap[item.icon];

  return (
    <Link
      to={item.path}
      className="sidebar-nav-item flex items-center"
      style={{
        padding: "12px 16px",
        borderRadius: "8px",
        fontSize: "15px",
        gap: "12px",
        textDecoration: "none",
        color: active ? "#ffffff" : "#A8B2C1",
        backgroundColor: active ? "rgba(233,69,96,0.2)" : "transparent",
        borderLeft: active
          ? "3px solid #E94560"
          : "3px solid transparent",
        fontWeight: active ? 700 : 500,
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        if (active) return;
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)";
        e.currentTarget.style.color = "#ffffff";
      }}
      onMouseLeave={(e) => {
        if (active) return;
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = "#A8B2C1";
      }}
    >
      {item.emoji ? (
        <span style={{ fontSize: "18px", width: "20px", textAlign: "center" }}>
          {item.emoji}
        </span>
      ) : Icon ? (
        <Icon size={18} />
      ) : null}
      <span>{item.label}</span>
    </Link>
  );
}

export default Sidebar;
