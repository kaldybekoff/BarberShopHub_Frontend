import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockAppointments from "../../data/mockAppointments";
import colors from "../../styles/colors";

const statusConfig = {
  confirmed: { label: "Подтверждено", color: colors.success },
  pending:   { label: "Ожидает",      color: "#F6AD55" },
  cancelled: { label: "Отменено",     color: colors.accent },
  completed: { label: "Завершено",    color: colors.gray },
};

function MyAppointmentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const appointments = mockAppointments;

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === "upcoming") return a.status === "confirmed" || a.status === "pending";
    return a.status === "completed" || a.status === "cancelled";
  });

  function handleCancel(id) {
    console.log("cancel appointment:", id);
  }

  function handleReschedule(id) {
    console.log("reschedule appointment:", id);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-2xl mx-auto px-4 pt-6">

        <h1 className="text-2xl font-bold text-white mb-5">Мои записи</h1>

        {/* табы */}
        <div className="flex mb-5 rounded-xl overflow-hidden" style={{ backgroundColor: colors.dark }}>
          {[
            { key: "upcoming", label: "Предстоящие" },
            { key: "past",     label: "Прошедшие" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 text-sm font-medium transition-colors rounded-xl"
              style={{
                backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
                color: activeTab === tab.key ? "#fff" : colors.gray,
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* список */}
        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-white font-semibold text-lg">Записей пока нет</p>
            <p className="text-sm" style={{ color: colors.gray }}>
              {activeTab === "upcoming" ? "Запишитесь в барбершоп прямо сейчас" : "История записей пуста"}
            </p>
            {activeTab === "upcoming" && (
              <button
                onClick={() => navigate("/search")}
                className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: colors.accent }}>
                Найти барбершоп
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 pb-8">
            {filteredAppointments.map((appointment) => {
              const status = statusConfig[appointment.status];
              return (
                <div key={appointment.id}
                  className="rounded-2xl p-4 flex flex-col gap-3"
                  style={{ backgroundColor: colors.dark }}>

                  {/* шапка карточки */}
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-white text-base">{appointment.shopName}</h3>
                    <span
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{ backgroundColor: `${status.color}20`, color: status.color }}>
                      {status.label}
                    </span>
                  </div>

                  {/* детали */}
                  <div className="flex flex-col gap-1">
                    <p className="text-sm" style={{ color: colors.gray }}>
                      {appointment.serviceName} · {appointment.masterName}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white">
                        {appointment.date} в {appointment.time}
                      </p>
                      <span className="text-sm font-semibold text-white">
                        {appointment.price} ₸
                      </span>
                    </div>
                  </div>

                  {/* кнопки для предстоящих */}
                  {activeTab === "upcoming" && (
                    <div className="flex gap-2 mt-1">
                      <button
                        onClick={() => handleReschedule(appointment.id)}
                        className="flex-1 py-2 rounded-xl text-sm font-medium border"
                        style={{ borderColor: colors.gray, color: colors.gray }}>
                        Перенести
                      </button>
                      <button
                        onClick={() => handleCancel(appointment.id)}
                        className="flex-1 py-2 rounded-xl text-sm font-medium border"
                        style={{ borderColor: colors.accent, color: colors.accent }}>
                        Отменить
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyAppointmentsPage;
