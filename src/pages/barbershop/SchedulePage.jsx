import { useState, useEffect } from "react";
import ScheduleCalendar from "../../components/barbershop/ScheduleCalendar";
import ScheduleSlot from "../../components/barbershop/ScheduleSlot";
import { getSchedule } from "../../api/dashboardApi";

const views = ["День", "Неделя", "Месяц"];
const weekdayLabels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

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

function mapSlot(s) {
  if (s.type === "free") return { time: s.time, type: "free" };
  return {
    time: s.time,
    type: "booked",
    clientName: s.client_name,
    service: s.service,
    master: s.barber_name,
    duration: s.duration_minutes ? `${s.duration_minutes} мин` : "",
    status: s.status,
  };
}

function SchedulePage() {
  const [days] = useState(buildWeekDays);
  const [activeView, setActiveView] = useState("День");
  const todayKey = new Date().toISOString().slice(0, 10);
  const defaultDay = days.find((d) => d.key === todayKey) || days[days.length - 2] || days[0];
  const [selectedDate, setSelectedDate] = useState(defaultDay);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSchedule(selectedDate.key, selectedDate.key)
      .then((data) => {
        const dayData = Array.isArray(data)
          ? data.find((d) => d.date === selectedDate.key)
          : null;
        setSlots((dayData?.slots ?? []).map(mapSlot));
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [selectedDate]);

  function handleAddSlotClick() {
    console.log("add slot");
  }

  function handleAddAppointmentClick() {
    console.log("add appointment");
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "32px",
        minHeight: "100vh",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}
      >
        <h1 className="text-white" style={{ fontSize: "26px", fontWeight: 700 }}>
          Расписание
        </h1>

        <div className="flex items-center" style={{ gap: "8px", flexWrap: "wrap" }}>
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

          <button
            type="button"
            onClick={handleAddSlotClick}
            aria-label="Добавить слот"
            className="text-white"
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
              fontSize: "20px",
              fontWeight: 500,
              border: "none",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            +
          </button>
        </div>
      </div>

      <ScheduleCalendar
        days={days}
        selectedKey={selectedDate.key}
        onSelect={setSelectedDate}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "24px",
        }}
      >
        {loading ? (
          <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Загрузка...</p>
        ) : slots.length === 0 ? (
          <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Нет слотов на этот день</p>
        ) : (
          slots.map((slot, i) => <ScheduleSlot key={i} slot={slot} />)
        )}
      </div>

      <button
        type="button"
        onClick={handleAddAppointmentClick}
        aria-label="Добавить запись"
        className="text-white"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "#E94560",
          fontSize: "24px",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(233,69,96,0.4)",
          lineHeight: 1,
          zIndex: 20,
        }}
      >
        +
      </button>
    </div>
  );
}

export default SchedulePage;
