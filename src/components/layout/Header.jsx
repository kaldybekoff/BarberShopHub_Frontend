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
      className="sticky top-0 z-20 flex items-center border-b"
      style={{
        backgroundColor: "#000000",
        borderColor: "#1E2A3A",
        height: "56px",
        padding: "0 40px",
        position: "sticky",
      }}
    >
      <Link
        to="/home"
        className="flex shrink-0 items-center"
        style={{ gap: "8px", textDecoration: "none" }}
      >
        <span style={{ fontSize: "18px" }}>✂️</span>
        <span
          className="text-white"
          style={{ fontSize: "20px", fontWeight: 700, display: "flex", gap: 0 }}
        >
          Barber<span style={{ color: "#E94560" }}>Hub</span>
        </span>
      </Link>

      <nav
        className="hidden md:flex items-center"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {navLinks.map((link) => {
          const isActive =
            pathname === link.path ||
            (link.path !== "/home" && pathname.startsWith(link.path));

          return (
            <Link
              key={link.path}
              to={link.path}
              className="transition-opacity hover:opacity-85"
              style={{
                fontSize: "15px",
                padding: "0 20px",
                cursor: "pointer",
                color: isActive ? "#E94560" : "#A8B2C1",
                fontWeight: isActive ? 600 : 400,
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div
        className="flex items-center"
        style={{ marginLeft: "auto", gap: "16px" }}
      >
        <div
          className="hidden md:flex items-center"
          style={{ color: "#A8B2C1", fontSize: "13px", gap: "4px" }}
        >
          <span>📍</span>
          Алматы
        </div>

        <button
          type="button"
          className="relative hidden md:inline-flex transition-opacity hover:opacity-85"
          style={{
            color: "#A8B2C1",
            fontSize: "18px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            position: "relative",
          }}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
            }}
          />
        </button>

        <Link
          to="/profile"
          className="flex shrink-0 items-center justify-center text-white"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#E94560",
            fontSize: "13px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {initials}
        </Link>
      </div>
    </header>
  );
}

export default Header;
