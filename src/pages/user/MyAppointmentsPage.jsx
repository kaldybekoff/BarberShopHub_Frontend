import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockAppointments from "../../data/mockAppointments";
import { cancelAppointment } from "../../api/appointmentApi";
import AppointmentTabs from "../../components/appointments/AppointmentTabs";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import colors from "../../styles/colors";

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
    <div className="min-h-screen" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-2xl mx-auto px-4 pt-6">

        <h1 className="text-2xl font-bold text-white mb-5">Мои записи</h1>

        <AppointmentTabs activeTab={activeTab} onTabChange={setActiveTab} />

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
