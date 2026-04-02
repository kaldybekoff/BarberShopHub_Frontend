import { adminStatsCards, userList, barbershopList, pendingReviews } from "../../data/mockAdminStats";
import StatsCard from "../../components/barbershop/StatsCard";
import UsersTable from "../../components/admin/UsersTable";
import BarbershopsTable from "../../components/admin/BarbershopsTable";
import ReviewModerationTable from "../../components/admin/ReviewModerationTable";
import colors from "../../styles/colors";

function AdminDashboardPage() {
  return (
    <div
      className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Панель администратора</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Общая статистика и управление
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {adminStatsCards.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Tables */}
      <div className="flex flex-col gap-6">
        <UsersTable userList={userList} />
        <BarbershopsTable barbershopList={barbershopList} />
        <ReviewModerationTable pendingReviews={pendingReviews} />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
