import colors from "../../styles/colors";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function ScheduleCalendar({ selectedDay, onDaySelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {weekDays.map((day) => {
        const isActive = day === selectedDay;

        return (
          <button
            key={day}
            onClick={() => onDaySelect(day)}
            className="shrink-0 w-12 h-12 rounded-xl text-sm font-semibold transition-colors"
            style={{
              backgroundColor: isActive ? colors.accent : colors.light,
              color: isActive ? "#ffffff" : colors.gray,
            }}
          >
            {day}
          </button>
        );
      })}
    </div>
  );
}

export default ScheduleCalendar;
