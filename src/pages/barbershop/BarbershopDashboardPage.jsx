import { useNavigate } from "react-router-dom";
import StatsCard from "../../components/barbershop/StatsCard";
import RevenueChart from "../../components/barbershop/RevenueChart";
import DashboardAppointments from "../../components/barbershop/DashboardAppointments";

const stats = [
  { icon: "📅", label: "ЗАПИСИ СЕГОДНЯ", value: "12", delta: "▲ +3 vs вчера" },
  { icon: "💰", label: "ВЫРУЧКА НЕДЕЛЯ", value: "48 500₸", delta: "▲ +12%" },
  { icon: "⭐", label: "РЕЙТИНГ", value: "4.9", delta: "▲ +0.1" },
  { icon: "👥", label: "НОВЫЕ КЛИЕНТЫ", value: "7", delta: "▲ +2" },
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

const upcomingAppointments = [
  {
    time: "11:00",
    clientName: "Artyom N.",
    service: "Стрижка",
    master: "Amir",
    status: "confirmed",
  },
  {
    time: "12:00",
    clientName: "Miras S.",
    service: "Комплекс",
    master: "Baur",
    status: "pending",
  },
  {
    time: "13:30",
    clientName: "Yeskendir K.",
    service: "Борода",
    master: "Amir",
    status: "confirmed",
  },
];

function BarbershopDashboardPage() {
  const navigate = useNavigate();

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
            style={{
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Добрый день 👋
          </h1>
          <p
            style={{
              color: "#A8B2C1",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            BarbershopKZ
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

      <div style={{ marginTop: "24px" }}>
        <RevenueChart data={revenueData} total="48 500₸" />
      </div>

      <div style={{ marginTop: "24px" }}>
        <DashboardAppointments
          appointments={upcomingAppointments}
          onShowAll={() => navigate("/barbershop/bookings")}
        />
      </div>
    </div>
  );
}

export default BarbershopDashboardPage;
