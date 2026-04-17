import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

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
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "AN";

  return (
    <header
      className="sticky top-0 z-20 border-b px-4 md:px-6"
      style={{
        backgroundColor: "#000000",
        borderColor: "#1E2A3A",
      }}
    >
      <div className="mx-auto flex h-[54px] max-w-7xl items-center justify-between gap-4">
        <Link to="/home" className="flex shrink-0 items-center gap-2.5">
          <span className="text-base">✂️</span>
          <span className="text-base font-bold text-white">
            Barber<span style={{ color: "#E94560" }}>Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.path ||
              (link.path !== "/home" && pathname.startsWith(link.path));

            return (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium transition-opacity hover:opacity-85"
                style={{ color: isActive ? "#E94560" : "#A8B2C1" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 md:gap-5">
          <div
            className="hidden items-center gap-1 text-sm font-medium md:flex"
            style={{ color: "#A8B2C1" }}
          >
            <span>📍</span>
            Алматы
          </div>

          <button
            type="button"
            className="relative hidden text-base transition-opacity hover:opacity-85 md:inline-flex"
            style={{ color: "#A8B2C1" }}
          >
            🔔
            <span
              className="absolute -right-1 -top-1 h-[7px] w-[7px] rounded-full"
              style={{ backgroundColor: "#E94560" }}
            />
          </button>

          <Link
            to="/profile"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: "#E94560" }}
          >
            {initials}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
