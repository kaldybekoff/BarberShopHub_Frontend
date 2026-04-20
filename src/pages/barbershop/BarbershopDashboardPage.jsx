import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import DashboardAppointments from "../../components/barbershop/DashboardAppointments";
import { getDashboardStats, getAnalytics } from "../../api/dashboardApi";

const DAY_LABELS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function formatPrice(value) {
  return `${Number(value).toLocaleString("ru-RU")}₸`;
}

function mapStats(stats) {
  return [
    { icon: "📅", label: "ЗАПИСИ СЕГОДНЯ", value: String(stats.bookings_today ?? 0), delta: "" },
    { icon: "💰", label: "ВЫРУЧКА НЕДЕЛЯ", value: formatPrice(stats.weekly_revenue ?? 0), delta: "" },
    { icon: "⭐", label: "РЕЙТИНГ", value: String(stats.rating ?? "—"), delta: "" },
    { icon: "👥", label: "НОВЫЕ КЛИЕНТЫ", value: String(stats.new_clients ?? 0), delta: "" },
  ];
}

function mapUpcomingBookings(bookings) {
  return (bookings ?? []).map((b) => {
    const dt = new Date(b.scheduled_at);
    const time = dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    return {
      time,
      clientName: b.client_name,
      service: b.service,
      master: b.barber_name,
      status: b.status,
    };
  });
}

function mapRevenueData(revenueByDay) {
  if (!revenueByDay?.length) return [];
  const maxIdx = revenueByDay.reduce((m, d, i) => (d.amount > revenueByDay[m].amount ? i : m), 0);
  return revenueByDay.map((d, i) => ({
    day: DAY_LABELS[new Date(d.date).getDay()],
    value: d.amount,
    isActive: i === maxIdx,
  }));
}

function BarbershopDashboardPage() {
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dash, analytics] = await Promise.all([
          getDashboardStats(),
          getAnalytics("week"),
        ]);
        setDashData(dash);
        setRevenueData(mapRevenueData(analytics.revenue_by_day));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = dashData ? mapStats(dashData.stats) : [];
  const appointments = dashData ? mapUpcomingBookings(dashData.upcoming_bookings) : [];
  const shopName = dashData?.barbershop?.name ?? "";
  const weeklyRevenue = dashData ? formatPrice(dashData.stats?.weekly_revenue ?? 0) : "—";

  if (loading) {
    return (
      <div
        style={{ backgroundColor: "#1A1A2E", padding: "32px", minHeight: "100%" }}
        className="flex items-center justify-center"
      >
        <p style={{ color: "#A8B2C1" }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "32px",
        minHeight: "100%",
        overflowY: "auto",
      }}
    >
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: "24px" }}
      >
        <div>
          <h1
            className="text-white"
            style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1.2 }}
          >
            Добрый день 👋
          </h1>
          <p style={{ color: "#A8B2C1", fontSize: "14px", marginTop: "4px" }}>
            {shopName}
          </p>
        </div>

        <button
          type="button"
          aria-label="Уведомления"
          style={{
            position: "relative",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
            }}
          />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            delta={stat.delta}
          />
        ))}
      </div>

      {revenueData.length > 0 && (
        <div style={{ marginTop: "24px" }}>
          <RevenueChart data={revenueData} total={weeklyRevenue} />
        </div>
      )}

      <div style={{ marginTop: "24px" }}>
        <DashboardAppointments
          appointments={appointments}
          onShowAll={() => navigate("/barbershop/bookings")}
        />
      </div>
    </div>
  );
}

export default BarbershopDashboardPage;
