import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockShops from "../../data/mockShops";
import colors from "../../styles/colors";
import ShopHeader from "../../components/shop/ShopHeader";
import ServiceItem from "../../components/shop/ServiceItem";
import ReviewCard from "../../components/shop/ReviewCard";

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
      <ShopHeader shop={shop} />

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
              <ServiceItem key={service.id} service={service} />
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
              <ReviewCard key={review.id} review={review} />
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
