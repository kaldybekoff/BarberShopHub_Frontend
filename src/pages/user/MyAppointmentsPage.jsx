import { useState, useEffect } from "react";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import { getMyAppointments } from "../../api/appointmentApi";

function mapBooking(b) {
  const dt = new Date(b.scheduled_at);
  const barberName = b.barber_name ?? "—";
  const initials = barberName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return {
    id: b.id,
    shop: b.barbershop_name ?? "—",
    master: barberName,
    masterInitials: initials,
    service: b.service_name ?? b.services?.[0]?.name ?? "—",
    date: dt.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
    time: dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    price: b.total_price ?? 0,
    status: b.status,
    reviewed: b.can_review === false,
  };
}

function MyAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyAppointments("upcoming"), getMyAppointments("past")])
      .then(([upData, pastData]) => {
        setUpcoming((upData ?? []).map(mapBooking));
        setPast((pastData ?? []).map(mapBooking));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="mx-auto" style={{ maxWidth: "980px", padding: "28px 24px 48px" }}>
        <h1
          className="text-white"
          style={{ fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}
        >
          Мои записи
        </h1>

        <div
          className="flex"
          style={{
            backgroundColor: "#16213E",
            borderRadius: "12px",
            padding: "4px",
            width: "fit-content",
            marginBottom: "20px",
          }}
        >
          <TabButton
            label="Предстоящие"
            active={activeTab === "upcoming"}
            onClick={() => setActiveTab("upcoming")}
          />
          <TabButton
            label="Прошедшие"
            active={activeTab === "past"}
            onClick={() => setActiveTab("past")}
          />
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "40px 20px",
              color: "#A8B2C1",
              fontSize: "14px",
            }}
          >
            Загрузка...
          </div>
        ) : activeTab === "upcoming" ? (
          <UpcomingSection items={upcoming} />
        ) : (
          <PastSection items={past} />
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: active ? "#E94560" : "transparent",
        color: active ? "#ffffff" : "#A8B2C1",
        borderRadius: "9px",
        padding: "9px 28px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
      }}
    >
      {label}
    </button>
  );
}

function SectionLabel({ title, count }) {
  return (
    <p
      style={{
        color: "#A8B2C1",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        marginBottom: "12px",
      }}
    >
      {title} · {count}
    </p>
  );
}

function UpcomingSection({ items }) {
  if (items.length === 0) {
    return (
      <>
        <SectionLabel title="Предстоящие" count={0} />
        <EmptyState text="Предстоящих записей нет" />
      </>
    );
  }

  return (
    <>
      <SectionLabel title="Предстоящие" count={items.length} />
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px" }}
      >
        {items.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </>
  );
}

function PastSection({ items }) {
  if (items.length === 0) {
    return (
      <>
        <SectionLabel title="Прошедшие" count={0} />
        <EmptyState text="История записей пуста" />
      </>
    );
  }

  return (
    <>
      <SectionLabel title="Прошедшие" count={items.length} />
      <div>
        {items.map((appointment) => (
          <PastAppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </>
  );
}

function PastAppointmentRow({ appointment }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "10px",
        opacity: 0.75,
      }}
    >
      <div className="flex items-center" style={{ gap: "14px" }}>
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#2a3a4a",
            color: "#A8B2C1",
            fontSize: "13px",
            fontWeight: 700,
          }}
        >
          {appointment.masterInitials}
        </div>
        <div>
          <p className="text-white" style={{ fontWeight: 700, fontSize: "14px" }}>
            {appointment.shop}
          </p>
          <p style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
            {appointment.service} · {appointment.master} · {appointment.date},{" "}
            {appointment.time}
          </p>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: "16px" }}>
        <span style={{ color: "#A8B2C1", fontWeight: 700, fontSize: "14px" }}>
          {Number(appointment.price).toLocaleString("ru-RU")}₸
        </span>

        {appointment.reviewed ? (
          <button
            type="button"
            style={{
              border: "1px solid #2a3a4a",
              color: "#A8B2C1",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "transparent",
              cursor: "default",
            }}
          >
            Отзыв оставлен
          </button>
        ) : (
          <button
            type="button"
            style={{
              border: "1px solid #E94560",
              color: "#E94560",
              borderRadius: "8px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            Оставить отзыв
          </button>
        )}
      </div>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div
      className="flex items-center justify-center text-white"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "16px",
        padding: "40px 20px",
        fontSize: "14px",
        color: "#A8B2C1",
      }}
    >
      {text}
    </div>
  );
}

export default MyAppointmentsPage;
