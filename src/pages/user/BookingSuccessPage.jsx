import { useLocation, useNavigate } from "react-router-dom";
import SuccessCard from "../../components/booking/SuccessCard";

const dayNamesShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const weekdayAccusative = [
  "воскресенье",
  "понедельник",
  "вторник",
  "среду",
  "четверг",
  "пятницу",
  "субботу",
];
const monthsShort = [
  "янв", "фев", "мар", "апр", "мая", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];
const monthsGenitive = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function parseDate(dateInput) {
  if (!dateInput) return null;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) {
    const [y, m, d] = dateInput.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return null;
}

function formatDateShort(dateInput) {
  const d = parseDate(dateInput);
  if (!d) return dateInput || "";
  return `${dayNamesShort[d.getDay()]}, ${d.getDate()} ${monthsShort[d.getMonth()]}`;
}

function formatDateAccusative(dateInput) {
  const d = parseDate(dateInput);
  if (!d) return dateInput || "";
  return `в ${weekdayAccusative[d.getDay()]}, ${d.getDate()} ${monthsGenitive[d.getMonth()]}`;
}

function formatPrice(value) {
  if (value == null) return "";
  return `${Number(value).toLocaleString("ru-RU")}₸`;
}

function pad2(n) {
  return n.toString().padStart(2, "0");
}

function buildIcs({
  title,
  description,
  location,
  startDate,
  startTime,
  durationMin,
}) {
  const d = parseDate(startDate);
  if (!d || !/^\d{2}:\d{2}$/.test(startTime)) return null;
  const [hh, mm] = startTime.split(":").map(Number);
  d.setHours(hh, mm, 0, 0);
  const end = new Date(d.getTime() + durationMin * 60 * 1000);

  const fmt = (date) =>
    `${date.getUTCFullYear()}${pad2(date.getUTCMonth() + 1)}${pad2(
      date.getUTCDate()
    )}T${pad2(date.getUTCHours())}${pad2(date.getUTCMinutes())}00Z`;

  const escape = (s) =>
    String(s || "")
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BarberHub//RU",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@barberhub`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(d)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escape(title)}`,
    `DESCRIPTION:${escape(description)}`,
    `LOCATION:${escape(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadFile(filename, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        <p className="text-white mb-4" style={{ fontSize: "16px" }}>
          Данные записи не найдены
        </p>
        <button
          onClick={() => navigate("/home")}
          className="text-white"
          style={{
            backgroundColor: "#E94560",
            borderRadius: "12px",
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          На главную
        </button>
      </div>
    );
  }

  const shopName = bookingData.shopName || "";
  const shopAddress = bookingData.shopAddress || "";
  const serviceName =
    bookingData.serviceName ||
    bookingData.service?.shortName ||
    bookingData.service?.name ||
    "";
  const rawDate = bookingData.date || "";
  const time = bookingData.time || "";
  const duration =
    bookingData.duration ?? bookingData.service?.duration ?? 30;
  const price = bookingData.price ?? bookingData.service?.price ?? 0;

  const dateShort = formatDateShort(rawDate);
  const dateAccusative = formatDateAccusative(rawDate);
  const dateTime = time ? `${dateShort} · ${time}` : dateShort;

  const subtitle = dateAccusative
    ? `Ждём тебя ${dateAccusative} в ${time} в ${shopName}`
    : `Ждём тебя ${shopName ? `в ${shopName}` : ""}`.trim();

  async function handleAddToCalendar() {
    const ics = buildIcs({
      title: `Запись: ${serviceName}`,
      description: `Барбершоп: ${shopName}. Услуга: ${serviceName}.`,
      location: shopAddress || shopName,
      startDate: rawDate,
      startTime: time,
      durationMin: duration,
    });

    if (!ics) {
      alert("Не удалось сформировать файл календаря");
      return;
    }

    downloadFile("booking.ics", ics, "text/calendar;charset=utf-8");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="w-full"
        style={{
          maxWidth: "420px",
          backgroundColor: "#1E2A3A",
          borderRadius: "20px",
          padding: "40px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "#E94560",
            marginBottom: "24px",
            boxShadow: "0 0 40px rgba(233, 69, 96, 0.35)",
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h1
          className="text-white text-center"
          style={{
            fontSize: "22px",
            fontWeight: 700,
            marginBottom: "8px",
          }}
        >
          Запись подтверждена! 🎉
        </h1>

        <p
          className="text-center"
          style={{
            fontSize: "14px",
            color: "#A8B2C1",
            marginBottom: "24px",
          }}
        >
          {subtitle}
        </p>

        <div style={{ width: "100%", marginBottom: "20px" }}>
          <SuccessCard
            shopName={shopName}
            dateTime={dateTime}
            serviceName={serviceName}
            price={formatPrice(price)}
          />
        </div>

        <button
          type="button"
          onClick={handleAddToCalendar}
          className="text-white"
          style={{
            width: "100%",
            backgroundColor: "#E94560",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "15px",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
            marginBottom: "12px",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c73652";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#E94560";
          }}
        >
          📅 Добавить в календарь
        </button>

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="text-white"
          style={{
            width: "100%",
            backgroundColor: "#16213E",
            borderRadius: "12px",
            padding: "14px",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          На главную
        </button>
      </div>
    </div>
  );
}

export default BookingSuccessPage;
