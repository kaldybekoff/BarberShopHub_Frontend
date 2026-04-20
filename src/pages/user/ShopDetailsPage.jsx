import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShopTabs from "../../components/shop/ShopTabs";
import ServiceItem from "../../components/shop/ServiceItem";
import { getShopBySlug } from "../../api/shopApi";
import { createReview } from "../../api/reviewApi";


function ShopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShopBySlug(id)
      .then(setShop)
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        className="min-h-full flex items-center justify-center"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        <p style={{ color: "#A8B2C1" }}>Загрузка...</p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div
        className="min-h-full flex items-center justify-center"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        <p className="text-white">Барбершоп не найден</p>
      </div>
    );
  }

  const isOpen = shop.status === "open";
  const closeTime = shop.closes_at ?? "";
  const reviewsCount = shop.reviews_count ?? 0;
  const shopSlug = shop.slug ?? id;

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ height: "200px", backgroundColor: "#16213E" }}
      >
        {shop.logo ? (
          <img
            src={shop.logo}
            alt={shop.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: "72px" }}>💈</span>
        )}
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20" style={{ backgroundColor: "#000000", borderTop: "1px solid #1E2A3A", padding: "12px 16px" }}>
        <button
          type="button"
          onClick={() => navigate(`/booking/${shopSlug}`)}
          className="text-white w-full"
          style={{ backgroundColor: "#E94560", borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer" }}
        >
          Записаться
        </button>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto" }} className="px-4 pb-24 md:px-10 md:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] items-start" style={{ gap: "32px", marginTop: "24px" }}>
          <div>
            <h1
              className="text-white"
              style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
            >
              {shop.name}
            </h1>

            <div className="flex items-center" style={{ gap: "8px", marginBottom: "8px" }}>
              <span style={{ color: "#F5A623" }}>★★★★★</span>
              <span className="text-white" style={{ fontWeight: 700 }}>
                {shop.rating}
              </span>
              <span style={{ color: "#A8B2C1" }}>({reviewsCount} отзывов)</span>
            </div>

            <div
              className="flex items-center"
              style={{ gap: "16px", marginBottom: "20px" }}
            >
              {shop.address && (
                <span style={{ color: "#A8B2C1", fontSize: "14px" }}>
                  📍 {shop.address}
                </span>
              )}
              <span
                className="flex items-center"
                style={{
                  color: isOpen ? "#48BB78" : "#A8B2C1",
                  fontSize: "14px",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isOpen ? "#48BB78" : "#A8B2C1",
                    display: "inline-block",
                  }}
                />
                {isOpen ? `Открыто${closeTime ? ` · до ${closeTime}` : ""}` : "Закрыто"}
              </span>
            </div>

            <div className="flex" style={{ gap: "10px", marginBottom: "24px" }}>
              <PhotoSquare>✂️</PhotoSquare>
              <PhotoSquare>💈</PhotoSquare>
              <PhotoSquare>🪒</PhotoSquare>
              <PhotoSquare>
                <span style={{ color: "#A8B2C1", fontSize: "14px", fontWeight: 600 }}>
                  +12
                </span>
              </PhotoSquare>
            </div>

            <ShopTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "services" && (
              <div>
                {(shop.services ?? []).map((cat) => (
                  <div key={cat.category_id}>
                    <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#A8B2C1", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px", marginTop: "20px" }}>
                      {cat.category_name}
                    </h3>
                    {(cat.items ?? []).map((item) => (
                      <ServiceItem key={item.id} service={{ id: item.id, name: item.name, duration: item.duration_minutes, price: item.price, icon: "✂️" }} />
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "masters" && (
              <div style={{ marginTop: "8px" }}>
                {(shop.barbers ?? []).length === 0 ? (
                  <p style={{ color: "#A8B2C1", textAlign: "center", padding: "40px" }}>Мастера не добавлены</p>
                ) : (shop.barbers ?? []).map((barber) => (
                  <div key={barber.id} className="flex items-center" style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "16px", gap: "14px", marginBottom: "10px" }}>
                    <div className="flex items-center justify-center shrink-0" style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#16213E", fontSize: "20px", overflow: "hidden" }}>
                      {barber.avatar ? <img src={barber.avatar} alt={barber.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : "✂️"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p className="text-white" style={{ fontSize: "15px", fontWeight: 700 }}>{barber.name}</p>
                      {barber.specialization && <p style={{ fontSize: "13px", color: "#A8B2C1", marginTop: "2px" }}>{barber.specialization}</p>}
                      {barber.experience_years != null && <p style={{ fontSize: "12px", color: "#A8B2C1", marginTop: "2px" }}>Опыт: {barber.experience_years} лет</p>}
                    </div>
                    {barber.rating != null && (
                      <div className="flex items-center" style={{ gap: "4px" }}>
                        <span style={{ color: "#F5A623" }}>★</span>
                        <span className="text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{barber.rating}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <ReviewsTab slug={shopSlug} reviews={shop.reviews ?? []} />
            )}

            {activeTab === "photos" && (
              <div style={{ textAlign: "center", padding: "40px", color: "#A8B2C1" }}>Раздел в разработке</div>
            )}
          </div>

          {/* Desktop sticky aside */}
          <aside
            className="hidden md:block"
            style={{ backgroundColor: "#000000", borderRadius: "16px", padding: "24px", position: "sticky", top: "24px" }}
          >
            <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}>
              📅 Записаться
            </h2>
            <button
              type="button"
              onClick={() => navigate(`/booking/${shopSlug}`)}
              className="text-white transition-colors"
              style={{ width: "100%", backgroundColor: "#E94560", borderRadius: "12px", padding: "14px", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#c73652"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E94560"; }}
            >
              Записаться
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
}

function ReviewsTab({ slug, reviews: initialReviews }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!rating) { setError("Выберите оценку"); return; }
    setLoading(true);
    setError("");
    try {
      const newReview = await createReview({ slug, rating, comment });
      setReviews((prev) => [newReview, ...prev]);
      setShowForm(false);
      setRating(0);
      setComment("");
    } catch {
      setError("Не удалось отправить отзыв");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginTop: "8px" }}>
      {!showForm ? (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          style={{ width: "100%", backgroundColor: "#E94560", color: "#fff", border: "none", borderRadius: "12px", padding: "13px", fontSize: "15px", fontWeight: 700, cursor: "pointer", marginBottom: "16px" }}
        >
          + Оставить отзыв
        </button>
      ) : (
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
          <p className="text-white" style={{ fontWeight: 700, marginBottom: "12px" }}>Ваш отзыв</p>

          <div className="flex" style={{ gap: "6px", marginBottom: "12px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setRating(star)}
                style={{ fontSize: "28px", cursor: "pointer", color: star <= (hovered || rating) ? "#F5A623" : "#2a3a4a", transition: "color 0.15s" }}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Расскажите о вашем опыте..."
            style={{ width: "100%", minHeight: "80px", backgroundColor: "#16213E", border: "1px solid #2a3a4a", borderRadius: "10px", padding: "12px", color: "#fff", fontSize: "14px", resize: "vertical", outline: "none", fontFamily: "inherit", marginBottom: "12px" }}
            onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
            onBlur={(e) => { e.target.style.borderColor = "#2a3a4a"; }}
          />

          {error && <p style={{ color: "#E94560", fontSize: "13px", marginBottom: "8px" }}>{error}</p>}

          <div className="flex" style={{ gap: "8px" }}>
            <button type="button" onClick={() => { setShowForm(false); setError(""); }} style={{ flex: 1, backgroundColor: "transparent", border: "1px solid #2a3a4a", color: "#A8B2C1", borderRadius: "10px", padding: "10px", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}>
              Отмена
            </button>
            <button type="submit" disabled={loading} style={{ flex: 2, backgroundColor: "#E94560", border: "none", color: "#fff", borderRadius: "10px", padding: "10px", fontSize: "14px", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}>
              {loading ? "Отправка..." : "Отправить"}
            </button>
          </div>
        </form>
      )}

      {reviews.length === 0 ? (
        <p style={{ color: "#A8B2C1", textAlign: "center", padding: "40px" }}>Отзывов пока нет</p>
      ) : reviews.map((review) => (
        <div key={review.id} style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "16px", marginBottom: "10px" }}>
          <div className="flex items-center justify-between" style={{ marginBottom: "6px" }}>
            <span className="text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{review.user_name}</span>
            <span style={{ fontSize: "12px", color: "#A8B2C1" }}>
              {review.created_at ? new Date(review.created_at).toLocaleDateString("ru-RU") : ""}
            </span>
          </div>
          <div style={{ marginBottom: "6px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} style={{ color: star <= review.rating ? "#F5A623" : "#2a3a4a", fontSize: "14px" }}>★</span>
            ))}
          </div>
          {review.comment && <p style={{ fontSize: "14px", color: "#A8B2C1" }}>{review.comment}</p>}
        </div>
      ))}
    </div>
  );
}

function PhotoSquare({ children }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: "64px",
        height: "64px",
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        fontSize: "22px",
      }}
    >
      {children}
    </div>
  );
}

export default ShopDetailsPage;
