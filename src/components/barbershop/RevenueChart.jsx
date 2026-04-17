function RevenueChart({ data, total }) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "24px",
      }}
    >
      <div className="flex items-center justify-between">
        <h3
          className="text-white"
          style={{ fontSize: "18px", fontWeight: 700 }}
        >
          Выручка за 7 дней
        </h3>
        <span
          style={{
            color: "#E94560",
            fontSize: "18px",
            fontWeight: 700,
          }}
        >
          {total}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "8px",
          height: "180px",
          marginTop: "16px",
        }}
      >
        {data.map((d) => {
          const height = (d.value / maxValue) * 160;
          return (
            <div
              key={d.day}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  height: `${height}px`,
                  backgroundColor: d.isActive ? "#E94560" : "#2A3A4A",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                }}
              />
              <div
                style={{
                  color: "#A8B2C1",
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "8px",
                }}
              >
                {d.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RevenueChart;
