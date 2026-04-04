import { useState, useEffect } from "react";
import { getUsers, getBarbershops, getReviews } from "../../api/adminApi";
import { adminStatsCards } from "../../data/mockAdminStats";
import StatsCard from "../../components/barbershop/StatsCard";
import UsersTable from "../../components/admin/UsersTable";
import BarbershopsTable from "../../components/admin/BarbershopsTable";
import ReviewModerationTable from "../../components/admin/ReviewModerationTable";
import colors from "../../styles/colors";

function AdminDashboardPage() {
  const [userList, setUserList] = useState([]);
  const [barbershopList, setBarbershopList] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [users, barbershops, reviews] = await Promise.all([
          getUsers(),
          getBarbershops(),
          getReviews(),
        ]);
        setUserList(users);
        setBarbershopList(barbershops);
        setReviewList(reviews);
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
        <h1 className="text-white text-2xl font-bold">Панель администратора</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Общая статистика и управление
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
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
        <ReviewModerationTable reviewList={reviewList} />
      </div>
    </div>
  );
}

export default AdminDashboardPage;
