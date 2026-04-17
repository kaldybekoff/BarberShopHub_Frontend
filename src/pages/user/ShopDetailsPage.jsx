import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShopTabs from "../../components/shop/ShopTabs";
import ServiceItem from "../../components/shop/ServiceItem";

const mockShop = {
  id: 1,
  name: "BarbershopKZ",
  rating: 4.9,
  reviews: 312,
  address: "ул. Абая 14",
  status: "open",
  closeTime: "21:00",
  services: [
    {
      id: 1,
      category: "Стрижки",
      name: "Классическая стрижка",
      icon: "✂️",
      duration: 30,
      price: 1500,
    },
    {
      id: 2,
      category: "Стрижки",
      name: "Фейд + укладка",
      icon: "👑",
      duration: 50,
      price: 2500,
    },
    {
      id: 3,
      category: "Борода",
      name: "Стрижка бороды",
      icon: "🪒",
      duration: 25,
      price: 1200,
    },
    {
      id: 4,
      category: "Борода",
      name: "Комплекс: стрижка + борода",
      icon: "💎",
      duration: 60,
      price: 3200,
    },
  ],
};

function groupServicesByCategory(services) {
  const groups = {};
  services.forEach((service) => {
    if (!groups[service.category]) groups[service.category] = [];
    groups[service.category].push(service);
  });
  return groups;
}

function ShopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");

  const shop = mockShop;
  const shopId = id || shop.id;

  const servicesByCategory = groupServicesByCategory(shop.services);
  const isOpen = shop.status === "open";

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="flex items-center justify-center"
        style={{ height: "220px", backgroundColor: "#16213E" }}
      >
        <span style={{ fontSize: "72px" }}>💈</span>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px 40px",
        }}
      >
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: "1fr 320px",
            gap: "32px",
            marginTop: "32px",
          }}
        >
          <div>
            <h1
              className="text-white"
              style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}
            >
              {shop.name}
            </h1>

            <div
              className="flex items-center"
              style={{ gap: "8px", marginBottom: "8px" }}
            >
              <span style={{ color: "#F5A623" }}>★★★★★</span>
              <span
                className="text-white"
                style={{ fontWeight: 700 }}
              >
                {shop.rating}
              </span>
              <span style={{ color: "#A8B2C1" }}>
                ({shop.reviews} отзывов)
              </span>
            </div>

            <div
              className="flex items-center"
              style={{ gap: "16px", marginBottom: "20px" }}
            >
              <span style={{ color: "#A8B2C1", fontSize: "14px" }}>
                📍 {shop.address}
              </span>
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
                {isOpen ? `Открыто · до ${shop.closeTime}` : "Закрыто"}
              </span>
            </div>

            <div
              className="flex"
              style={{ gap: "10px", marginBottom: "24px" }}
            >
              <PhotoSquare>✂️</PhotoSquare>
              <PhotoSquare>💈</PhotoSquare>
              <PhotoSquare>🪒</PhotoSquare>
              <PhotoSquare>
                <span
                  style={{
                    color: "#A8B2C1",
                    fontSize: "14px",
                    fontWeight: 600,
                  }}
                >
                  +12
                </span>
              </PhotoSquare>
            </div>

            <ShopTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "services" ? (
              <div>
                {Object.entries(servicesByCategory).map(
                  ([category, services]) => (
                    <div key={category}>
                      <h3
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#A8B2C1",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: "10px",
                          marginTop: "20px",
                        }}
                      >
                        {category}
                      </h3>
                      {services.map((service) => (
                        <ServiceItem key={service.id} service={service} />
                      ))}
                    </div>
                  )
                )}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#A8B2C1",
                }}
              >
                Раздел в разработке
              </div>
            )}
          </div>

          <aside
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "24px",
              position: "sticky",
              top: "24px",
            }}
          >
            <h2
              className="text-white"
              style={{
                fontSize: "18px",
                fontWeight: 700,
                marginBottom: "20px",
              }}
            >
              📅 Записаться
            </h2>

            <button
              type="button"
              onClick={() => navigate(`/booking/${shopId}`)}
              className="text-white transition-colors"
              style={{
                width: "100%",
                backgroundColor: "#E94560",
                borderRadius: "12px",
                padding: "14px",
                fontSize: "16px",
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
          </aside>
        </div>
      </div>
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
