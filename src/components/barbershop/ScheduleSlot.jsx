const STATUS_META = {
  confirmed: {
    background: "rgba(72, 187, 120, 0.15)",
    border: "#48BB78",
    icon: "✓",
    iconColor: "#48BB78",
  },
  pending: {
    background: "rgba(233, 69, 96, 0.15)",
    border: "#E94560",
    icon: "⏳",
    iconColor: "#F6AD55",
  },
};

function ScheduleSlot({ slot }) {
  return (
    <div className="flex items-start" style={{ gap: "16px" }}>
      <span
        style={{
          color: "#A8B2C1",
          fontSize: "13px",
          minWidth: "56px",
          paddingTop: slot.type === "free" ? "0" : "16px",
        }}
      >
        {slot.time}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {slot.type === "free" ? <FreeSlot /> : <BookedSlot slot={slot} />}
      </div>
    </div>
  );
}

function FreeSlot() {
  return (
    <div
      className="flex items-center"
      style={{
        height: "60px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        color: "#A8B2C1",
        fontSize: "13px",
      }}
    >
      Свободно
    </div>
  );
}

function BookedSlot({ slot }) {
  const meta = STATUS_META[slot.status] || STATUS_META.confirmed;

  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: meta.background,
        borderLeft: `3px solid ${meta.border}`,
        borderRadius: "8px",
        padding: "14px 16px",
        gap: "12px",
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          {slot.clientName}
        </div>
        <div
          style={{
            color: "#A8B2C1",
            fontSize: "13px",
            marginTop: "2px",
          }}
        >
          {slot.service} · {slot.master} · {slot.duration}
        </div>
      </div>
      <span
        style={{
          color: meta.iconColor,
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        {meta.icon}
      </span>
    </div>
  );
}

export default ScheduleSlot;
