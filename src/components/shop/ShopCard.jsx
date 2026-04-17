import { useNavigate } from "react-router-dom";

function ShopCard({ shop, variant = "search" }) {
  const navigate = useNavigate();

  const price = shop.price ?? shop.priceFrom;
  const reviewsCount = shop.reviews ?? shop.reviewCount;
  const status = shop.status ?? (shop.isOpen ? "open" : "soon");
  const isOpen = status === "open";

  const isHome = variant === "home";

  const handleClick = () => navigate(`/shops/${shop.id}`);

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#1E2A3A", borderRadius: "16px" }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          backgroundColor: "#16213E",
          height: isHome ? "180px" : "160px",
        }}
      >
        <span style={{ fontSize: "48px" }}>💈</span>

        {!isHome && (
          <span
            className="absolute text-white"
            style={{
              top: "12px",
              right: "12px",
              backgroundColor: isOpen ? "#48BB78" : "#F6AD55",
              borderRadius: "20px",
              padding: "3px 10px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            ● {isOpen ? "Открыто" : "Скоро"}
          </span>
        )}
      </div>

      {isHome ? (
        <div style={{ padding: "16px" }}>
          <h3
            className="text-white"
            style={{ fontSize: "17px", fontWeight: 700, marginBottom: "8px" }}
          >
            {shop.name}
          </h3>

          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "6px" }}
          >
            <span>
              <span style={{ color: "#F5A623", fontSize: "14px" }}>★</span>{" "}
              <span className="text-white">{shop.rating}</span>{" "}
              <span style={{ color: "#A8B2C1", fontSize: "13px" }}>
                ({reviewsCount})
              </span>
            </span>
            <span style={{ color: "#A8B2C1", fontSize: "13px" }}>
              <span style={{ fontSize: "12px" }}>📍</span> {shop.distance}
            </span>
          </div>

          <p
            style={{
              color: "#E94560",
              fontSize: "14px",
              fontWeight: 600,
              marginBottom: "14px",
            }}
          >
            от {price}₸
          </p>

          <button
            type="button"
            onClick={handleClick}
            className="text-white transition-colors"
            style={{
              width: "100%",
              backgroundColor: "#E94560",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "15px",
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#c73652";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#E94560";
            }}
          >
            Записаться
          </button>
        </div>
      ) : (
        <div style={{ padding: "14px 16px" }}>
          <h3
            className="text-white"
            style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}
          >
            {shop.name}
          </h3>

          <p className="text-sm text-white">
            <span style={{ color: "#F5A623" }}>★</span> {shop.rating}{" "}
            <span style={{ color: "#A8B2C1" }}>({reviewsCount})</span>
          </p>

          <p
            style={{
              color: "#A8B2C1",
              fontSize: "13px",
              marginTop: "2px",
              marginBottom: "12px",
            }}
          >
            📍 {shop.distance}
            {shop.address ? ` · ${shop.address}` : ""}
          </p>

          <div className="flex items-center justify-between">
            <span
              style={{
                color: "#E94560",
                fontSize: "15px",
                fontWeight: 700,
              }}
            >
              от {price}₸
            </span>

            <button
              type="button"
              onClick={handleClick}
              className="transition-opacity hover:opacity-90"
              style={{
                padding: "8px 18px",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "10px",
                backgroundColor: isOpen ? "#E94560" : "#1E2A3A",
                color: isOpen ? "#ffffff" : "#E94560",
                border: "1px solid #E94560",
                cursor: "pointer",
              }}
            >
              {isOpen ? "Записаться" : "Посмотреть"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopCard;
