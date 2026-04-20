function ServiceItem({ service }) {
  return (
    <div
      className="flex items-center"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "14px 16px",
        gap: "12px",
        marginBottom: "8px",
      }}
    >
      <div
        className="flex items-center justify-center shrink-0"
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: "#16213E",
          borderRadius: "8px",
          fontSize: "18px",
        }}
      >
        {service.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 600 }}
        >
          {service.name}
        </p>
        <p
          style={{
            fontSize: "12px",
            color: "#A8B2C1",
            marginTop: "3px",
          }}
        >
          ⏱ {service.duration} мин
        </p>
      </div>

      <span
        className="text-white"
        style={{
          fontSize: "16px",
          fontWeight: 700,
          marginLeft: "auto",
        }}
      >
        {Number(service.price).toLocaleString("ru-RU")}₸
      </span>
    </div>
  );
}

export default ServiceItem;
