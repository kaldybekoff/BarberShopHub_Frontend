import { useState, useEffect, useCallback } from "react";
import AppointmentCard from "../../components/appointments/AppointmentCard";
import { getMyAppointments } from "../../api/appointmentApi";

function mapBooking(b) {
  const dt = new Date(b.scheduled_at);
  const barberName = b.barber_name ?? "—";
  const initials = barberName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return {
    id: b.id,
    shop: b.barbershop_name ?? "—",
    master: barberName,
    masterInitials: initials,
    service: b.service_name ?? b.services?.[0]?.name ?? "—",
    date: dt.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
    time: dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    price: b.total_price ?? 0,
    status: b.status,
  };
}

function MyAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [upcoming, setUpcoming] = useState([]);
  const [upcomingPage, setUpcomingPage] = useState(1);
  const [upcomingHasMore, setUpcomingHasMore] = useState(false);
  const [upcomingLoading, setUpcomingLoading] = useState(false);

  const [past, setPast] = useState([]);
  const [pastPage, setPastPage] = useState(1);
  const [pastHasMore, setPastHasMore] = useState(false);
  const [pastLoading, setPastLoading] = useState(false);

  const [initialLoading, setInitialLoading] = useState(true);

  const loadTab = useCallback(async (filter, page, append) => {
    const setter = filter === "upcoming" ? setUpcoming : setPast;
    const loadingSetter = filter === "upcoming" ? setUpcomingLoading : setPastLoading;
    const hasMoreSetter = filter === "upcoming" ? setUpcomingHasMore : setPastHasMore;

    loadingSetter(true);
    try {
      const { data, meta } = await getMyAppointments(filter, page);
      const mapped = data.map(mapBooking);
      setter((prev) => (append ? [...prev, ...mapped] : mapped));
      hasMoreSetter(meta.current_page < meta.last_page);
    } catch (e) {
      console.error(e);
    } finally {
      loadingSetter(false);
    }
  }, []);

  useEffect(() => {
    Promise.all([
      getMyAppointments("upcoming", 1),
      getMyAppointments("past", 1),
    ])
      .then(([upRes, pastRes]) => {
        setUpcoming(upRes.data.map(mapBooking));
        setUpcomingHasMore(upRes.meta.current_page < upRes.meta.last_page);
        setPast(pastRes.data.map(mapBooking));
        setPastHasMore(pastRes.meta.current_page < pastRes.meta.last_page);
      })
      .catch((e) => console.error(e))
      .finally(() => setInitialLoading(false));
  }, []);

  function handleLoadMoreUpcoming() {
    const next = upcomingPage + 1;
    setUpcomingPage(next);
    loadTab("upcoming", next, true);
  }

  function handleLoadMorePast() {
    const next = pastPage + 1;
    setPastPage(next);
    loadTab("past", next, true);
  }

  function handleCancelled(id) {
    setUpcoming((list) => list.filter((a) => a.id !== id));
  }

  function handleRescheduled(id, isoDateTime) {
    setUpcoming((list) =>
      list.map((a) => {
        if (a.id !== id) return a;
        const dt = new Date(isoDateTime);
        return {
          ...a,
          date: dt.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric" }),
          time: dt.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
          status: "pending",
        };
      })
    );
  }

  return (
    <div className="min-h-full font-['Plus_Jakarta_Sans',system-ui]" style={{ backgroundColor: "#1A1A2E" }}>
      <div className="mx-auto" style={{ maxWidth: "980px", padding: "28px 24px 48px" }}>
        <h1 className="text-white" style={{ fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}>
          Мои записи
        </h1>

        <div
          className="flex"
          style={{
            backgroundColor: "#16213E",
            borderRadius: "12px",
            padding: "4px",
            width: "fit-content",
            marginBottom: "20px",
          }}
        >
          <TabButton label="Предстоящие" active={activeTab === "upcoming"} onClick={() => setActiveTab("upcoming")} />
          <TabButton label="Прошедшие" active={activeTab === "past"} onClick={() => setActiveTab("past")} />
        </div>

        {initialLoading ? (
          <div className="flex items-center justify-center" style={{ backgroundColor: "#1E2A3A", borderRadius: "16px", padding: "40px 20px", color: "#A8B2C1", fontSize: "14px" }}>
            Загрузка...
          </div>
        ) : activeTab === "upcoming" ? (
          <UpcomingSection
            items={upcoming}
            hasMore={upcomingHasMore}
            loading={upcomingLoading}
            onLoadMore={handleLoadMoreUpcoming}
            onCancelled={handleCancelled}
            onRescheduled={handleRescheduled}
          />
        ) : (
          <PastSection
            items={past}
            hasMore={pastHasMore}
            loading={pastLoading}
            onLoadMore={handleLoadMorePast}
          />
        )}
      </div>
    </div>
  );
}

function TabButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        backgroundColor: active ? "#E94560" : "transparent",
        color: active ? "#ffffff" : "#A8B2C1",
        borderRadius: "9px",
        padding: "9px 28px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
      }}
    >
      {label}
    </button>
  );
}

function SectionLabel({ title, count }) {
  return (
    <p style={{ color: "#A8B2C1", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "12px" }}>
      {title} · {count}
    </p>
  );
}

function LoadMoreButton({ onClick, loading }) {
  return (
    <div style={{ textAlign: "center", marginTop: "16px" }}>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        style={{
          backgroundColor: "#1E2A3A",
          border: "1px solid rgba(255,255,255,0.1)",
          color: loading ? "#A8B2C1" : "#ffffff",
          borderRadius: "10px",
          padding: "10px 28px",
          fontSize: "14px",
          fontWeight: 600,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Загрузка..." : "Загрузить ещё"}
      </button>
    </div>
  );
}

function UpcomingSection({ items, hasMore, loading, onLoadMore, onCancelled, onRescheduled }) {
  if (items.length === 0) {
    return (
      <>
        <SectionLabel title="Предстоящие" count={0} />
        <EmptyState text="Предстоящих записей нет" />
      </>
    );
  }

  return (
    <>
      <SectionLabel title="Предстоящие" count={items.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: "16px" }}>
        {items.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            onCancelled={onCancelled}
            onRescheduled={onRescheduled}
          />
        ))}
      </div>
      {hasMore && <LoadMoreButton onClick={onLoadMore} loading={loading} />}
    </>
  );
}

function PastSection({ items, hasMore, loading, onLoadMore }) {
  if (items.length === 0) {
    return (
      <>
        <SectionLabel title="Прошедшие" count={0} />
        <EmptyState text="История записей пуста" />
      </>
    );
  }

  return (
    <>
      <SectionLabel title="Прошедшие" count={items.length} />
      <div>
        {items.map((appointment) => (
          <PastAppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </div>
      {hasMore && <LoadMoreButton onClick={onLoadMore} loading={loading} />}
    </>
  );
}

function PastAppointmentRow({ appointment }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ backgroundColor: "#1E2A3A", borderRadius: "16px", padding: "16px", marginBottom: "10px", opacity: 0.75 }}
    >
      <div className="flex items-center" style={{ gap: "14px" }}>
        <div
          className="flex items-center justify-center shrink-0"
          style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#2a3a4a", color: "#A8B2C1", fontSize: "13px", fontWeight: 700 }}
        >
          {appointment.masterInitials}
        </div>
        <div>
          <p className="text-white" style={{ fontWeight: 700, fontSize: "14px" }}>
            {appointment.shop}
          </p>
          <p style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
            {appointment.service} · {appointment.master} · {appointment.date}, {appointment.time}
          </p>
        </div>
      </div>

      <span style={{ color: "#A8B2C1", fontWeight: 700, fontSize: "14px" }}>
        {Number(appointment.price).toLocaleString("ru-RU")}₸
      </span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex items-center justify-center" style={{ backgroundColor: "#1E2A3A", borderRadius: "16px", padding: "40px 20px", fontSize: "14px", color: "#A8B2C1" }}>
      {text}
    </div>
  );
}

export default MyAppointmentsPage;
