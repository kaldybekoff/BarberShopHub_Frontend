import getStatusLabel from "../../utils/getStatusLabel";
import { CalendarDays, Clock3 } from "lucide-react";
import colors from "../../constants/colors";

function AppointmentCard({ appointment, onCancel }) {
  const status = getStatusLabel(appointment.status);
  const isCancelled = appointment.status === "cancelled";

  const initials = appointment.masterName
    ? appointment.masterName.split(" ").map((w) => w[0]).join("").slice(0, 2)
    : "?";

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: colors.dark }}
    >
      {/* шапка */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{ backgroundColor: colors.light }}
      >
        <h3 className="font-semibold text-white text-sm">{appointment.shopName}</h3>
        <span
          className="text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `${status.color}20`,
            color: status.color,
          }}
        >
          {status.label}
        </span>
      </div>

      {/* тело карточки */}
      <div className="px-5 py-4 flex flex-col gap-3">

        {/* мастер + услуга */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ backgroundColor: colors.accent }}
          >
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium text-white">{appointment.masterName}</p>
            <p className="text-xs mt-0.5" style={{ color: colors.gray }}>
              {appointment.serviceName}
            </p>
          </div>
        </div>

        <div
          className="h-px"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />

        {/* дата + время + цена */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 flex-wrap min-w-0">
            <span className="text-sm text-white">
              <span className="inline-flex items-center gap-1">
                <CalendarDays size={14} />
                {appointment.date}
              </span>
            </span>
            <span className="text-sm text-white">
              <span className="inline-flex items-center gap-1">
                <Clock3 size={14} />
                {appointment.time}
              </span>
            </span>
          </div>
          <span className="text-sm font-bold shrink-0" style={{ color: colors.accent }}>
            {appointment.price?.toLocaleString("ru-RU")}₸
          </span>
        </div>

        {/* кнопки действий */}
        {!isCancelled && (
          <div className="flex gap-2 mt-1">
            <button
              className="flex-1 py-2 rounded-xl text-sm border transition-colors hover:text-white"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                color: colors.gray,
                backgroundColor: "transparent",
              }}
            >
              Перенести
            </button>
            {onCancel && (
              <button
                onClick={() => onCancel(appointment.id)}
                className="flex-1 py-2 rounded-xl text-sm border transition-colors hover:text-red-400"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  color: colors.gray,
                  backgroundColor: "transparent",
                }}
              >
                Отменить
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentCard;
