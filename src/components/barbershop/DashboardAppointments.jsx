const STATUS_BADGES = {
  confirmed: {
    label: "✓ Подтв.",
    color: "#48BB78",
    background: "rgba(72, 187, 120, 0.15)",
  },
  pending: {
    label: "⏳ Ожидает",
    color: "#F6AD55",
    background: "rgba(246, 173, 85, 0.15)",
  },
};

function DashboardAppointments({ appointments, onShowAll }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3
          className="text-white"
          style={{ fontSize: "18px", fontWeight: 700 }}
        >
          Ближайшие записи
        </h3>
        <button
          type="button"
          onClick={onShowAll}
          style={{
            color: "#E94560",
            fontSize: "14px",
            fontWeight: 500,
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Все →
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "12px",
        }}
      >
        {appointments.map((item, i) => (
          <AppointmentRow key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function AppointmentRow({ item }) {
  const badge = STATUS_BADGES[item.status] || STATUS_BADGES.confirmed;

  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "10px",
        padding: "16px 20px",
        gap: "20px",
      }}
    >
      <div
        className="text-white"
        style={{
          minWidth: "56px",
          fontSize: "15px",
          fontWeight: 700,
        }}
      >
        {item.time}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="text-white"
          style={{ fontSize: "14px", fontWeight: 500 }}
        >
          сегодня&nbsp;&nbsp;{item.clientName}
        </div>
        <div
          style={{
            color: "#A8B2C1",
            fontSize: "13px",
            marginTop: "2px",
          }}
        >
          {item.service} · {item.master}
        </div>
      </div>

      <span
        style={{
          backgroundColor: badge.background,
          color: badge.color,
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        {badge.label}
      </span>
    </div>
  );
}

export default DashboardAppointments;
