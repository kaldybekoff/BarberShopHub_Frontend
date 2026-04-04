import getStatusLabel from "../../utils/getStatusLabel";
import formatPrice from "../../utils/formatPrice";
import colors from "../../styles/colors";

function AppointmentCard({ appointment, onCancel }) {
  const status = getStatusLabel(appointment.status);
  const isCancelled = appointment.status === "cancelled";

  return (
    <div
      className="rounded-2xl p-4 flex flex-col gap-3"
      style={{ backgroundColor: colors.dark }}>

      {/* шапка: название и статус */}
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-white text-base">{appointment.shopName}</h3>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{ backgroundColor: `${status.color}20`, color: status.color }}>
          {status.label}
        </span>
      </div>

      {/* детали */}
      <div className="flex flex-col gap-1">
        <p className="text-sm" style={{ color: colors.gray }}>
          {appointment.serviceName} · {appointment.masterName}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-sm text-white">
            {appointment.date} в {appointment.time}
          </p>
          <span className="text-sm font-semibold text-white">
            {formatPrice(appointment.price)}
          </span>
        </div>
      </div>

      {/* кнопка отмены — только если не отменено */}
      {!isCancelled && onCancel && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onCancel(appointment.id)}
            className="flex-1 py-2 rounded-xl text-sm font-medium border"
            style={{ borderColor: colors.accent, color: colors.accent }}>
            Отменить
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
