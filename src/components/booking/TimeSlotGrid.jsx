function TimeSlotGrid({ slots, selectedSlot, onSelect }) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
        gap: "10px",
      }}
    >
      {slots.map((slot) => {
        const isSelected = slot === selectedSlot;

        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            className="text-white"
            style={{
              padding: "12px",
              textAlign: "center",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
              backgroundColor: isSelected ? "#E94560" : "#1E2A3A",
              border: "none",
            }}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlotGrid;
