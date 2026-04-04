import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockShops from "../../data/mockShops";
import bookingSteps from "../../constants/bookingSteps";
import colors from "../../styles/colors";
import { createBooking } from "../../api/bookingApi";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "14:00", "15:00", "16:00",
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

  const days = getNextDays(7);

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-white">Барбершоп не найден</p>
      </div>
    );
  }

  function handleBack() {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate(-1);
    }
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
    <div className="min-h-screen pb-10" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-lg mx-auto px-4 pt-6">

        {/* верхняя панель */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={handleBack} className="text-sm" style={{ color: colors.gray }}>
            ← Назад
          </button>
          {/* индикатор шагов */}
          <div className="flex items-center gap-2">
            {bookingSteps.map(({ step, label }) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      backgroundColor: step <= currentStep ? colors.accent : colors.light,
                      color: step <= currentStep ? "#fff" : colors.gray,
                    }}>
                    {step}
                  </div>
                  <span className="text-xs hidden sm:block" style={{ color: step <= currentStep ? colors.accent : colors.gray }}>
                    {label}
                  </span>
                </div>
                {step < bookingSteps.length && (
                  <div className="w-6 h-px mb-4" style={{ backgroundColor: step < currentStep ? colors.accent : colors.light }} />
                )}
              </div>
            ))}
          </div>
          <div className="w-12" />
        </div>

        {/* ШАГ 1 — выбор услуги */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Выберите услугу</h2>
            <p className="text-sm mb-5" style={{ color: colors.gray }}>{shop.name}</p>

            <div className="flex flex-col gap-3 mb-6">
              {shop.services.map((service) => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-between px-4 py-4 rounded-xl text-left transition-all"
                    style={{
                      backgroundColor: isSelected ? colors.accent : colors.dark,
                      border: isSelected ? `1px solid ${colors.accent}` : "1px solid transparent",
                    }}>
                    <div>
                      <p className="text-white text-sm font-medium">{service.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : colors.gray }}>
                        {service.duration}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-white">{service.price} ₸</span>
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selectedService}
              onClick={() => setCurrentStep(2)}
              className="w-full py-3 rounded-xl font-semibold text-white text-base transition-opacity"
              style={{
                backgroundColor: colors.accent,
                opacity: selectedService ? 1 : 0.4,
              }}>
              Далее →
            </button>
          </div>
        )}

        {/* ШАГ 2 — мастер и время */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-5">Мастер и время</h2>

            {/* мастера */}
            <p className="text-sm font-medium text-white mb-2">Мастер</p>
            <div className="flex flex-col gap-2 mb-6">

              {/* любой доступный */}
              <button
                onClick={() => setSelectedMaster(null)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  backgroundColor: selectedMaster === null ? colors.accent : colors.dark,
                  border: selectedMaster === null ? `1px solid ${colors.accent}` : "1px solid transparent",
                }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0"
                  style={{ backgroundColor: colors.light }}>
                  ✦
                </div>
                <span className="text-sm text-white font-medium">Любой доступный</span>
              </button>

              {shop.masters.map((master) => {
                const isSelected = selectedMaster?.id === master.id;
                const initials = master.name.split(" ").map((w) => w[0]).join("");
                return (
                  <button
                    key={master.id}
                    onClick={() => setSelectedMaster(master)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: isSelected ? colors.accent : colors.dark,
                      border: isSelected ? `1px solid ${colors.accent}` : "1px solid transparent",
                    }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                      style={{ backgroundColor: isSelected ? "rgba(255,255,255,0.2)" : colors.light }}>
                      {initials}
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-white font-medium">{master.name}</p>
                      <p className="text-xs" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : colors.gray }}>
                        ★ {master.rating}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* дата */}
            <p className="text-sm font-medium text-white mb-2">Дата</p>
            <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
              {days.map((day) => {
                const isSelected = selectedDate === day.full;
                return (
                  <button
                    key={day.full}
                    onClick={() => setSelectedDate(day.full)}
                    className="flex flex-col items-center px-3 py-2 rounded-xl min-w-13 transition-all"
                    style={{
                      backgroundColor: isSelected ? colors.accent : colors.dark,
                    }}>
                    <span className="text-xs" style={{ color: isSelected ? "rgba(255,255,255,0.7)" : colors.gray }}>
                      {day.label}
                    </span>
                    <span className="text-sm font-semibold text-white mt-0.5">{day.date}</span>
                  </button>
                );
              })}
            </div>

            {/* время */}
            <p className="text-sm font-medium text-white mb-2">Время</p>
            <div className="grid grid-cols-4 gap-2 mb-6">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className="py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isSelected ? colors.accent : colors.dark,
                      color: isSelected ? "#fff" : colors.gray,
                    }}>
                    {slot}
                  </button>
                );
              })}
            </div>

            <button
              disabled={!selectedTime}
              onClick={() => setCurrentStep(3)}
              className="w-full py-3 rounded-xl font-semibold text-white text-base transition-opacity"
              style={{
                backgroundColor: colors.accent,
                opacity: selectedTime ? 1 : 0.4,
              }}>
              Далее →
            </button>
          </div>
        )}

        {/* ШАГ 3 — подтверждение */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-5">Детали записи</h2>

            {/* summary */}
            <div className="rounded-2xl p-4 flex flex-col gap-3 mb-5"
              style={{ backgroundColor: colors.dark }}>
              <Row label="Барбершоп" value={shop.name} />
              <Row label="Адрес" value={shop.address} />
              <div className="h-px" style={{ backgroundColor: colors.light }} />
              <Row label="Услуга" value={selectedService?.name} />
              <Row label="Длительность" value={selectedService?.duration} />
              <Row label="Мастер" value={selectedMaster ? selectedMaster.name : "Любой доступный"} />
              <Row label="Дата" value={selectedDate} />
              <Row label="Время" value={selectedTime} />
              <div className="h-px" style={{ backgroundColor: colors.light }} />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Итого</span>
                <span className="text-base font-bold" style={{ color: colors.accent }}>
                  {selectedService?.price} ₸
                </span>
              </div>
            </div>

            {/* комментарий */}
            <div className="mb-4">
              <label className="text-sm text-white mb-2 block">Комментарий</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Например: хочу фейд с переходом..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none resize-none"
                style={{ backgroundColor: colors.light }}
              />
            </div>

            {/* напоминание */}
            <div className="flex items-center justify-between px-4 py-3 rounded-xl mb-3"
              style={{ backgroundColor: colors.dark }}>
              <span className="text-sm text-white">Напоминание за 2 часа</span>
              <button
                onClick={() => setReminder(!reminder)}
                className="w-11 h-6 rounded-full transition-colors flex items-center px-1"
                style={{ backgroundColor: reminder ? colors.accent : colors.light }}>
                <div
                  className="w-4 h-4 rounded-full bg-white transition-transform"
                  style={{ transform: reminder ? "translateX(20px)" : "translateX(0)" }}
                />
              </button>
            </div>

            <p className="text-xs mb-6 text-center" style={{ color: colors.gray }}>
              Бесплатная отмена до 2 часов до записи
            </p>

            <button
              onClick={handleConfirm}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: colors.accent }}>
              {isSubmitting ? "Подтверждаем..." : "Подтвердить запись ✓"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// маленький компонент для строк summary — только внутри файла
function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: "#A8B2C1" }}>{label}</span>
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  );
}

export default BookingPage;
