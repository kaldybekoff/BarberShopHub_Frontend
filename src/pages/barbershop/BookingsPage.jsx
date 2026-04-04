import { useState, useEffect } from "react";
import { getBookings } from "../../api/dashboardApi";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
import colors from "../../styles/colors";

const tabs = ["Все", "Ожидает", "Подтверждено", "Отменено"];

const statusMap = {
  confirmed: { label: "Подтверждено", color: colors.success },
  pending: { label: "Ожидает", color: colors.warning },
  cancelled: { label: "Отменено", color: colors.gray },
};

const tabFilterMap = {
  Все: null,
  Ожидает: "pending",
  Подтверждено: "confirmed",
  Отменено: "cancelled",
};

function BookingsPage() {
  const [activeTab, setActiveTab] = useState("Все");
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getBookings()
      .then((data) => setBookings(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filterValue = tabFilterMap[activeTab];
  const filteredBookings = filterValue
    ? bookings.filter((booking) => booking.status === filterValue)
    : bookings;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.gray }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <SectionTitle title="Записи" subtitle="Управляйте бронированиями" />

      {/* Табы */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? colors.accent : colors.light,
                color: isActive ? "#ffffff" : colors.gray,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filteredBookings.length === 0 ? (
        <EmptyState icon="📭" message="В этой категории пока нет записей." />
      ) : (
        <div className="flex flex-col gap-3">
          {filteredBookings.map((booking) => {
            const statusInfo = statusMap[booking.status];

            return (
              <div
                key={booking.id}
                className="rounded-2xl p-4 flex flex-col gap-3"
                style={{ backgroundColor: colors.light }}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-white font-semibold text-sm">
                    {booking.clientName}
                  </span>
                  <span
                    className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      color: statusInfo.color,
                      backgroundColor: `${statusInfo.color}20`,
                    }}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                <p className="text-sm" style={{ color: colors.gray }}>
                  {booking.service} · {booking.barber}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.gray }}>
                    {booking.date} · {booking.time}
                  </span>
                  <span className="text-white font-bold text-sm">
                    {booking.price.toLocaleString()} ₸
                  </span>
                </div>

                {booking.status === "pending" && (
                  <div className="flex gap-2 pt-1">
                    <Button label="Подтвердить" variant="success" fullWidth />
                    <Button label="Отменить" variant="danger" fullWidth />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
