import { useState } from "react";

const periods = [
  { id: "week", label: "Неделя" },
  { id: "month", label: "Месяц" },
  { id: "year", label: "Год" },
];

const stats = [
  {
    icon: "💰",
    label: "ВЫРУЧКА",
    value: "48 500₸",
    delta: "▲ +12% vs прошлая неделя",
    up: true,
  },
  {
    icon: "📅",
    label: "ЗАПИСИ",
    value: "34",
    delta: "▲ +5 vs прошлая неделя",
    up: true,
  },
  {
    icon: "👥",
    label: "НОВЫЕ КЛИЕНТЫ",
    value: "12",
    delta: "▲ +3 vs прошлая неделя",
    up: true,
  },
  {
    icon: "⭐",
    label: "СРЕДНИЙ ЧЕК",
    value: "1 426₸",
    delta: "▼ -2% vs прошлая неделя",
    up: false,
  },
];

const revenueData = [
  { day: "Пн", value: 5200 },
  { day: "Вт", value: 7800 },
  { day: "Ср", value: 6100 },
  { day: "Чт", value: 8400 },
  { day: "Пт", value: 9200 },
  { day: "Сб", value: 11800, isActive: true },
  { day: "Вс", value: 4500 },
];

const popularServices = [
  {
    name: "Классич. стрижка",
    revenue: 18000,
    count: 12,
    color: "#E94560",
    percent: 90,
  },
  {
    name: "Фейд + укладка",
    revenue: 14000,
    count: 8,
    color: "#48BB78",
    percent: 65,
  },
  {
    name: "Комплекс",
    revenue: 9000,
    count: 6,
    color: "#F6AD55",
    percent: 45,
  },
  {
    name: "Стрижка бороды",
    revenue: 7500,
    count: 5,
    color: "#A8B2C1",
    percent: 25,
  },
];

const formatPrice = (value) => `${value.toLocaleString("ru-RU")}₸`;

function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("week");

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100vh",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1
          className="text-white"
          style={{ fontSize: "22px", fontWeight: 700 }}
        >
          Аналитика
        </h1>
        <p
          style={{
            color: "#A8B2C1",
            fontSize: "13px",
            marginTop: "3px",
          }}
        >
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
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.08)",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {stats.map((stat) => (
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
        <RevenueChart data={revenueData} total="48 500₸" />
        <PopularServices items={popularServices} />
      </div>
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
      <div
        className="flex items-center"
        style={{ gap: "8px", marginBottom: "10px" }}
      >
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
        style={{
          fontSize: "24px",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "8px",
        }}
      >
        {stat.value}
      </div>

      <div
        style={{
          color: deltaColor,
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {stat.delta}
      </div>
    </div>
  );
}

function RevenueChart({ data, total }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "20px 22px",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          Выручка по дням
        </h3>
        <span
          style={{
            color: "#E94560",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
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
        {data.map((d) => {
          const height = (d.value / maxValue) * 120;
          return (
            <div
              key={d.day}
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

      <div>
        {items.map((item, i) => (
          <ServiceRow
            key={item.name}
            item={item}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
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
            <span
              className="text-white truncate"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
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
          <div
            className="text-white"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            {formatPrice(item.revenue)}
          </div>
          <div
            style={{
              color: "#A8B2C1",
              fontSize: "12px",
              marginTop: "2px",
            }}
          >
            {item.count} раз
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
