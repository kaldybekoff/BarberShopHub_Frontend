import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header
      className="flex items-center justify-between px-4 py-3 sticky top-0 z-10"
      style={{ backgroundColor: colors.dark }}
    >
      <span className="text-white font-bold text-lg">
        Barber<span style={{ color: colors.accent }}>HUB</span>
      </span>

      <div className="flex items-center gap-3">
        <button className="text-xl">🔔</button>
        <Link to="/profile">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
            style={{ backgroundColor: colors.accent }}
          >
            {user?.name ? user.name[0].toUpperCase() : "U"}
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm font-medium transition-colors hover:text-red-400"
          style={{ color: colors.gray }}
        >
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Header;
