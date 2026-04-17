import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Scissors, Clock3, Check, Zap, MapPin, Bell, Info } from "lucide-react";
import mockShops from "../../data/mockShops";
import colors from "../../constants/colors";
import { createBooking } from "../../api/bookingApi";

const iconSize = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 22,
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "14:00", "15:00", "16:00",
];

const dayNames = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function getNextDays(count) {
  const days = [];
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    days.push({
      label: dayNames[d.getDay()],
      date: d.getDate(),
      full: d.toLocaleDateString("ru-RU"),
    });
  }
  return days;
}

const stepTitles = ["Выбор услуги", "Мастер и время", "Подтверждение"];
const stepLabels = ["1. Услуга", "2. Время", "3. Подтверждение"];

function BookingPage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const shop = mockShops.find((s) => s.id === Number(shopId));

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedMaster, setSelectedMaster] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [comment, setComment] = useState("");
  const [reminder, setReminder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = getNextDays(6);

  if (!shop) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      >
        <p className="text-white">Барбершоп не найден</p>
      </div>
    );
  }

  function handleBack() {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else navigate(-1);
  }

  async function handleConfirm() {
    const bookingData = {
      shopId: shop.id,
      shopName: shop.name,
      service: selectedService,
      master: selectedMaster,
      date: selectedDate,
      time: selectedTime,
      comment,
      reminder,
    };

    setIsSubmitting(true);
    try {
      await createBooking(bookingData);
      navigate("/booking-success", { state: bookingData });
    } catch (error) {
      console.error("Ошибка при создании записи:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-full" style={{ backgroundColor: colors.primary }}>

      {/* верхняя панель */}
      <div
        className="sticky top-0 z-10 px-6 h-14 flex items-center justify-between"
        style={{
          backgroundColor: colors.dark,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={handleBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-medium"
          style={{ backgroundColor: colors.light }}
        >
          ←
        </button>

        <h1 className="text-base font-semibold text-white">
          {stepTitles[currentStep - 1]}
        </h1>

        <span className="text-sm" style={{ color: colors.gray }}>
          шаг {currentStep} из 3
        </span>
      </div>

      {/* progress bar */}
      <div
        className="flex"
        style={{ backgroundColor: colors.dark, paddingBottom: "1px" }}
      >
        {stepLabels.map((label, i) => {
          const step = i + 1;
          const isDone = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div key={step} className="flex-1 flex flex-col items-center pb-3 pt-1">
              <div
                className="w-full h-1 mb-1.5"
                style={{
                  backgroundColor:
                    isDone || isActive ? colors.accent : "rgba(255,255,255,0.1)",
                }}
              />
              <span
                className="text-xs"
                style={{
                  color: isActive ? colors.accent : isDone ? colors.accent : colors.gray,
                }}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {/* основной контент */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex gap-6 items-start">

        {/* контент шага */}
        <div className="flex-1 min-w-0">

          {/* ШАГ 1 — услуга */}
          {currentStep === 1 && (
            <div>
              <p className="text-sm mb-4" style={{ color: colors.gray }}>
                {shop.name}
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {shop.services.map((service) => {
                  const isSelected = selectedService?.id === service.id;
                  return (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all"
                      style={{
                        backgroundColor: colors.light,
                        border: isSelected
                          ? `1px solid ${colors.accent}`
                          : "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Scissors size={iconSize.md} />
                        <div>
                          <p className="text-white text-sm font-medium">
                            {service.name}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: colors.gray }}>
                            <span className="inline-flex items-center gap-1">
                              <Clock3 size={iconSize.xs} />
                              {service.duration}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: isSelected ? colors.accent : colors.gray }}
                        >
                          {service.price.toLocaleString("ru-RU")}₸
                        </span>
                        {isSelected && (
                          <Check size={iconSize.sm} style={{ color: colors.accent }} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                disabled={!selectedService}
                onClick={() => setCurrentStep(2)}
                className="w-full py-3 rounded-xl font-semibold text-white transition-opacity"
                style={{
                  backgroundColor: colors.accent,
                  opacity: selectedService ? 1 : 0.4,
                }}
              >
                Далее →
              </button>
            </div>
          )}

          {/* ШАГ 2 — мастер и время */}
          {currentStep === 2 && (
            <div>
              <p className="text-sm font-medium text-white mb-3">
                Выберите мастера
              </p>
              <div className="flex gap-4 overflow-x-auto pb-2 mb-6 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible">

                {/* любой */}
                <button
                  onClick={() => setSelectedMaster(null)}
                  className="flex flex-col items-center gap-1.5 shrink-0"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-xl"
                    style={{
                      backgroundColor: colors.light,
                      border:
                        selectedMaster === null
                          ? `2px solid ${colors.accent}`
                          : "2px solid transparent",
                    }}
                  >
                    <Zap size={iconSize.md} style={{ color: colors.accent }} />
                  </div>
                  <span
                    className="text-xs"
                    style={{
                      color: selectedMaster === null ? "#ffffff" : colors.gray,
                    }}
                  >
                    Любой
                  </span>
                </button>

                {shop.masters.map((master) => {
                  const isSelected = selectedMaster?.id === master.id;
                  const initials = master.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("");
                  return (
                    <button
                      key={master.id}
                      onClick={() => setSelectedMaster(master)}
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{
                          backgroundColor: colors.light,
                          border: isSelected
                            ? `2px solid ${colors.accent}`
                            : "2px solid transparent",
                        }}
                      >
                        {initials}
                      </div>
                      <span
                        className="text-xs text-center"
                        style={{ color: isSelected ? "#ffffff" : colors.gray }}
                      >
                        {master.name.split(" ")[0]}
                      </span>
                      <span className="text-xs" style={{ color: colors.gold }}>
                        ★ {master.rating}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-sm font-medium text-white mb-3">
                Выберите дату
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 mb-6 lg:grid lg:grid-cols-6 lg:gap-2 lg:overflow-visible">
                {days.map((day) => {
                  const isSelected = selectedDate === day.full;
                  return (
                    <button
                      key={day.full}
                      onClick={() => setSelectedDate(day.full)}
                      className="flex flex-col items-center px-4 py-2.5 rounded-xl min-w-14 transition-all"
                      style={{
                        backgroundColor: isSelected ? colors.accent : colors.light,
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
                      <span className="text-sm font-semibold text-white mt-0.5">
                        {day.date}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="text-sm font-medium text-white mb-3">
                Выберите время
              </p>
              <div className="grid grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mb-6">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className="py-2.5 rounded-lg text-sm font-medium transition-all"
                      style={{
                        backgroundColor: isSelected ? colors.accent : colors.light,
                        color: "#ffffff",
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>

              <button
                disabled={!selectedTime}
                onClick={() => setCurrentStep(3)}
                className="w-full py-3 rounded-xl font-semibold text-white transition-opacity"
                style={{
                  backgroundColor: colors.accent,
                  opacity: selectedTime ? 1 : 0.4,
                }}
              >
                Далее →
              </button>
            </div>
          )}

          {/* ШАГ 3 — подтверждение */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-lg font-bold text-white mb-4">
                Детали записи
              </h2>

              {/* карточка барбершопа */}
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-xl mb-4"
                style={{ backgroundColor: colors.light }}
              >
                <Scissors size={iconSize.lg} style={{ color: colors.accent }} />
                <div>
                  <p className="text-white text-sm font-medium">{shop.name}</p>
                  <p className="text-xs" style={{ color: colors.gray }}>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={iconSize.xs} />
                      {shop.address}
                    </span>
                  </p>
                </div>
              </div>

              {/* таблица деталей */}
              <div
                className="rounded-2xl px-5 py-2 mb-4"
                style={{ backgroundColor: colors.dark }}
              >
                {[
                  ["Мастер", selectedMaster ? selectedMaster.name : "Любой доступный"],
                  ["Услуга", selectedService?.name],
                  ["Дата", selectedDate],
                  ["Время", selectedTime],
                  ["Длительность", selectedService?.duration ? `~${selectedService.duration}` : "—"],
                ].map(([label, value], i, arr) => (
                  <div
                    key={label}
                    className="flex items-center justify-between py-3"
                    style={{
                      borderBottom:
                        i < arr.length - 1
                          ? "1px solid rgba(255,255,255,0.05)"
                          : "none",
                    }}
                  >
                    <span className="text-sm" style={{ color: colors.gray }}>
                      {label}
                    </span>
                    <span className="text-sm text-white font-medium">{value}</span>
                  </div>
                ))}

                <div
                  className="flex items-center justify-between py-3 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <span className="text-base font-bold text-white">Итого</span>
                  <span
                    className="text-lg font-bold"
                    style={{ color: colors.accent }}
                  >
                    {selectedService?.price.toLocaleString("ru-RU")}₸
                  </span>
                </div>
              </div>

              {/* комментарий */}
              <div className="mb-4">
                <label className="text-sm text-white mb-2 block">
                  Комментарий для мастера
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Например: хочу фейд с переходом..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none resize-none"
                  style={{
                    backgroundColor: colors.light,
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>

              {/* напоминание */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl mb-2"
                style={{ backgroundColor: colors.light }}
              >
                <span className="text-sm text-white">
                  <span className="inline-flex items-center gap-1.5">
                    <Bell size={iconSize.sm} />
                    Напоминание · За 2 часа до записи
                  </span>
                </span>
                <button
                  onClick={() => setReminder(!reminder)}
                  className="w-11 h-6 rounded-full flex items-center px-1 transition-colors"
                  style={{ backgroundColor: reminder ? colors.accent : "rgba(255,255,255,0.15)" }}
                >
                  <div
                    className="w-4 h-4 rounded-full bg-white transition-transform"
                    style={{ transform: reminder ? "translateX(20px)" : "translateX(0)" }}
                  />
                </button>
              </div>

              <p className="text-xs mb-5 text-center" style={{ color: colors.gray }}>
                <span className="inline-flex items-center gap-1">
                  <Info size={iconSize.xs} />
                  Бесплатная отмена до 2 часов до записи
                </span>
              </p>

              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity disabled:opacity-60"
                style={{ backgroundColor: colors.accent }}
              >
                {isSubmitting ? "Подтверждаем..." : "Подтвердить запись ✓"}
              </button>
            </div>
          )}
        </div>

        {/* правый sidebar — сводка заказа */}
        {selectedService && (
          <div
            className="hidden lg:block w-64 shrink-0 rounded-2xl p-5 sticky top-24"
            style={{ backgroundColor: colors.light }}
          >
            <h3 className="text-base font-semibold text-white mb-4">
              Ваш заказ
            </h3>
            <div className="flex flex-col gap-2.5">
              {[
                ["Услуга", selectedService?.name],
                selectedMaster && ["Мастер", selectedMaster.name],
                selectedDate && ["Дата", selectedDate],
                selectedTime && ["Время", selectedTime],
                ["Длительность", selectedService?.duration],
                ["Стоимость", selectedService ? `${selectedService.price.toLocaleString("ru-RU")}₸` : null],
              ]
                .filter(Boolean)
                .map(([label, value]) =>
                  value ? (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-xs" style={{ color: colors.gray }}>
                        {label}
                      </span>
                      <span className="text-sm text-white font-medium">{value}</span>
                    </div>
                  ) : null
                )}
            </div>

            <div
              className="border-t mt-4 pt-4 flex items-center justify-between"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <span className="text-sm text-white font-semibold">Итого</span>
              <span className="text-base font-bold" style={{ color: colors.accent }}>
                {selectedService.price.toLocaleString("ru-RU")}₸
              </span>
            </div>

            {currentStep < 3 && (
              <button
                disabled={
                  (currentStep === 1 && !selectedService) ||
                  (currentStep === 2 && !selectedTime)
                }
                onClick={() => setCurrentStep(currentStep + 1)}
                className="w-full mt-4 py-2.5 rounded-xl font-semibold text-white text-sm transition-opacity disabled:opacity-40"
                style={{ backgroundColor: colors.accent }}
              >
                Далее →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingPage;
