function ReminderToggle({ enabled, onChange }) {
  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <div
        className="flex items-center"
        style={{ flex: 1, gap: "10px" }}
      >
        <span style={{ fontSize: "16px" }}>🔔</span>
        <span
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          Напоминание
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "#A8B2C1",
            marginLeft: "12px",
          }}
        >
          За 2 часа до записи
        </span>
      </div>

      <label
        style={{
          position: "relative",
          width: "48px",
          height: "26px",
          borderRadius: "13px",
          backgroundColor: enabled ? "#E94560" : "#2a3a4a",
          cursor: "pointer",
          transition: "background-color 0.2s",
          flexShrink: 0,
        }}
      >
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
          style={{ display: "none" }}
        />
        <span
          style={{
            position: "absolute",
            top: "3px",
            left: 0,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            transform: enabled ? "translateX(25px)" : "translateX(3px)",
            transition: "transform 0.2s",
          }}
        />
      </label>
    </div>
  );
}

export default ReminderToggle;
