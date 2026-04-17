import colors from "../../constants/colors";

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

function ScheduleCalendar({ selectedDay, onDaySelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 lg:grid lg:grid-cols-7 lg:gap-2 lg:overflow-visible">
      {weekDays.map((day) => {
        const isActive = day === selectedDay;

        return (
          <button
            key={day}
            onClick={() => onDaySelect(day)}
            className="shrink-0 w-12 h-12 lg:w-full rounded-xl text-sm font-semibold transition-colors"
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
