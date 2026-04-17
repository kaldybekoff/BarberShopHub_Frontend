import { useState } from "react";

const mockBookings = [
  {
    id: 1,
    clientName: "Алибек Джаксыбеков",
    service: "Стрижка + борода",
    master: "Марат",
    date: "02.04.2026",
    time: "10:00",
    price: 4500,
    status: "confirmed",
  },
  {
    id: 2,
    clientName: "Нурлан Сейткали",
    service: "Классическая стрижка",
    master: "Дамир",
    date: "02.04.2026",
    time: "11:30",
    price: 2500,
    status: "pending",
  },
  {
    id: 3,
    clientName: "Темирлан Ахметов",
    service: "Fade",
    master: "Марат",
    date: "03.04.2026",
    time: "13:00",
    price: 3000,
    status: "confirmed",
  },
  {
    id: 4,
    clientName: "Айдос Кенжебеков",
    service: "Стрижка + укладка",
    master: "Руслан",
    date: "03.04.2026",
    time: "14:30",
    price: 3500,
    status: "pending",
  },
  {
    id: 5,
    clientName: "Жандос Мухамедов",
    service: "Борода",
    master: "Дамир",
    date: "04.04.2026",
    time: "15:00",
    price: 1500,
    status: "cancelled",
  },
  {
    id: 6,
    clientName: "Серик Омаров",
    service: "Fade + борода",
    master: "Марат",
    date: "04.04.2026",
    time: "09:00",
    price: 5000,
    status: "confirmed",
  },
  {
    id: 7,
    clientName: "Даниар Касымов",
    service: "Классическая стрижка",
    master: "Руслан",
    date: "05.04.2026",
    time: "10:00",
    price: 2500,
    status: "cancelled",
  },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "pending", label: "Ожидает" },
  { id: "confirmed", label: "Подтверждено" },
  { id: "cancelled", label: "Отменено" },
];

const statusBadges = {
  confirmed: {
    label: "✓ Подтверждено",
    color: "#48BB78",
    background: "rgba(72, 187, 120, 0.15)",
  },
  pending: {
    label: "⏳ Ожидает",
    color: "#F6AD55",
    background: "rgba(246, 173, 85, 0.15)",
  },
  cancelled: {
    label: "Отменено",
    color: "#A8B2C1",
    background: "rgba(168, 178, 193, 0.1)",
  },
};

const formatPrice = (price) => `${price.toLocaleString("ru-RU")}₸`;

function BookingsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? mockBookings
      : mockBookings.filter((b) => b.status === activeFilter);

  function handleConfirm(id) {
    console.log("confirm booking", id);
  }

  function handleCancel(id) {
    console.log("cancel booking", id);
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100vh",
      }}
    >
      <div>
        <h1
          className="text-white"
          style={{ fontSize: "22px", fontWeight: 700 }}
        >
          Записи
        </h1>
        <p
          style={{
            color: "#A8B2C1",
            fontSize: "13px",
            marginTop: "3px",
          }}
        >
          Управляйте бронированиями клиентов
        </p>
      </div>

      <div
        style={{
          display: "flex",
          gap: "8px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        {filters.map((f) => {
          const isActive = f.id === activeFilter;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id)}
              style={{
                backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                color: isActive ? "#ffffff" : "#A8B2C1",
                border: isActive
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px",
                padding: "7px 18px",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center"
          style={{
            backgroundColor: "#1E2A3A",
            borderRadius: "12px",
            padding: "40px 20px",
            color: "#A8B2C1",
            fontSize: "14px",
          }}
        >
          В этой категории пока нет записей
        </div>
      ) : (
        <div>
          {filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function BookingCard({ booking, onConfirm, onCancel }) {
  const badge = statusBadges[booking.status] || statusBadges.confirmed;
  const isCancelled = booking.status === "cancelled";
  const isPending = booking.status === "pending";

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "18px 20px",
        border: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "10px",
        opacity: isCancelled ? 0.6 : 1,
      }}
    >
      <div
        className="flex items-start justify-between"
        style={{ gap: "12px" }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            className="text-white"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            {booking.clientName}
          </div>
          <div
            className="flex flex-wrap"
            style={{
              marginTop: "4px",
              gap: "20px",
              fontSize: "13px",
              color: "#A8B2C1",
            }}
          >
            <span>
              Услуга:{" "}
              <span style={{ color: "#C8D0DC" }}>{booking.service}</span>
            </span>
            <span>
              Мастер:{" "}
              <span style={{ color: "#C8D0DC" }}>{booking.master}</span>
            </span>
          </div>
        </div>

        <span
          style={{
            backgroundColor: badge.background,
            color: badge.color,
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {badge.label}
        </span>
      </div>

      <div
        className="flex items-center justify-between"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
          marginTop: "14px",
        }}
      >
        <span style={{ color: "#A8B2C1", fontSize: "13px" }}>
          {booking.date} · {booking.time}
        </span>
        <span
          style={{
            color: isCancelled ? "#A8B2C1" : "#ffffff",
            fontSize: "15px",
            fontWeight: 700,
          }}
        >
          {formatPrice(booking.price)}
        </span>
      </div>

      {isPending && (
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          <button
            type="button"
            onClick={() => onConfirm(booking.id)}
            style={{
              flex: 1,
              background: "rgba(72, 187, 120, 0.15)",
              color: "#48BB78",
              border: "1px solid rgba(72, 187, 120, 0.3)",
              borderRadius: "8px",
              padding: "9px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ✓ Подтвердить
          </button>
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            style={{
              flex: 1,
              background: "rgba(233, 69, 96, 0.1)",
              color: "#E94560",
              border: "1px solid rgba(233, 69, 96, 0.25)",
              borderRadius: "8px",
              padding: "9px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            ✕ Отменить
          </button>
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
