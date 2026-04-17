function DateSelector({ days, selectedKey, onSelect }) {
  return (
    <div
      className="flex"
      style={{ gap: "10px", overflowX: "auto" }}
    >
      {days.map((day) => {
        const isSelected = day.key === selectedKey;

        return (
          <button
            key={day.key}
            type="button"
            onClick={() => onSelect(day)}
            style={{
              width: "72px",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: isSelected ? "#E94560" : "#1E2A3A",
              borderRadius: "12px",
              padding: "10px 8px",
              border: "none",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: isSelected ? "#ffffff" : "#A8B2C1",
              }}
            >
              {day.label}
            </div>
            <div
              className="text-white"
              style={{ fontSize: "22px", fontWeight: 700 }}
            >
              {day.number}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default DateSelector;
