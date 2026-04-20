import { useState, useEffect } from "react";
import { getAnalytics } from "../../api/dashboardApi";

const periods = [
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "year", label: "Год" },
];

const SERVICE_COLORS = ["#E94560", "#48BB78", "#F6AD55", "#A8B2C1", "#9F7AEA"];
const DAY_LABELS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function formatPrice(value) {
  return `${Number(value).toLocaleString("ru-RU")}₸`;
}

function formatDelta(pct, label) {
  if (pct == null) return "";
  const sign = pct >= 0 ? "▲ +" : "▼ ";
  return `${sign}${Math.abs(pct)}% vs ${label}`;
}

function mapAnalytics(data, period) {
  const periodLabel =
    period === "week" ? "прошлая неделя" : period === "month" ? "прошлый месяц" : "прошлый год";

  const stats = [
    {
      icon: "💰",
      label: "ВЫРУЧКА",
      value: formatPrice(data.stats.revenue_total),
      delta: formatDelta(data.stats.revenue_change_percent, periodLabel),
      up: (data.stats.revenue_change_percent ?? 0) >= 0,
    },
    {
      icon: "📅",
      label: "ЗАПИСИ",
      value: String(data.stats.bookings_count),
      delta: formatDelta(data.stats.bookings_change_percent, periodLabel),
      up: (data.stats.bookings_change_percent ?? 0) >= 0,
    },
    {
      icon: "👥",
      label: "НОВЫЕ КЛИЕНТЫ",
      value: String(data.stats.new_clients),
      delta: formatDelta(data.stats.new_clients_change_percent, periodLabel),
      up: (data.stats.new_clients_change_percent ?? 0) >= 0,
    },
    {
      icon: "⭐",
      label: "СРЕДНИЙ ЧЕК",
      value: formatPrice(data.stats.average_check),
      delta: formatDelta(data.stats.average_check_change_percent, periodLabel),
      up: (data.stats.average_check_change_percent ?? 0) >= 0,
    },
  ];

  const maxIdx = (data.revenue_by_day ?? []).reduce(
    (m, d, i, arr) => (d.amount > arr[m].amount ? i : m),
    0
  );
  const revenueData = (data.revenue_by_day ?? []).map((d, i) => ({
    day: DAY_LABELS[new Date(d.date).getDay()],
    value: d.amount,
    isActive: i === maxIdx,
  }));

  const maxRevenue = Math.max(...(data.popular_services ?? []).map((s) => s.revenue), 1);
  const popularServices = (data.popular_services ?? []).map((s, i) => ({
    name: s.name,
    revenue: s.revenue,
    count: s.count,
    color: SERVICE_COLORS[i % SERVICE_COLORS.length],
    percent: Math.round((s.revenue / maxRevenue) * 100),
  }));

  const total = formatPrice(data.stats.revenue_total);

  return { stats, revenueData, popularServices, total };
}

function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("week");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAnalytics(activeTab)
      .then((data) => setAnalytics(mapAnalytics(data, activeTab)))
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1 className="text-white" style={{ fontSize: "22px", fontWeight: 700 }}>
          Аналитика
        </h1>
        <p style={{ color: "#A8B2C1", fontSize: "13px", marginTop: "3px" }}>
          Статистика вашего барбершопа
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        {periods.map((p) => {
          const isActive = p.id === activeTab;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              style={{
                backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                color: isActive ? "#ffffff" : "#A8B2C1",
                border: isActive ? "1px solid transparent" : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "7px 18px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex items-center justify-center" style={{ paddingTop: "60px" }}>
          <p style={{ color: "#A8B2C1" }}>Загрузка...</p>
        </div>
      ) : analytics ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            {analytics.stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr",
              gap: "16px",
            }}
          >
            <RevenueChart data={analytics.revenueData} total={analytics.total} />
            <PopularServices items={analytics.popularServices} />
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ stat }) {
  const deltaColor = stat.up ? "#48BB78" : "#E94560";

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "18px 20px",
      }}
    >
      <div className="flex items-center" style={{ gap: "8px", marginBottom: "10px" }}>
        <span style={{ fontSize: "14px" }}>{stat.icon}</span>
        <span
          style={{
            color: "#A8B2C1",
            fontSize: "11px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {stat.label}
        </span>
      </div>

      <div
        className="text-white"
        style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.1, marginBottom: "8px" }}
      >
        {stat.value}
      </div>

      <div style={{ color: deltaColor, fontSize: "12px", fontWeight: 500 }}>
        {stat.delta}
      </div>
    </div>
  );
}

function RevenueChart({ data, total }) {
  const maxValue = Math.max(...(data ?? []).map((d) => d.value), 1);

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "20px 22px",
      }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-white" style={{ fontSize: "15px", fontWeight: 700 }}>
          Выручка по дням
        </h3>
        <span style={{ color: "#E94560", fontSize: "15px", fontWeight: 700 }}>
          {total}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          height: "140px",
          marginTop: "20px",
        }}
      >
        {(data ?? []).map((d, i) => {
          const height = (d.value / maxValue) * 120;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                height: "100%",
              }}
            >
              <div
                style={{
                  height: `${height}px`,
                  backgroundColor: d.isActive ? "#E94560" : "#2A3A4A",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                }}
              />
              <div
                style={{
                  color: d.isActive ? "#E94560" : "#A8B2C1",
                  fontSize: "12px",
                  fontWeight: d.isActive ? 600 : 500,
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                {d.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function PopularServices({ items }) {
  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "20px 22px",
      }}
    >
      <h3
        className="text-white"
        style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}
      >
        Популярные услуги
      </h3>

      {(!items || items.length === 0) ? (
        <p style={{ color: "#A8B2C1", fontSize: "13px" }}>Нет данных</p>
      ) : (
        <div>
          {items.map((item, i) => (
            <ServiceRow key={item.name} item={item} isLast={i === items.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceRow({ item, isLast }) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="flex items-start justify-between" style={{ gap: "12px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: item.color,
                flexShrink: 0,
              }}
            />
            <span className="text-white truncate" style={{ fontSize: "13px", fontWeight: 500 }}>
              {item.name}
            </span>
          </div>

          <div
            style={{
              height: "4px",
              backgroundColor: "rgba(255,255,255,0.08)",
              borderRadius: "2px",
              marginTop: "8px",
              marginLeft: "16px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${item.percent}%`,
                height: "100%",
                backgroundColor: item.color,
                borderRadius: "2px",
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div className="text-white" style={{ fontSize: "13px", fontWeight: 600 }}>
            {Number(item.revenue).toLocaleString("ru-RU")}₸
          </div>
          <div style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
            {item.count} раз
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
