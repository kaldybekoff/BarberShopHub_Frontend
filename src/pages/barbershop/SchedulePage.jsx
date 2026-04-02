import { useState } from "react";
import { scheduleData } from "../../data/mockDashboardStats";
import ScheduleCalendar from "../../components/barbershop/ScheduleCalendar";
import ScheduleSlot from "../../components/barbershop/ScheduleSlot";
import colors from "../../styles/colors";

const tabs = ["День", "Неделя"];

function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Пн");
  const [activeTab, setActiveTab] = useState("День");

  const scheduleSlots = scheduleData[selectedDay] || [];

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Расписание</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Управляйте слотами по дням
        </p>
      </div>

      {/* Табы День / Неделя */}
      <div
        className="flex gap-1 rounded-xl p-1 mb-5 w-fit"
        style={{ backgroundColor: colors.light }}
      >
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-5 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? colors.accent : "transparent",
                color: isActive ? "#ffffff" : colors.gray,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Выбор дня */}
      <div className="mb-5">
        <ScheduleCalendar selectedDay={selectedDay} onDaySelect={setSelectedDay} />
      </div>

      {/* Слоты */}
      <div className="flex flex-col gap-3">
        {scheduleSlots.map((slotItem) => (
          <ScheduleSlot key={slotItem.id} slotItem={slotItem} />
        ))}
      </div>

      {/* Кнопка добавить слот */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white text-2xl font-bold shadow-lg flex items-center justify-center"
        style={{ backgroundColor: colors.accent }}
      >
        +
      </button>
    </div>
  );
}

export default SchedulePage;
