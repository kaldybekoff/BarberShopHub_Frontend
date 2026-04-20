import { Fragment } from "react";

function BookingSummary({
  shopName,
  dateTime,
  masterName,
  serviceShortName,
  duration,
  price,
  isSubmitting,
  error,
  onConfirm,
}) {
  const rows = [
    ["Барбершоп", shopName],
    ["Дата и время", dateTime],
    ["Мастер", masterName],
    ["Услуга", serviceShortName],
    ["Длительность", duration ? `~${duration} минут` : "—"],
  ];

  return (
    <aside
      className="shrink-0"
      style={{
        backgroundColor: "#000000",
        borderRadius: "16px",
        padding: "24px",
        position: "sticky",
        top: "24px",
      }}
    >
      <h2
        className="text-white"
        style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}
      >
        Сводка заказа
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          rowGap: "12px",
          marginBottom: "16px",
        }}
      >
        {rows.map(([label, value]) => (
          <Fragment key={label}>
            <span style={{ fontSize: "14px", color: "#A8B2C1" }}>
              {label}
            </span>
            <span
              className="text-white"
              style={{
                fontSize: "14px",
                fontWeight: 600,
                textAlign: "right",
              }}
            >
              {value || "—"}
            </span>
          </Fragment>
        ))}
      </div>

      <div
        style={{
          height: "1px",
          backgroundColor: "#2a3a4a",
          marginBottom: "16px",
        }}
      />

      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "20px" }}
      >
        <span
          className="text-white"
          style={{ fontSize: "16px", fontWeight: 600 }}
        >
          Итого
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#E94560",
          }}
        >
          {price != null ? `${Number(price).toLocaleString("ru-RU")}₸` : "—"}
        </span>
      </div>

      {error && (
        <p style={{ color: "#E94560", fontSize: "13px", marginBottom: "12px", lineHeight: 1.4 }}>
          {error}
        </p>
      )}

      <button
        onClick={onConfirm}
        disabled={isSubmitting}
        style={{
          width: "100%",
          backgroundColor: "#E94560",
          color: "#ffffff",
          borderRadius: "12px",
          padding: "14px",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!isSubmitting) e.currentTarget.style.backgroundColor = "#c73652";
        }}
        onMouseLeave={(e) => {
          if (!isSubmitting) e.currentTarget.style.backgroundColor = "#E94560";
        }}
      >
        {isSubmitting ? "Оформляем..." : "Подтвердить запись ✓"}
      </button>
    </aside>
  );
}

export default BookingSummary;
