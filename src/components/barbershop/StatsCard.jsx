function StatsCard({ icon, label, value, delta }) {
  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <div
        className="flex items-center"
        style={{ gap: "8px", marginBottom: "12px" }}
      >
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span
          style={{
            color: "#A8B2C1",
            fontSize: "11px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      </div>

      <div
        className="text-white"
        style={{
          fontSize: "28px",
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: "8px",
        }}
      >
        {value}
      </div>

      {delta && (
        <div
          style={{
            color: "#48BB78",
            fontSize: "13px",
            fontWeight: 500,
          }}
        >
          {delta}
        </div>
      )}
    </div>
  );
}

export default StatsCard;
