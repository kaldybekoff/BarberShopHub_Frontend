import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import mockAppointments from "../../data/mockAppointments";
import colors from "../../styles/colors";

const settingsItems = [
  { icon: "✏️", label: "Редактировать профиль", action: "edit" },
  { icon: "📅", label: "Мои записи", action: "appointments" },
  { icon: "🔔", label: "Уведомления", action: "notifications" },
  { icon: "🌐", label: "Язык", action: "language" },
];

const supportItems = [
  { icon: "ℹ️", label: "О приложении", action: "about" },
  { icon: "💬", label: "Написать в поддержку", action: "support" },
];

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
    navigate("/login");
  }

  function handleSettingsAction(action) {
    if (action === "appointments") {
      navigate("/appointments");
      return;
    }
    console.log("settings action:", action);
  }

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-lg mx-auto px-4 pt-8">

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

        {/* настройки */}
        <div className="rounded-2xl overflow-hidden mb-4" style={{ backgroundColor: colors.dark }}>
          {settingsItems.map((item, index) => (
            <div key={item.action}>
              <button
                onClick={() => handleSettingsAction(item.action)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <span style={{ color: colors.gray }}>→</span>
              </button>
              {index < settingsItems.length - 1 && (
                <div className="mx-4 h-px" style={{ backgroundColor: colors.light }} />
              )}
            </div>
          ))}
        </div>

        {/* поддержка */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: colors.dark }}>
          {supportItems.map((item, index) => (
            <div key={item.action}>
              <button
                onClick={() => console.log(item.action)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:opacity-80 transition-opacity">
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm text-white">{item.label}</span>
                </div>
                <span style={{ color: colors.gray }}>→</span>
              </button>
              {index < supportItems.length - 1 && (
                <div className="mx-4 h-px" style={{ backgroundColor: colors.light }} />
              )}
            </div>
          ))}
        </div>

        {/* выход */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-xl text-sm font-semibold border transition-opacity hover:opacity-80"
          style={{ borderColor: colors.accent, color: colors.accent }}>
          Выйти
        </button>

      </div>
    </div>
  );
}

export default ProfilePage;
