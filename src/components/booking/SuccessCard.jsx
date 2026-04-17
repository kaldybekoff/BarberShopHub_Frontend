function SuccessCard({ shopName, dateTime, serviceName, price }) {
  const rows = [
    ["Барбершоп", shopName],
    ["Дата и время", dateTime],
    ["Услуга", serviceName],
    ["Стоимость", price],
  ];

  return (
    <div
      style={{
        backgroundColor: "#16213E",
        borderRadius: "12px",
        padding: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        rowGap: "16px",
        columnGap: "16px",
        width: "100%",
      }}
    >
      {rows.map(([label, value]) => (
        <div key={label}>
          <div
            style={{
              fontSize: "12px",
              color: "#A8B2C1",
              marginBottom: "4px",
            }}
          >
            {label}
          </div>
          <div
            className="text-white"
            style={{ fontSize: "15px", fontWeight: 700 }}
          >
            {value || "—"}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SuccessCard;
