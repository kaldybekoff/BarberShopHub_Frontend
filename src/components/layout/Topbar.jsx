import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import colors from "../../constants/colors";

const pageTitles = {
  "/barbershop/dashboard": "Дашборд",
  "/barbershop/schedule": "Расписание",
  "/barbershop/bookings": "Записи",
  "/barbershop/services": "Услуги",
  "/barbershop/analytics": "Аналитика",
  "/admin/dashboard": "Дашборд",
  "/admin/users": "Пользователи",
  "/admin/barbershops": "Барбершопы",
  "/admin/reviews": "Модерация отзывов",
};

function Topbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const currentTitle = pageTitles[pathname] || "BarberHUB";

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header
      className="h-14 flex items-center justify-between px-6 sticky top-0 z-10"
      style={{ backgroundColor: "#000000", borderBottom: `1px solid ${colors.light}` }}
    >
      <span className="text-white font-bold text-base">{currentTitle}</span>

      <div className="flex items-center gap-2">
        <span className="text-sm hidden sm:block" style={{ color: colors.gray }}>
          {user?.name || "Пользователь"}
        </span>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
          style={{ backgroundColor: colors.accent }}
        >
          {user?.name ? user.name[0].toUpperCase() : "B"}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-red-400 md:hidden"
          style={{ color: colors.gray }}
        >
          <LogOut size={14} />
          Выйти
        </button>
      </div>
    </header>
  );
}

export default Topbar;
