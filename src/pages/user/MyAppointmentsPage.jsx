import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockAppointments from "../../data/mockAppointments";
import { cancelAppointment } from "../../api/appointmentApi";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import colors from "../../constants/colors";

function MyAppointmentsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [appointments, setAppointments] = useState(mockAppointments);

  const filteredAppointments = appointments.filter((a) => {
    if (activeTab === "upcoming") return a.status === "confirmed" || a.status === "pending";
    return a.status === "completed" || a.status === "cancelled";
  });

  async function handleCancel(id) {
    await cancelAppointment(id);
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  }

  return (
    <div className="min-h-full" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-10">

        <h1 className="text-2xl font-bold text-white mb-5">Мои записи</h1>

        {/* табы */}
        <div
          className="flex border-b mb-5"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          {[
            { key: "upcoming", label: "Предстоящие" },
            { key: "past", label: "Прошедшие" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="px-1 py-3 mr-6 text-sm font-medium transition-colors"
              style={{
                color: activeTab === tab.key ? "#ffffff" : colors.gray,
                borderBottom:
                  activeTab === tab.key
                    ? `2px solid ${colors.accent}`
                    : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredAppointments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-white font-semibold text-lg">Записей пока нет</p>
            <p className="text-sm" style={{ color: colors.gray }}>
              {activeTab === "upcoming"
                ? "Запишитесь в барбершоп прямо сейчас"
                : "История записей пуста"}
            </p>
            {activeTab === "upcoming" && (
              <button
                onClick={() => navigate("/search")}
                className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
                style={{ backgroundColor: colors.accent }}
              >
                Найти барбершоп
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onCancel={activeTab === "upcoming" ? handleCancel : null}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default MyAppointmentsPage;
