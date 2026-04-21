import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import DashboardAppointments from "../../components/barbershop/DashboardAppointments";
import { getDashboardStats } from "../../api/dashboardApi";

const DAY_LABELS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function formatPrice(value) {
  return `${Number(value ?? 0).toLocaleString("ru-RU")}₸`;
}

function formatDeltaAbs(delta) {
  if (delta == null) return "";
  const sign = delta > 0 ? "+" : delta < 0 ? "−" : "";
  return `${sign}${Math.abs(delta)} за сутки`;
}

function formatDeltaPct(pct) {
  if (pct == null) return "";
  const sign = pct > 0 ? "▲ +" : pct < 0 ? "▼ −" : "";
  return `${sign}${Math.abs(pct)}% к пред. неделе`;
}

function mapStats(dash) {
  const today = dash.today_bookings ?? {};
  const week = dash.week_revenue ?? {};
  return [
    {
      icon: "📅",
      label: "ЗАПИСИ СЕГОДНЯ",
      value: String(today.count ?? 0),
      delta: formatDeltaAbs(today.delta_vs_yesterday),
    },
    {
      icon: "💰",
      label: "ВЫРУЧКА ЗА НЕДЕЛЮ",
      value: formatPrice(week.amount),
      delta: formatDeltaPct(week.delta_pct_vs_prev),
    },
    {
      icon: "⭐",
      label: "РЕЙТИНГ",
      value: dash.barbershop?.rating != null ? String(dash.barbershop.rating) : "—",
      delta: "",
    },
    {
      icon: "👥",
      label: "НОВЫЕ КЛИЕНТЫ",
      value: String(dash.new_clients_this_week ?? 0),
      delta: "за неделю",
    },
  ];
}

function mapNearestBookings(bookings) {
  return (bookings ?? []).map((b) => {
    const dt = new Date(b.scheduled_at);
    const time = dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    const count = b.services_count ?? 0;
    return {
      time,
      clientName: b.client_name,
      service: count > 0 ? `${count} ${pluralServices(count)}` : formatPrice(b.total_price),
      master: b.barber_name,
      status: b.status,
    };
  });
}

function pluralServices(count) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "услуга";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "услуги";
  return "услуг";
}

function mapRevenueData(revenueByDay) {
  if (!revenueByDay?.length) return [];
  const maxIdx = revenueByDay.reduce(
    (m, d, i) => (d.revenue > revenueByDay[m].revenue ? i : m),
    0
  );
  return revenueByDay.map((d, i) => ({
    day: DAY_LABELS[new Date(d.date).getDay()],
    value: d.revenue,
    isActive: i === maxIdx,
  }));
}

function BarbershopDashboardPage() {
  const navigate = useNavigate();
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((dash) => setDashData(dash))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const stats = dashData ? mapStats(dashData) : [];
  const appointments = dashData ? mapNearestBookings(dashData.nearest_bookings) : [];
  const revenueData = dashData ? mapRevenueData(dashData.revenue_last_7_days) : [];
  const shopName = dashData?.barbershop?.name ?? "";
  const weeklyRevenue = formatPrice(dashData?.week_revenue?.amount);

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
