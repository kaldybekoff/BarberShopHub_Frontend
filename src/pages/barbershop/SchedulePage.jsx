import { useState, useEffect } from "react";
import ScheduleCalendar from "../../components/barbershop/ScheduleCalendar";
import ScheduleSlot from "../../components/barbershop/ScheduleSlot";
import { getCalendar } from "../../api/dashboardApi";

const views = ["День", "Неделя", "Месяц"];
const weekdayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
const MONTH_NAMES = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const DOW_SHORT = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

function getMondayOfCurrentWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  const dow = d.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  d.setDate(d.getDate() + diff);
  return d;
}

function buildWeekDays() {
  const monday = getMondayOfCurrentWeek();
  return weekdayLabels.map((label, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    return {
      label,
      number: date.getDate(),
      key: date.toISOString().slice(0, 10),
    };
  });
}

function formatTime(isoString) {
  if (!isoString) return "";
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return "";
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function formatPrice(value) {
  return value != null ? `${Number(value).toLocaleString("ru-RU")}₸` : "";
}

function mapBookingToSlot(b) {
  return {
    time: formatTime(b.scheduled_at),
    type: "booked",
    clientName: b.client_name,
    service: formatPrice(b.total_price),
    master: b.barber_name,
    duration: "",
    status: b.status,
    totalPrice: b.total_price,
  };
}

// ─── DAY VIEW ───────────────────────────────────────────────────────────────
function DayView({ days }) {
  const todayKey = new Date().toISOString().slice(0, 10);
  const defaultDay = days.find((d) => d.key === todayKey) || days[days.length - 2] || days[0];
  const [selectedDate, setSelectedDate] = useState(defaultDay);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCalendar(selectedDate.key, selectedDate.key)
      .then((data) => {
        const dayData = (data?.days ?? []).find((d) => d.date === selectedDate.key);
        setSlots((dayData?.bookings ?? []).map(mapBookingToSlot));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  return (
    <>
      <ScheduleCalendar days={days} selectedKey={selectedDate.key} onSelect={setSelectedDate} />
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "24px" }}>
        {loading ? (
          <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Загрузка...</p>
        ) : slots.length === 0 ? (
          <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Нет слотов на этот день</p>
        ) : (
          slots.map((slot, i) => <ScheduleSlot key={i} slot={slot} />)
        )}
      </div>
    </>
  );
}

// ─── WEEK VIEW ───────────────────────────────────────────────────────────────
function WeekView({ days }) {
  const [weekData, setWeekData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const from = days[0].key;
    const to = days[days.length - 1].key;
    setLoading(true);
    getCalendar(from, to)
      .then((data) => {
        const map = {};
        (data?.days ?? []).forEach((d) => {
          map[d.date] = (d.bookings ?? []).map(mapBookingToSlot);
        });
        setWeekData(map);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [days]);

  const todayKey = new Date().toISOString().slice(0, 10);

  if (loading) return <p style={{ color: "#A8B2C1", fontSize: "14px", marginTop: "24px" }}>Загрузка...</p>;

  return (
    <div style={{ marginTop: "24px", overflowX: "auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${days.length}, minmax(140px, 1fr))`, gap: "10px", minWidth: "700px" }}>
        {days.map((day) => {
          const isToday = day.key === todayKey;
          const daySlots = weekData[day.key] ?? [];

          return (
            <div key={day.key}>
              {/* Day header */}
              <div
                style={{
                  backgroundColor: isToday ? "#E94560" : "#1E2A3A",
                  borderRadius: "10px",
                  padding: "10px",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                <div style={{ color: isToday ? "#fff" : "#A8B2C1", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {day.label}
                </div>
                <div style={{ color: "#fff", fontSize: "20px", fontWeight: 700, lineHeight: 1.2, marginTop: "2px" }}>
                  {day.number}
                </div>
              </div>

              {/* Bookings */}
              {daySlots.length === 0 ? (
                <div style={{ color: "#A8B2C1", fontSize: "12px", textAlign: "center", padding: "12px 0" }}>
                  —
                </div>
              ) : (
                daySlots.map((slot, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: slot.status === "confirmed" ? "rgba(72,187,120,0.1)" : "rgba(233,69,96,0.1)",
                      borderLeft: `3px solid ${slot.status === "confirmed" ? "#48BB78" : "#F6AD55"}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ color: "#A8B2C1", fontSize: "11px", fontWeight: 600, marginBottom: "3px" }}>
                      {slot.time}
                    </div>
                    <div className="text-white" style={{ fontSize: "13px", fontWeight: 600 }}>
                      {slot.clientName}
                    </div>
                    <div style={{ color: "#A8B2C1", fontSize: "11px", marginTop: "2px" }}>
                      {slot.master}
                    </div>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MONTH VIEW ──────────────────────────────────────────────────────────────
function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Start from Monday of first week
  const startDow = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d);
    cells.push({ date, key: date.toISOString().slice(0, 10), number: d });
  }
  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function MonthView({ onSelectDay }) {
  const today = new Date();
  const [year] = useState(today.getFullYear());
  const [month] = useState(today.getMonth());
  const [monthData, setMonthData] = useState({});
  const [loading, setLoading] = useState(true);

  const cells = buildMonthGrid(year, month);
  const todayKey = today.toISOString().slice(0, 10);

  useEffect(() => {
    const firstDay = new Date(year, month, 1).toISOString().slice(0, 10);
    const lastDay = new Date(year, month + 1, 0).toISOString().slice(0, 10);
    setLoading(true);
    getCalendar(firstDay, lastDay)
      .then((data) => {
        const map = {};
        (data?.days ?? []).forEach((d) => {
          map[d.date] = d.bookings?.length ?? 0;
        });
        setMonthData(map);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [year, month]);

  return (
    <div style={{ marginTop: "24px" }}>
      <h2 className="text-white" style={{ fontSize: "16px", fontWeight: 700, marginBottom: "16px" }}>
        {MONTH_NAMES[month]} {year}
      </h2>

      {/* Weekday headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px", marginBottom: "6px" }}>
        {DOW_SHORT.map((d) => (
          <div key={d} style={{ color: "#A8B2C1", fontSize: "12px", fontWeight: 600, textAlign: "center", padding: "4px 0" }}>
            {d}
          </div>
        ))}
      </div>

      {loading ? (
        <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Загрузка...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "6px" }}>
          {cells.map((cell, i) => {
            if (!cell) return <div key={`empty-${i}`} />;
            const isToday = cell.key === todayKey;
            const count = monthData[cell.key] ?? 0;
            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => onSelectDay(cell)}
                style={{
                  backgroundColor: isToday ? "#E94560" : "#1E2A3A",
                  borderRadius: "10px",
                  padding: "10px 4px",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "center",
                  position: "relative",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => { if (!isToday) e.currentTarget.style.backgroundColor = "#2a3a4a"; }}
                onMouseLeave={(e) => { if (!isToday) e.currentTarget.style.backgroundColor = "#1E2A3A"; }}
              >
                <div style={{ color: "#fff", fontSize: "15px", fontWeight: isToday ? 700 : 500 }}>
                  {cell.number}
                </div>
                {count > 0 && (
                  <div style={{ marginTop: "4px", display: "flex", justifyContent: "center", gap: "3px" }}>
                    {[...Array(Math.min(count, 3))].map((_, idx) => (
                      <span
                        key={idx}
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          backgroundColor: isToday ? "#fff" : "#E94560",
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
function SchedulePage() {
  const [days] = useState(buildWeekDays);
  const [activeView, setActiveView] = useState("День");

  function handleMonthDaySelect(cell) {
    // When clicking a month day → switch to day view and highlight that day
    // Find or create a day object matching the clicked date
    setActiveView("День");
  }

  return (
    <div style={{ backgroundColor: "#1A1A2E", padding: "32px", minHeight: "100vh" }}>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}
      >
        <h1 className="text-white" style={{ fontSize: "26px", fontWeight: 700 }}>
          Расписание
        </h1>

        <div className="flex items-center" style={{ gap: "8px" }}>
          {views.map((view) => {
            const isActive = view === activeView;
            return (
              <button
                key={view}
                type="button"
                onClick={() => setActiveView(view)}
                style={{
                  backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                  color: isActive ? "#ffffff" : "#A8B2C1",
                  padding: "8px 18px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                {view}
              </button>
            );
          })}
        </div>
      </div>

      {activeView === "День" && <DayView days={days} />}
      {activeView === "Неделя" && <WeekView days={days} />}
      {activeView === "Месяц" && <MonthView onSelectDay={handleMonthDaySelect} />}
    </div>
  );
}

export default SchedulePage;
