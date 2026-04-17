import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockShops from "../../data/mockShops";
import colors from "../../constants/colors";
import { createBooking } from "../../api/bookingApi";
import BookingSteps from "../../components/booking/BookingSteps";
import ServiceSelector from "../../components/booking/ServiceSelector";
import MasterSelector from "../../components/booking/MasterSelector";
import DateSelector from "../../components/booking/DateSelector";
import TimeSlotGrid from "../../components/booking/TimeSlotGrid";
import BookingSummary from "../../components/booking/BookingSummary";
import ReminderToggle from "../../components/booking/ReminderToggle";

const step1Services = [
  {
    id: 1,
    category: "Стрижки",
    icon: "✂️",
    name: "Классическая стрижка",
    shortName: "Классич. стрижка",
    duration: 30,
    price: 1500,
  },
  {
    id: 2,
    category: "Стрижки",
    icon: "👑",
    name: "Фейд + укладка",
    shortName: "Фейд + укладка",
    duration: 50,
    price: 2500,
  },
  {
    id: 3,
    category: "Борода",
    icon: "🪒",
    name: "Стрижка бороды",
    shortName: "Стрижка бороды",
    duration: 25,
    price: 1200,
  },
  {
    id: 4,
    category: "Борода",
    icon: "💎",
    name: "Комплекс: стрижка + борода",
    shortName: "Комплекс",
    duration: 60,
    price: 3200,
  },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30",
  "13:00", "14:00", "15:00", "16:00",
];

const step2Masters = [
  { id: 0, initials: "⚡", name: "Любой", rating: null },
  { id: 1, initials: "AS", name: "Amir", rating: 4.9 },
  { id: 2, initials: "BM", name: "Baur", rating: 4.8 },
  { id: 3, initials: "NK", name: "Nurlan", rating: 4.7 },
];

const dayNames = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
const dayNamesShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const monthNames = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];
const monthNamesShort = [
  "янв", "фев", "мар", "апр", "мая", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

function buildDays(count) {
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    const date = d.getDate();
    const month = d.getMonth();
    return {
      label: dayNames[dow],
      number: date,
      display: `${dayNamesShort[dow]}, ${date} ${monthNames[month]}`,
      summaryDisplay: `${dayNamesShort[dow]}, ${date} ${monthNamesShort[month]}`,
      key: d.toISOString().slice(0, 10),
    };
  });
}

const initialDays = buildDays(6);

const stepTitles = ["Выбор услуги", "Мастер и время", "Подтверждение"];

function BookingPage() {
  const { shopId } = useParams();
  const navigate = useNavigate();

  const shop = mockShops.find((s) => s.id === Number(shopId));

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(step1Services[0]);
  const [selectedMaster, setSelectedMaster] = useState(step2Masters[1]);
  const [selectedDay, setSelectedDay] = useState(initialDays[1]);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [comment, setComment] = useState("");
  const [reminder, setReminder] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = initialDays;
  const selectedDate = selectedDay?.display || null;

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
      shopAddress: shop.address,
      serviceName:
        selectedService?.shortName || selectedService?.name || "",
      masterName: selectedMaster?.name || "Любой доступный",
      date: selectedDay?.key || null,
      time: selectedTime,
      duration: selectedService?.duration || 30,
      price: selectedService?.price || 0,
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
    <div
      className="min-h-screen font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="flex items-center justify-center"
        style={{ padding: "16px 32px", position: "relative" }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center justify-center text-white"
          style={{
            position: "absolute",
            left: "32px",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            backgroundColor: "#1E2A3A",
            fontSize: "18px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ←
        </button>

        <h1
          className="text-white"
          style={{ fontSize: "20px", fontWeight: 700 }}
        >
          {stepTitles[currentStep - 1]}
        </h1>

        <span
          style={{
            position: "absolute",
            right: "32px",
            fontSize: "14px",
            color: "#A8B2C1",
          }}
        >
          шаг {currentStep} из 3
        </span>
      </div>

      <BookingSteps currentStep={currentStep} />

      <div
        className="grid items-start"
        style={{
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          padding: "0 32px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <div className="min-w-0">
          {currentStep === 1 && (
            <div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#A8B2C1",
                  marginBottom: "16px",
                }}
              >
                {shop.name}
              </p>

              <ServiceSelector
                services={step1Services}
                selectedId={selectedService?.id}
                onSelect={setSelectedService}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2
                className="text-white"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Выберите мастера
              </h2>
              <div style={{ marginBottom: "32px" }}>
                <MasterSelector
                  masters={step2Masters}
                  selectedId={selectedMaster?.id}
                  onSelect={setSelectedMaster}
                />
              </div>

              <h2
                className="text-white"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Выберите дату
              </h2>
              <div style={{ marginBottom: "32px" }}>
                <DateSelector
                  days={days}
                  selectedKey={selectedDay?.key}
                  onSelect={setSelectedDay}
                />
              </div>

              <h2
                className="text-white"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "16px",
                }}
              >
                Выберите время
              </h2>
              <TimeSlotGrid
                slots={timeSlots}
                selectedSlot={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          )}

          {currentStep === 3 && (
            <Step3Details
              shop={shop}
              masterName={
                selectedMaster ? selectedMaster.name : "Любой доступный"
              }
              serviceName={selectedService?.name}
              dateDisplay={selectedDate}
              time={selectedTime}
              duration={selectedService?.duration}
              price={selectedService?.price}
              comment={comment}
              onCommentChange={setComment}
              reminder={reminder}
              onReminderChange={setReminder}
            />
          )}
        </div>

        {currentStep === 1 && (
          <OrderWidget
            service={selectedService}
            onNext={() => selectedService && setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <Step2OrderWidget
            master={selectedMaster}
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            canProceed={!!selectedMaster && !!selectedDay && !!selectedTime}
            onNext={() => setCurrentStep(3)}
          />
        )}

        {currentStep === 3 && (
          <BookingSummary
            shopName={shop.name}
            dateTime={
              selectedDay && selectedTime
                ? `${selectedDay.summaryDisplay} · ${selectedTime}`
                : "—"
            }
            masterName={selectedMaster ? selectedMaster.name : "Любой доступный"}
            serviceShortName={
              selectedService?.shortName || selectedService?.name || "—"
            }
            duration={selectedService?.duration}
            price={selectedService?.price}
            isSubmitting={isSubmitting}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}

function OrderWidget({ service, onNext }) {
  const hasService = !!service;

  return (
    <aside
      className="shrink-0"
      style={{
        backgroundColor: "#000000",
        borderRadius: "16px",
        padding: "24px",
        position: "sticky",
        top: "24px",
      }}
    >
      <h2
        className="text-white"
        style={{ fontSize: "18px", fontWeight: 700, marginBottom: "20px" }}
      >
        Ваш заказ
      </h2>

      {hasService ? (
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            rowGap: "12px",
            marginBottom: "20px",
          }}
        >
          <span style={{ fontSize: "14px", color: "#A8B2C1" }}>Услуга</span>
          <span
            className="text-white"
            style={{ fontSize: "14px", fontWeight: 600, textAlign: "right" }}
          >
            {service.shortName || service.name}
          </span>

          <span style={{ fontSize: "14px", color: "#A8B2C1" }}>
            Длительность
          </span>
          <span
            className="text-white"
            style={{ fontSize: "14px", fontWeight: 600, textAlign: "right" }}
          >
            {service.duration} мин
          </span>

          <span style={{ fontSize: "14px", color: "#A8B2C1" }}>Стоимость</span>
          <span
            className="text-white"
            style={{ fontSize: "14px", fontWeight: 600, textAlign: "right" }}
          >
            {service.price.toLocaleString("ru-RU")}₸
          </span>
        </div>
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "#A8B2C1",
            padding: "20px 0",
            marginBottom: "20px",
          }}
        >
          Выберите услугу
        </p>
      )}

      <div
        style={{
          height: "1px",
          backgroundColor: "#2a3a4a",
          marginBottom: "16px",
        }}
      />

      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "20px" }}
      >
        <span
          className="text-white"
          style={{ fontSize: "16px", fontWeight: 600 }}
        >
          Итого
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#E94560",
          }}
        >
          {hasService ? `${service.price.toLocaleString("ru-RU")}₸` : "0₸"}
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!hasService}
        className="text-white"
        style={{
          width: "100%",
          backgroundColor: "#E94560",
          borderRadius: "12px",
          padding: "14px",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: hasService ? "pointer" : "not-allowed",
          opacity: hasService ? 1 : 0.5,
        }}
      >
        Далее →
      </button>
    </aside>
  );
}

function Step2OrderWidget({ master, service, date, time, canProceed, onNext }) {
  const rows = [
    ["Мастер", master?.name || "—"],
    ["Услуга", service?.shortName || service?.name || "—"],
    ["Дата", date || "—"],
    ["Время", time || "—"],
    [
      "Стоимость",
      service ? `${service.price.toLocaleString("ru-RU")}₸` : "—",
    ],
  ];

  return (
    <aside
      className="shrink-0"
      style={{
        backgroundColor: "#000000",
        borderRadius: "16px",
        padding: "24px",
        position: "sticky",
        top: "24px",
      }}
    >
      <h2
        className="text-white"
        style={{ fontSize: "18px", fontWeight: 700, marginBottom: "16px" }}
      >
        Ваш заказ
      </h2>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          rowGap: "12px",
          marginBottom: "16px",
        }}
      >
        {rows.map(([label, value]) => (
          <Step2Row key={label} label={label} value={value} />
        ))}
      </div>

      <div
        style={{
          height: "1px",
          backgroundColor: "#2a3a4a",
          marginBottom: "16px",
        }}
      />

      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "20px" }}
      >
        <span
          className="text-white"
          style={{ fontSize: "16px", fontWeight: 600 }}
        >
          Итого
        </span>
        <span
          style={{
            fontSize: "20px",
            fontWeight: 700,
            color: "#E94560",
          }}
        >
          {service ? `${service.price.toLocaleString("ru-RU")}₸` : "0₸"}
        </span>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="text-white"
        style={{
          width: "100%",
          backgroundColor: "#E94560",
          borderRadius: "12px",
          padding: "14px",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: canProceed ? "pointer" : "not-allowed",
          opacity: canProceed ? 1 : 0.5,
        }}
      >
        Далее →
      </button>
    </aside>
  );
}

function Step2Row({ label, value }) {
  return (
    <>
      <span style={{ fontSize: "14px", color: "#A8B2C1" }}>{label}</span>
      <span
        className="text-white"
        style={{ fontSize: "14px", fontWeight: 600, textAlign: "right" }}
      >
        {value}
      </span>
    </>
  );
}

function Step3Details({
  shop,
  masterName,
  serviceName,
  dateDisplay,
  time,
  duration,
  price,
  comment,
  onCommentChange,
  reminder,
  onReminderChange,
}) {
  const rows = [
    ["Мастер", masterName || "—"],
    ["Услуга", serviceName || "—"],
    ["Дата", dateDisplay || "—"],
    ["Время", time || "—"],
    ["Длительность", duration ? `~${duration} минут` : "—"],
  ];

  return (
    <div>
      <h2
        className="text-white"
        style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}
      >
        Детали записи
      </h2>

      <div
        className="flex items-center"
        style={{
          backgroundColor: "#1E2A3A",
          borderRadius: "12px",
          padding: "16px",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            backgroundColor: "#16213E",
            fontSize: "22px",
            flexShrink: 0,
          }}
        >
          💈
        </div>
        <div>
          <div
            className="text-white"
            style={{ fontSize: "16px", fontWeight: 700 }}
          >
            {shop.name}
          </div>
          <div
            style={{
              fontSize: "13px",
              color: "#A8B2C1",
              marginTop: "4px",
            }}
          >
            📍 {shop.address}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "24px" }}>
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-center justify-between"
            style={{
              padding: "14px 0",
              borderBottom: "1px solid #2a3a4a",
            }}
          >
            <span style={{ fontSize: "14px", color: "#A8B2C1" }}>
              {label}
            </span>
            <span
              className="text-white"
              style={{ fontSize: "15px", fontWeight: 700 }}
            >
              {value}
            </span>
          </div>
        ))}

        <div
          className="flex items-center justify-between"
          style={{ padding: "14px 0", marginTop: "4px" }}
        >
          <span
            className="text-white"
            style={{ fontSize: "16px", fontWeight: 600 }}
          >
            Итого
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#E94560",
            }}
          >
            {price ? `${price.toLocaleString("ru-RU")}₸` : "—"}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <label
          style={{
            display: "block",
            fontSize: "14px",
            color: "#A8B2C1",
            marginBottom: "8px",
          }}
        >
          Комментарий для мастера
        </label>
        <textarea
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Например: хочу фейд с переходом..."
          className="booking-comment-textarea"
          style={{
            width: "100%",
            minHeight: "80px",
            backgroundColor: "#1E2A3A",
            border: "1px solid #2a3a4a",
            borderRadius: "12px",
            padding: "14px 16px",
            color: "#ffffff",
            fontSize: "14px",
            resize: "vertical",
            outline: "none",
            fontFamily: "inherit",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#E94560";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "#2a3a4a";
          }}
        />
      </div>

      <div style={{ marginBottom: "16px" }}>
        <ReminderToggle enabled={reminder} onChange={onReminderChange} />
      </div>

      <p style={{ fontSize: "13px", color: "#A8B2C1" }}>
        ℹ️ Бесплатная отмена до 2 часов до записи
      </p>
    </div>
  );
}

export default BookingPage;
