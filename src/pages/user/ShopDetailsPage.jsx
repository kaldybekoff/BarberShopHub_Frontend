import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockShops from "../../data/mockShops";
import colors from "../../styles/colors";

function ShopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");

  const shop = mockShops.find((s) => s.id === Number(id));

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-white text-lg font-semibold">Барбершоп не найден</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm underline"
          style={{ color: colors.gray }}>
          ← Назад
        </button>
      </div>
    );
  }

  const tabs = [
    { key: "services", label: "Услуги" },
    { key: "masters", label: "Мастера" },
    { key: "reviews", label: "Отзывы" },
  ];

  function handleTabClick(key) {
    setActiveTab(key);
  }

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: colors.primary }}>

      {/* шапка */}
      <div className="px-4 pt-6 pb-4" style={{ backgroundColor: colors.dark }}>
        <button
          onClick={() => navigate(-1)}
          className="text-sm mb-4 flex items-center gap-1"
          style={{ color: colors.gray }}>
          ← Назад
        </button>

        {/* фото / плейсхолдер */}
        {shop.image ? (
          <img src={shop.image} alt={shop.name}
            className="w-full h-44 object-cover rounded-2xl mb-4" />
        ) : (
          <div className="w-full h-44 rounded-2xl flex items-center justify-center mb-4 text-4xl"
            style={{ backgroundColor: colors.light }}>
            ✂
          </div>
        )}

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{shop.name}</h1>
            <p className="text-sm mt-1" style={{ color: colors.gray }}>{shop.address}</p>
          </div>
          <span
            className="text-xs px-2 py-1 rounded-full font-medium mt-1"
            style={{
              backgroundColor: shop.isOpen ? "#1a3a2a" : "#2a1a1a",
              color: shop.isOpen ? colors.success : colors.accent,
            }}>
            {shop.isOpen ? "Открыто" : "Закрыто"}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-2">
          <span style={{ color: colors.gold }}>★</span>
          <span className="text-sm font-medium text-white">{shop.rating}</span>
          <span className="text-xs" style={{ color: colors.gray }}>
            ({shop.reviewCount} отзывов)
          </span>
        </div>
      </div>

      {/* табы */}
      <div className="flex border-b px-4" style={{ borderColor: colors.light }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className="flex-1 py-3 text-sm font-medium transition-colors"
            style={{
              color: activeTab === tab.key ? colors.accent : colors.gray,
              borderBottom: activeTab === tab.key ? `2px solid ${colors.accent}` : "2px solid transparent",
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* контент табов */}
      <div className="px-4 py-4 max-w-2xl mx-auto">

        {activeTab === "services" && (
          <div className="flex flex-col gap-3">
            {shop.services.map((service) => (
              <div key={service.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ backgroundColor: colors.dark }}>
                <div>
                  <p className="text-white text-sm font-medium">{service.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: colors.gray }}>{service.duration}</p>
                </div>
                <span className="text-sm font-semibold text-white">{service.price} ₸</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "masters" && (
          <div className="flex flex-col gap-3">
            {shop.masters.map((master) => {
              const initials = master.name.split(" ").map((w) => w[0]).join("");
              return (
                <div key={master.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: colors.dark }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ backgroundColor: colors.accent }}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{master.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-xs" style={{ color: colors.gold }}>★</span>
                      <span className="text-xs" style={{ color: colors.gray }}>{master.rating}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-3">
            {shop.reviews.map((review) => (
              <div key={review.id}
                className="px-4 py-3 rounded-xl flex flex-col gap-1"
                style={{ backgroundColor: colors.dark }}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{review.author}</span>
                  <span className="text-xs" style={{ color: colors.gray }}>{review.date}</span>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-xs"
                      style={{ color: star <= review.rating ? colors.gold : colors.light }}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-sm" style={{ color: colors.gray }}>{review.comment}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* фиксированная кнопка записи */}
      <div className="fixed bottom-0 left-0 right-0 px-4 py-4"
        style={{ backgroundColor: colors.primary }}>
        <button
          onClick={() => navigate(`/booking/${shop.id}`)}
          className="w-full max-w-2xl mx-auto block py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}>
          Записаться
        </button>
      </div>

    </div>
  );
}

export default ShopDetailsPage;
