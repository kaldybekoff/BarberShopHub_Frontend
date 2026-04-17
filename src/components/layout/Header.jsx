import { Link, useLocation } from "react-router-dom";
import { Scissors, MapPin, Bell } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import colors from "../../constants/colors";

const iconSize = {
  sm: 14,
  md: 16,
  lg: 18,
};

const navLinks = [
  { path: "/home", label: "Главная" },
  { path: "/search", label: "Поиск" },
  { path: "/appointments", label: "Записи" },
  { path: "/profile", label: "Профиль" },
];

function Header() {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "АН";

  return (
    <header
      className="sticky top-0 z-20 px-6 h-14 flex items-center justify-between"
      style={{
        backgroundColor: colors.dark,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* лого */}
      <Link to="/home" className="flex items-center gap-2 shrink-0">
        <Scissors size={iconSize.lg} style={{ color: colors.accent }} />
        <span className="font-bold text-white text-base">
          Barber<span style={{ color: colors.accent }}>Hub</span>
        </span>
      </Link>

      {/* навигация по центру — скрыта на мобиле */}
      <nav className="hidden md:flex items-center gap-7">
        {navLinks.map((link) => {
          const isActive =
            pathname === link.path ||
            (link.path !== "/home" && pathname.startsWith(link.path));
          return (
            <Link
              key={link.path}
              to={link.path}
              className="text-sm font-medium transition-colors hover:text-white"
              style={{ color: isActive ? colors.accent : colors.gray }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* правая часть */}
      <div className="flex items-center gap-3">
        <span className="text-sm hidden md:block" style={{ color: colors.gray }}>
          <span className="inline-flex items-center gap-1">
            <MapPin size={iconSize.sm} />
            Алматы
          </span>
        </span>

        <button className="relative leading-none" style={{ color: colors.gray }}>
          <Bell size={iconSize.lg} />
          <span
            className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2"
            style={{
              backgroundColor: colors.accent,
              borderColor: colors.dark,
            }}
          />
        </button>

        <Link
          to="/profile"
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ backgroundColor: colors.accent }}
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}

export default Header;
