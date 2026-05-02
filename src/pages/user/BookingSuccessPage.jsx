import { useLocation, useNavigate } from "react-router-dom";
import SuccessCard from "../../components/booking/SuccessCard";

const dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayNamesLong = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthsShort = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const monthsLong = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
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

function formatDateLongPhrase(dateInput) {
  const d = parseDate(dateInput);
  if (!d) return "";
  return `on ${dayNamesLong[d.getDay()]}, ${monthsLong[d.getMonth()]} ${d.getDate()}`;
}

function formatPrice(value) {
  if (value == null) return "";
  return `${Number(value).toLocaleString("en-US")}₸`;
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
          Booking details not found
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
          Back to home
        </button>
      </div>
    );
  }

  const shopName = bookingData.shopName || "";
  const serviceName =
    bookingData.serviceName ||
    bookingData.service?.shortName ||
    bookingData.service?.name ||
    "";
  const rawDate = bookingData.date || "";
  const time = bookingData.time || "";
  const price = bookingData.price ?? bookingData.service?.price ?? 0;

  const dateShort = formatDateShort(rawDate);
  const dateLongPhrase = formatDateLongPhrase(rawDate);
  const dateTime = time ? `${dateShort} · ${time}` : dateShort;

  const subtitle =
    dateLongPhrase && time && shopName
      ? `We look forward to seeing you ${dateLongPhrase} at ${time} at ${shopName}.`
      : dateLongPhrase && time
        ? `We look forward to seeing you ${dateLongPhrase} at ${time}.`
        : shopName
          ? `We look forward to seeing you at ${shopName}.`
          : "";

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
          Booking confirmed! 🎉
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
          onClick={() => navigate("/home")}
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
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c73652";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#E94560";
          }}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccessPage;
