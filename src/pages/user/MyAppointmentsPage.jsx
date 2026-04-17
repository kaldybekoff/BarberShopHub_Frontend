import { useState } from "react";
import mockAppointments from "../../data/mockAppointments";
import AppointmentCard from "../../components/appointments/AppointmentCard";

function MyAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const total = mockAppointments.length;
  const confirmedCount = mockAppointments.filter((a) => a.status === "confirmed").length;
  const pendingCount = mockAppointments.filter((a) => a.status === "pending").length;
  const doneCount = mockAppointments.filter((a) => a.status === "done").length;

  const upcoming = mockAppointments.filter((a) => a.type === "upcoming");
  const past = mockAppointments.filter((a) => a.type === "past");

  const stats = [
    { value: total, label: "Всего записей", color: "#ffffff" },
    { value: confirmedCount, label: "Подтверждено", color: "#48BB78" },
    { value: pendingCount, label: "Ожидает", color: "#F6AD55" },
    { value: doneCount, label: "Завершено", color: "#A8B2C1" },
  ];

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "980px", padding: "28px 24px 48px" }}
      >
        <h1
          className="text-white"
          style={{ fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}
        >
          Мои записи
        </h1>

        <div
          className="grid"
          style={{
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center"
              style={{
                backgroundColor: "#16213E",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  color: stat.color,
                  fontSize: "28px",
                  fontWeight: 700,
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  color: "#A8B2C1",
                  fontSize: "13px",
                  marginTop: "6px",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

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

        {activeTab === "upcoming" ? (
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
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "16px",
        }}
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
          <p
            className="text-white"
            style={{ fontWeight: 700, fontSize: "14px" }}
          >
            {appointment.shop}
          </p>
          <p style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
            {appointment.service} · {appointment.master} · {appointment.date},{" "}
            {appointment.time}
          </p>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: "16px" }}>
        <span
          style={{ color: "#A8B2C1", fontWeight: 700, fontSize: "14px" }}
        >
          {appointment.price.toLocaleString("ru-RU")}₸
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
