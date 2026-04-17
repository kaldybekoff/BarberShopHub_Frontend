import { useNavigate } from "react-router-dom";
import { CalendarDays, Scissors, ChevronRight } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import mockAppointments from "../../data/mockAppointments";
import colors from "../../constants/colors";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "П";

  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter((a) => a.status === "done").length;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-full pb-10" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">
          <div className="space-y-5">
            <div className="flex flex-col items-center text-center rounded-2xl p-6" style={{ backgroundColor: colors.dark }}>
              <div
                className="w-44 h-44 rounded-full flex items-center justify-center text-5xl font-bold text-white mb-5"
                style={{ backgroundColor: "#C8CED8", color: "#243043" }}
              >
                {initials}
              </div>
              <h1 className="text-5xl font-bold text-white">{user?.name || "Пользователь"}</h1>
              <p className="text-2xl mt-2" style={{ color: colors.gray }}>
                Пользователь
              </p>
            </div>

            <div className="rounded-2xl p-3 flex flex-col gap-2" style={{ backgroundColor: colors.dark }}>
              <button
                onClick={() => navigate("/appointments")}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex items-center gap-3">
                  <CalendarDays size={16} style={{ color: colors.gray }} />
                  <span className="text-2xl font-semibold text-white">Мои записи</span>
                </div>
                <ChevronRight size={16} style={{ color: colors.gray }} />
              </button>
              <button
                onClick={() => navigate("/search")}
                className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left hover:opacity-80 transition-opacity"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex items-center gap-3">
                  <Scissors size={16} style={{ color: colors.gray }} />
                  <span className="text-2xl font-semibold text-white">Найти барбершоп</span>
                </div>
                <ChevronRight size={16} style={{ color: colors.gray }} />
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="rounded-2xl p-5" style={{ backgroundColor: colors.dark }}>
                <div className="text-2xl font-bold text-white">{totalAppointments}</div>
                <div className="text-base mt-1" style={{ color: colors.gray }}>Записей всего</div>
              </div>
              <div className="rounded-2xl p-5" style={{ backgroundColor: colors.dark }}>
                <div className="text-2xl font-bold text-white">{completedAppointments}</div>
                <div className="text-base mt-1" style={{ color: colors.gray }}>Завершено</div>
              </div>
            </div>

            <div className="rounded-2xl p-6" style={{ backgroundColor: colors.dark }}>
              <h2 className="text-3xl font-semibold text-white mb-5">Мои данные</h2>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-2xl" style={{ color: colors.gray }}>Имя</span>
                <span className="text-2xl text-white font-medium">{user?.name || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-2xl" style={{ color: colors.gray }}>Email</span>
                <span className="text-2xl text-white font-medium">{user?.email || "—"}</span>
              </div>
              <div className="flex items-center justify-between py-3">
                <span className="text-2xl" style={{ color: colors.gray }}>Роль</span>
                <span className="text-2xl text-white font-medium">{user?.role || "—"}</span>
              </div>
            </div>

            <div className="flex justify-end mt-3">
              <button
                onClick={handleLogout}
                className="text-2xl font-semibold text-red-400 hover:text-red-300 transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
