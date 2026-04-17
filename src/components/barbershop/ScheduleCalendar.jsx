function ScheduleCalendar({ days, selectedKey, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {days.map((day) => {
        const isActive = day.key === selectedKey;
        return (
          <button
            key={day.key}
            type="button"
            onClick={() => onSelect(day)}
            className="flex flex-col items-center justify-center"
            style={{
              width: "80px",
              padding: "12px 16px",
              borderRadius: "10px",
              backgroundColor: isActive ? "#E94560" : "#1E2A3A",
              border: "none",
              cursor: "pointer",
              textAlign: "center",
              transition: "background-color 0.2s",
            }}
          >
            <span
              style={{
                color: isActive ? "#ffffff" : "#A8B2C1",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontWeight: 600,
                marginBottom: "4px",
              }}
            >
              {day.label}
            </span>
            <span
              className="text-white"
              style={{
                fontSize: "22px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {day.number}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default ScheduleCalendar;
