import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Scissors, MapPin, CalendarDays, Shield, Wrench } from "lucide-react";
import mockShops from "../../data/mockShops";
import colors from "../../constants/colors";
import ServiceItem from "../../components/shop/ServiceItem";
import ReviewCard from "../../components/shop/ReviewCard";

const iconSize = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 52,
};

const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function getNextDays(count) {
  const result = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    result.push({
      label: dayNames[d.getDay()],
      date: d.getDate(),
      full: d.toLocaleDateString("ru-RU"),
    });
  }
  return result;
}

const quickTimeSlots = ["11:00", "11:30", "12:00", "12:30", "13:00", "13:30"];

function ShopDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("services");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const shop = mockShops.find((s) => s.id === Number(id));
  const days = getNextDays(4);

  if (!shop) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      >
        <p className="text-white text-lg font-semibold">Барбершоп не найден</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm underline"
          style={{ color: colors.gray }}
        >
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primary }}>

      {/* hero-баннер */}
      <div
        className="relative w-full h-52 flex items-center justify-center"
        style={{ backgroundColor: colors.dark }}
      >
        <Scissors size={iconSize.xl} style={{ color: colors.accent }} />

        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-xl flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
        >
          ←
        </button>
      </div>

      {/* контент страницы */}
      <div className="max-w-5xl mx-auto px-6 py-6 flex gap-6 items-start">

        {/* левая часть */}
        <div className="flex-1 min-w-0">

          {/* название и базовая инфо */}
          <h1 className="text-2xl font-bold text-white">{shop.name}</h1>

          <div className="flex items-center gap-2 mt-2">
            <span style={{ color: colors.gold }}>★★★★★</span>
            <span className="text-sm font-semibold text-white">{shop.rating}</span>
            <span className="text-sm" style={{ color: colors.gray }}>
              ({shop.reviewCount} отзывов)
            </span>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-sm" style={{ color: colors.gray }}>
              <span className="inline-flex items-center gap-1">
                <MapPin size={iconSize.sm} />
                {shop.address}
              </span>
            </span>
            <span
              className="text-sm font-medium flex items-center gap-1"
              style={{ color: shop.isOpen ? colors.success : colors.gray }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: shop.isOpen ? colors.success : colors.gray,
                }}
              />
              {shop.isOpen ? "Открыто · до 21:00" : "Закрыто"}
            </span>
          </div>

          {/* иконки категорий услуг */}
          <div className="flex gap-2 mt-4">
            {[Scissors, Shield, Wrench].map((Icon, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: colors.light }}
              >
                <Icon size={iconSize.lg} style={{ color: colors.accent }} />
              </div>
            ))}
          </div>

          {/* табы */}
          <div
            className="flex border-b mt-5"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-5 py-3 text-sm font-medium transition-colors"
                style={{
                  color: activeTab === tab.key ? "#ffffff" : colors.gray,
                  borderBottom:
                    activeTab === tab.key
                      ? `2px solid ${colors.accent}`
                      : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* содержимое таба */}
          <div className="py-4">
            {activeTab === "services" && (
              <div>
                {shop.services.map((service) => (
                  <ServiceItem key={service.id} service={service} />
                ))}
              </div>
            )}

            {activeTab === "masters" && (
              <div className="flex flex-col gap-3">
                {shop.masters.map((master) => {
                  const initials = master.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("");
                  return (
                    <div
                      key={master.id}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl"
                      style={{ backgroundColor: colors.light }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: colors.accent }}
                      >
                        {initials}
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {master.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="text-xs" style={{ color: colors.gold }}>
                            ★
                          </span>
                          <span className="text-xs" style={{ color: colors.gray }}>
                            {master.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                {shop.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* правый sidebar — виджет быстрой записи */}
        <div
          className="hidden lg:block w-72 shrink-0 rounded-2xl p-5 sticky top-20"
          style={{ backgroundColor: colors.light }}
        >
          <h3 className="text-base font-semibold text-white mb-4">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={iconSize.md} />
              Записаться
            </span>
          </h3>

          <p className="text-xs mb-2" style={{ color: colors.gray }}>
            Выберите дату
          </p>
          <div className="flex gap-2 mb-4">
            {days.map((day) => {
              const isSelected = selectedDate === day.full;
              return (
                <button
                  key={day.full}
                  onClick={() => setSelectedDate(day.full)}
                  className="flex-1 flex flex-col items-center py-2 rounded-xl transition-all"
                  style={{
                    backgroundColor: isSelected ? colors.accent : colors.dark,
                  }}
                >
                  <span
                    className="text-xs"
                    style={{
                      color: isSelected ? "rgba(255,255,255,0.8)" : colors.gray,
                    }}
                  >
                    {day.label}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {day.date}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-xs mb-2" style={{ color: colors.gray }}>
            Время
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {quickTimeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className="py-2 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: isSelected ? colors.accent : colors.dark,
                    color: "#ffffff",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>

          <div
            className="flex items-center justify-between py-3 border-t mb-4"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <span className="text-sm" style={{ color: colors.gray }}>
              Итого
            </span>
            <span className="text-sm font-bold" style={{ color: colors.accent }}>
              от {shop.priceFrom.toLocaleString("ru-RU")}₸
            </span>
          </div>

          <button
            onClick={() => navigate(`/booking/${shop.id}`)}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent }}
          >
            Записаться
          </button>
        </div>
      </div>

      {/* кнопка записи на мобиле */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 px-6 py-4"
        style={{
          backgroundColor: colors.primary,
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={() => navigate(`/booking/${shop.id}`)}
          className="w-full py-3 rounded-xl font-semibold text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}
        >
          Записаться
        </button>
      </div>
    </div>
  );
}

export default ShopDetailsPage;
