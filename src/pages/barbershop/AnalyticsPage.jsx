import { useState, useEffect } from "react";
import { analyticsStats, topServices, revenueData } from "../../data/mockDashboardStats";
import { getDashboardStats } from "../../api/dashboardApi";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import colors from "../../styles/colors";

const tabs = ["Неделя", "Месяц"];

function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("Неделя");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // analytics использует данные из mock напрямую,
    // getDashboardStats даёт задержку как при реальном API
    getDashboardStats().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.gray }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Аналитика</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Статистика вашего барбершопа
        </p>
      </div>

      {/* Табы периода */}
      <div
        className="flex gap-1 rounded-xl p-1 mb-6 w-fit"
        style={{ backgroundColor: colors.light }}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? colors.accent : "transparent",
                color: isActive ? "#ffffff" : colors.gray,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {analyticsStats.map((stat) => (
          <StatsCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Revenue chart */}
      <div className="mb-6">
        <RevenueChart revenueData={revenueData} />
      </div>

      {/* Популярные услуги */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: colors.light }}
      >
        <h2 className="text-white font-semibold text-base mb-4">
          Популярные услуги
        </h2>
        <div className="flex flex-col gap-3">
          {topServices.map((service, index) => (
            <div key={service.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: index === 0 ? colors.accent : colors.dark,
                    color: index === 0 ? "#ffffff" : colors.gray,
                  }}
                >
                  {index + 1}
                </span>
                <span className="text-white text-sm">{service.name}</span>
              </div>
              <span className="text-sm" style={{ color: colors.gray }}>
                {service.count} записей
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
