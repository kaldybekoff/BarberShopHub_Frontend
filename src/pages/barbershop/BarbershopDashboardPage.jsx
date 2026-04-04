import { useState, useEffect } from "react";
import { getDashboardStats, getBookings } from "../../api/dashboardApi";
import { revenueData } from "../../data/mockDashboardStats";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import DashboardAppointments from "../../components/barbershop/DashboardAppointments";
import colors from "../../styles/colors";

function BarbershopDashboardPage() {
  const [stats, setStats] = useState([]);
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [statsResult, bookingsResult] = await Promise.all([
          getDashboardStats(),
          getBookings(),
        ]);
        setStats(statsResult);
        setAppointmentList(bookingsResult);
      } catch (error) {
        setErrorMessage("Не удалось загрузить данные");
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.gray }}>Загрузка...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.accent }}>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-8 py-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Дашборд</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Обзор вашей барбершопа
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mb-6">
        <RevenueChart revenueData={revenueData} />
      </div>

      <DashboardAppointments appointmentList={appointmentList} />
    </div>
  );
}

export default BarbershopDashboardPage;
