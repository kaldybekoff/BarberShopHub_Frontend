import { statsData, revenueData, appointmentList } from "../../data/mockDashboardStats";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import DashboardAppointments from "../../components/barbershop/DashboardAppointments";
import colors from "../../styles/colors";

function BarbershopDashboardPage() {
  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Дашборд</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Обзор вашей барбершопа
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {statsData.map((stat) => (
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
