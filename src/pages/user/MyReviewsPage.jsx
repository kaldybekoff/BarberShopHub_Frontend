import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyReviews } from "../../api/reviewApi";

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= rating ? "#F5A623" : "#2a3a4a", fontSize: "14px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  const navigate = useNavigate();
  const date = review.created_at
    ? new Date(review.created_at).toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "12px",
      }}
    >
      <div className="flex items-start justify-between" style={{ gap: "12px", marginBottom: "12px" }}>
        <button
          type="button"
          onClick={() => review.barbershop_slug && navigate(`/shops/${review.barbershop_slug}`)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: review.barbershop_slug ? "pointer" : "default",
            textAlign: "left",
          }}
        >
          <p
            className="text-white"
            style={{
              fontSize: "16px",
              fontWeight: 700,
              textDecoration: review.barbershop_slug ? "underline" : "none",
              textDecorationColor: "rgba(255,255,255,0.2)",
            }}
          >
            {review.barbershop_name ?? "—"}
          </p>
        </button>
        <span style={{ color: "#A8B2C1", fontSize: "12px", whiteSpace: "nowrap" }}>{date}</span>
      </div>

      <StarRating rating={review.rating} />

      {review.comment && (
        <p style={{ color: "#C8D0DC", fontSize: "14px", marginTop: "10px", lineHeight: 1.5 }}>
          {review.comment}
        </p>
      )}
    </div>
  );
}

function MyReviewsPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    getMyReviews()
      .then(setReviews)
      .catch(() => setUnavailable(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div className="mx-auto" style={{ maxWidth: "680px", padding: "28px 24px 48px" }}>
        {/* Header */}
        <div className="flex items-center" style={{ gap: "14px", marginBottom: "28px" }}>
          <button
            type="button"
            onClick={() => navigate("/profile")}
            style={{
              background: "none",
              border: "none",
              color: "#A8B2C1",
              fontSize: "22px",
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ←
          </button>
          <div>
            <h1 className="text-white" style={{ fontSize: "22px", fontWeight: 700 }}>
              Мои отзывы
            </h1>
            {!loading && !unavailable && (
              <p style={{ color: "#A8B2C1", fontSize: "13px", marginTop: "2px" }}>
                {reviews.length} {plural(reviews.length, "отзыв", "отзыва", "отзывов")}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "48px 20px",
              textAlign: "center",
              color: "#A8B2C1",
              fontSize: "14px",
            }}
          >
            Загрузка...
          </div>
        ) : unavailable ? (
          <div
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "48px 20px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>🔧</p>
            <p className="text-white" style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>
              Раздел в разработке
            </p>
            <p style={{ color: "#A8B2C1", fontSize: "13px" }}>
              История отзывов появится в ближайшем обновлении
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "48px 20px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "32px", marginBottom: "12px" }}>⭐</p>
            <p className="text-white" style={{ fontSize: "16px", fontWeight: 600, marginBottom: "6px" }}>
              Отзывов пока нет
            </p>
            <p style={{ color: "#A8B2C1", fontSize: "13px", marginBottom: "20px" }}>
              После посещения барбершопа вы сможете оставить отзыв
            </p>
            <button
              type="button"
              onClick={() => navigate("/search")}
              style={{
                backgroundColor: "#E94560",
                color: "#fff",
                border: "none",
                borderRadius: "10px",
                padding: "11px 24px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Найти барбершоп
            </button>
          </div>
        ) : (
          <div>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

export default MyReviewsPage;
