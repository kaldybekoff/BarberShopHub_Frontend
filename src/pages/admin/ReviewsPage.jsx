import { useMemo, useState } from "react";

const mockReviews = [
  { id: 1, author: "Алибек Джаксыбеков", shop: "BarberKing", text: "Отличное место, мастер очень профессиональный!", rating: 5, status: "pending", date: "01.04.2026" },
  { id: 2, author: "Серик Омаров", shop: "Chop Chop", text: "Нормально, но пришлось долго ждать.", rating: 4, status: "approved", date: "28.03.2026" },
  { id: 3, author: "Тимур Нурланов", shop: "Fade Masters", text: "Лучшие фейды в городе, однозначно рекомендую!", rating: 5, status: "pending", date: "02.04.2026" },
  { id: 4, author: "Максим Берг", shop: "OldSchool Barbershop", text: "Не понравилось обслуживание, грубый мастер.", rating: 2, status: "rejected", date: "25.03.2026" },
  { id: 5, author: "Даурен Касымов", shop: "CutZone", text: "Хорошее соотношение цены и качества.", rating: 4, status: "pending", date: "03.04.2026" },
  { id: 6, author: "Олжас Махмутов", shop: "Royal Cuts", text: "Быстро и качественно, рекомендую всем!", rating: 5, status: "approved", date: "27.03.2026" },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "pending", label: "Ожидает" },
  { id: "approved", label: "Одобрено" },
  { id: "rejected", label: "Отклонено" },
];

const statusMeta = {
  pending: {
    badgeBg: "rgba(246,173,85,0.15)",
    color: "#F6AD55",
    label: "⏳ Ожидает",
    borderColor: "#F6AD55",
    opacity: 1,
  },
  approved: {
    badgeBg: "rgba(72,187,120,0.15)",
    color: "#48BB78",
    label: "✓ Одобрено",
    borderColor: "#48BB78",
    opacity: 0.75,
  },
  rejected: {
    badgeBg: "rgba(233,69,96,0.12)",
    color: "#E94560",
    label: "✕ Отклонено",
    borderColor: "#E94560",
    opacity: 0.6,
  },
};

const avatarPalette = [
  { bg: "rgba(233,69,96,0.2)", color: "#E94560" },
  { bg: "rgba(72,187,120,0.2)", color: "#48BB78" },
  { bg: "rgba(245,166,35,0.2)", color: "#F5A623" },
  { bg: "rgba(168,178,193,0.15)", color: "#A8B2C1" },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const pendingCount = useMemo(
    () => mockReviews.filter((r) => r.status === "pending").length,
    []
  );

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? mockReviews
        : mockReviews.filter((r) => r.status === activeFilter),
    [activeFilter]
  );

  function handleApprove(review) {
    console.log("approve review", review.id);
  }

  function handleReject(review) {
    console.log("reject review", review.id);
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100%",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h1
          className="text-white"
          style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.2 }}
        >
          Модерация отзывов
        </h1>
        <p style={{ fontSize: "13px", color: "#A8B2C1", marginTop: "4px" }}>
          Проверка и управление отзывами платформы
        </p>
      </div>

      <div
        className="flex flex-wrap items-center justify-between"
        style={{ gap: "12px", marginBottom: "20px" }}
      >
        <div className="flex flex-wrap" style={{ gap: "8px" }}>
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                style={{
                  backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                  color: isActive ? "#ffffff" : "#C8D0DC",
                  border: "1px solid",
                  borderColor: isActive
                    ? "#E94560"
                    : "rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: "13px", color: "#A8B2C1" }}>
          На модерации:{" "}
          <span style={{ color: "#F6AD55", fontWeight: 600 }}>
            {pendingCount}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          style={{
            backgroundColor: "#1E2A3A",
            borderRadius: "12px",
            padding: "40px 20px",
            textAlign: "center",
            color: "#A8B2C1",
            fontSize: "14px",
          }}
        >
          В этой категории пока нет отзывов
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((review, idx) => (
            <ReviewCard
              key={review.id}
              review={review}
              index={idx}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ReviewCard({ review, index, onApprove, onReject }) {
  const meta = statusMeta[review.status] || statusMeta.pending;
  const avatar = avatarPalette[index % 4];
  const isPending = review.status === "pending";
  const isApproved = review.status === "approved";
  const isRejected = review.status === "rejected";

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "18px 20px",
        borderLeft: `3px solid ${meta.borderColor}`,
        opacity: meta.opacity,
      }}
    >
      <div
        className="flex items-start justify-between"
        style={{ gap: "12px" }}
      >
        <div className="flex items-center" style={{ gap: "12px", minWidth: 0 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: avatar.bg,
              color: avatar.color,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {getInitials(review.author)}
          </div>
          <div style={{ minWidth: 0 }}>
            <div
              className="text-white"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {review.author}
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#A8B2C1",
                marginTop: "2px",
              }}
            >
              →{" "}
              <span style={{ color: "#E94560", fontWeight: 500 }}>
                {review.shop}
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-end"
          style={{ gap: "6px", flexShrink: 0 }}
        >
          <div style={{ color: "#F5A623", fontSize: "13px", letterSpacing: "1px" }}>
            {"★".repeat(review.rating)}
            <span style={{ color: "#A8B2C1" }}>
              {"☆".repeat(5 - review.rating)}
            </span>
          </div>
          <span
            style={{
              display: "inline-block",
              backgroundColor: meta.badgeBg,
              color: meta.color,
              padding: "3px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {meta.label}
          </span>
        </div>
      </div>

      <p
        style={{
          fontSize: "14px",
          color: "#C8D0DC",
          lineHeight: 1.6,
          margin: "12px 0",
        }}
      >
        {review.text}
      </p>

      <div
        className="flex items-center justify-between flex-wrap"
        style={{
          gap: "10px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: "12px",
        }}
      >
        <span style={{ color: "#A8B2C1", fontSize: "12px" }}>
          {review.date}
        </span>

        <div style={{ display: "flex", gap: "8px" }}>
          {(isPending || isRejected) && (
            <button
              type="button"
              onClick={() => onApprove(review)}
              style={{
                background: "rgba(72,187,120,0.15)",
                color: "#48BB78",
                border: "1px solid rgba(72,187,120,0.3)",
                borderRadius: "7px",
                padding: "7px 16px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✓ Одобрить
            </button>
          )}
          {(isPending || isApproved) && (
            <button
              type="button"
              onClick={() => onReject(review)}
              style={{
                background: "rgba(233,69,96,0.1)",
                color: "#E94560",
                border: "1px solid rgba(233,69,96,0.25)",
                borderRadius: "7px",
                padding: "7px 16px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ✕ Отклонить
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewsPage;
