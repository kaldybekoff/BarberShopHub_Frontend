import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

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
  const { user } = useAuth();

  const currentTitle = pageTitles[pathname] || "BarberHUB";

  return (
    <header
      className="flex items-center justify-between px-6 py-3 sticky top-0 z-10"
      style={{ backgroundColor: colors.dark, borderBottom: `1px solid ${colors.light}` }}
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
      </div>
    </header>
  );
}

export default Topbar;
