import { useState } from "react";
import { bookingsList } from "../../data/mockDashboardStats";
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

  const filterValue = tabFilterMap[activeTab];
  const filteredBookings = filterValue
    ? bookingsList.filter((booking) => booking.status === filterValue)
    : bookingsList;

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Записи</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Управляйте бронированиями
        </p>
      </div>

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

      {/* Список записей */}
      {filteredBookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl">📭</span>
          <p className="text-white font-medium">Записей нет</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            В этой категории пока ничего нет
          </p>
        </div>
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
                {/* Верх карточки: имя + статус */}
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

                {/* Услуга и мастер */}
                <p className="text-sm" style={{ color: colors.gray }}>
                  {booking.service} · {booking.barber}
                </p>

                {/* Дата, время, цена */}
                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: colors.gray }}>
                    {booking.date} · {booking.time}
                  </span>
                  <span className="text-white font-bold text-sm">
                    {booking.price.toLocaleString()} ₸
                  </span>
                </div>

                {/* Кнопки (только UI) */}
                {booking.status === "pending" && (
                  <div className="flex gap-2 pt-1">
                    <button
                      className="flex-1 py-2 rounded-xl text-sm font-medium text-white"
                      style={{ backgroundColor: colors.success }}
                    >
                      Подтвердить
                    </button>
                    <button
                      className="flex-1 py-2 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: colors.dark,
                        color: colors.gray,
                      }}
                    >
                      Отменить
                    </button>
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
