function AppointmentCard({ appointment }) {
  const isConfirmed = appointment.status === "confirmed";

  const statusLabel = isConfirmed ? "Подтверждено" : "Ожидает";
  const statusColor = isConfirmed ? "#48BB78" : "#F6AD55";
  const statusBg = isConfirmed
    ? "rgba(72, 187, 120, 0.15)"
    : "rgba(246, 173, 85, 0.15)";

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#1E2A3A", borderRadius: "16px" }}
    >
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid #2a3a4a",
        }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-white" style={{ fontWeight: 700, fontSize: "15px" }}>
            {appointment.shop}
          </h3>
          <span
            style={{
              backgroundColor: statusBg,
              color: statusColor,
              borderRadius: "20px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center" style={{ gap: "12px", marginTop: "14px" }}>
          <div
            className="flex items-center justify-center shrink-0 text-white"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {appointment.masterInitials}
          </div>
          <div>
            <p className="text-white" style={{ fontWeight: 600, fontSize: "14px" }}>
              {appointment.master}
            </p>
            <p style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
              {appointment.service}
            </p>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between"
        style={{ padding: "12px 16px" }}
      >
        <div className="flex items-center" style={{ gap: "14px" }}>
          <span
            className="inline-flex items-center"
            style={{ color: "#A8B2C1", fontSize: "13px", gap: "6px" }}
          >
            <span>📅</span>
            {appointment.date}
          </span>
          <span
            className="inline-flex items-center"
            style={{ color: "#A8B2C1", fontSize: "13px", gap: "6px" }}
          >
            <span>⏰</span>
            {appointment.time}
          </span>
        </div>
        <span
          style={{ color: "#E94560", fontWeight: 700, fontSize: "16px" }}
        >
          {Number(appointment.price).toLocaleString("ru-RU")}₸
        </span>
      </div>

      <div
        className="flex"
        style={{ borderTop: "1px solid #2a3a4a" }}
      >
        <button
          type="button"
          style={{
            flex: 1,
            color: "#A8B2C1",
            borderRight: "1px solid #2a3a4a",
            padding: "12px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
            borderRightWidth: "1px",
            borderRightStyle: "solid",
            borderRightColor: "#2a3a4a",
          }}
        >
          Перенести
        </button>
        <button
          type="button"
          style={{
            flex: 1,
            color: "#E94560",
            padding: "12px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;
