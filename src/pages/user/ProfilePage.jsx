import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import mockAppointments from "../../data/mockAppointments";
import colors from "../../styles/colors";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "П";

  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter((a) => a.status === "completed").length;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-lg mx-auto px-6 pt-8">

        {/* аватар и имя */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-3"
            style={{ backgroundColor: colors.accent }}>
            {initials}
          </div>
          <h1 className="text-xl font-bold text-white">{user?.name || "Пользователь"}</h1>
          {user?.email && (
            <p className="text-sm mt-1" style={{ color: colors.gray }}>{user.email}</p>
          )}
        </div>

        {/* статистика */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="rounded-2xl p-4 flex flex-col items-center gap-1"
            style={{ backgroundColor: colors.dark }}>
            <span className="text-2xl font-bold text-white">{totalAppointments}</span>
            <span className="text-xs" style={{ color: colors.gray }}>Записей всего</span>
          </div>
          <div className="rounded-2xl p-4 flex flex-col items-center gap-1"
            style={{ backgroundColor: colors.dark }}>
            <span className="text-2xl font-bold text-white">{completedAppointments}</span>
            <span className="text-xs" style={{ color: colors.gray }}>Завершено</span>
          </div>
        </div>

        {/* мои данные */}
        <div className="rounded-2xl p-6 mt-6 mb-4"
          style={{ backgroundColor: colors.dark }}>
          <h2 className="text-sm font-semibold text-white mb-4">Мои данные</h2>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm" style={{ color: colors.gray }}>Имя</span>
            <span className="text-sm text-white font-medium">{user?.name || "—"}</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <span className="text-sm" style={{ color: colors.gray }}>Email</span>
            <span className="text-sm text-white font-medium">{user?.email || "—"}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm" style={{ color: colors.gray }}>Роль</span>
            <span className="text-sm text-white font-medium">{user?.role || "—"}</span>
          </div>
        </div>

        {/* действия */}
        <div className="flex flex-col gap-2 mb-6">
          <button
            onClick={() => navigate("/appointments")}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left border hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.light, borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3">
              <span className="text-base">📅</span>
              <span className="text-sm text-white">Мои записи</span>
            </div>
            <span style={{ color: colors.gray }}>→</span>
          </button>
          <button
            onClick={() => navigate("/search")}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left border hover:opacity-80 transition-opacity"
            style={{ backgroundColor: colors.light, borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex items-center gap-3">
              <span className="text-base">✂️</span>
              <span className="text-sm text-white">Найти барбершоп</span>
            </div>
            <span style={{ color: colors.gray }}>→</span>
          </button>
        </div>

        {/* выход */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl text-sm font-semibold text-red-400 hover:text-red-300 transition-colors mt-4">
          Выйти
        </button>

      </div>
    </div>
  );
}

export default ProfilePage;
