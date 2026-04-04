import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { barbershopNavItems, adminNavItems } from "../../constants/navItems";
import roles from "../../constants/roles";
import colors from "../../styles/colors";

function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { role, logout } = useAuth();

  const navItems = role === roles.Admin ? adminNavItems : barbershopNavItems;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <aside
      className="hidden md:flex flex-col w-56 min-h-screen sticky top-0"
      style={{ backgroundColor: colors.dark, borderRight: `1px solid ${colors.light}` }}
    >
      {/* Логотип */}
      <div className="px-5 py-5">
        <span className="text-white font-bold text-lg">
          Barber<span style={{ color: colors.accent }}>HUB</span>
        </span>
      </div>

      {/* Навигация */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {navItems.map((navItem) => {
          const isActive = pathname === navItem.path;
          return (
            <Link
              key={navItem.path}
              to={navItem.path}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? colors.accent : "transparent",
                color: isActive ? "#ffffff" : colors.gray,
              }}
            >
              <span className="text-base">{navItem.icon}</span>
              {navItem.label}
            </Link>
          );
        })}
      </nav>

      {/* Выйти */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full"
          style={{ color: colors.gray }}
        >
          <span className="text-base">🚪</span>
          Выйти
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
