import { useNavigate } from "react-router-dom";

function ShopCard({ shop }) {
  const navigate = useNavigate();

  const price = shop.price ?? shop.priceFrom;
  const reviewsCount = shop.reviews ?? shop.reviewCount;
  const status = shop.status ?? (shop.isOpen ? "open" : "soon");
  const isOpen = status === "open";

  const handleClick = () => navigate(`/shops/${shop.id}`);

  return (
    <div
      className="min-w-[280px] overflow-hidden rounded-2xl"
      style={{ backgroundColor: "#1E2A3A" }}
    >
      <div
        className="relative flex h-40 items-center justify-center"
        style={{ backgroundColor: "#16213E" }}
      >
        <span style={{ fontSize: "48px" }}>💈</span>
        <span
          className="absolute right-3 top-3 rounded-full text-xs font-semibold text-white"
          style={{
            backgroundColor: isOpen ? "#48BB78" : "#F6AD55",
            padding: "3px 10px",
          }}
        >
          {isOpen ? "● Открыто" : "● Скоро"}
        </span>
      </div>

      <div style={{ padding: "14px 16px" }}>
        <h3 className="text-base font-bold text-white" style={{ marginBottom: "6px" }}>
          {shop.name}
        </h3>

        <p className="text-sm text-white">
          <span style={{ color: "#F5A623" }}>★</span> {shop.rating}{" "}
          <span style={{ color: "#A8B2C1" }}>({reviewsCount})</span>
        </p>

        <p
          className="text-[13px]"
          style={{ color: "#A8B2C1", marginTop: "2px", marginBottom: "12px" }}
        >
          📍 {shop.distance}
          {shop.address ? ` · ${shop.address}` : ""}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="font-bold"
            style={{ color: "#E94560", fontSize: "15px" }}
          >
            от {price}₸
          </span>

          <button
            onClick={handleClick}
            className="rounded-[10px] text-sm font-semibold transition-opacity hover:opacity-90"
            style={{
              padding: "8px 18px",
              backgroundColor: isOpen ? "#E94560" : "#1E2A3A",
              color: isOpen ? "#ffffff" : "#E94560",
              border: isOpen ? "1px solid #E94560" : "1px solid #E94560",
              cursor: "pointer",
            }}
          >
            {isOpen ? "Записаться" : "Посмотреть"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopCard;
