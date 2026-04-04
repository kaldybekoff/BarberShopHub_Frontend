import getStatusLabel from "../../utils/getStatusLabel";
import formatPrice from "../../utils/formatPrice";
import colors from "../../styles/colors";

function AppointmentCard({ appointment, onCancel }) {
  const status = getStatusLabel(appointment.status);
  const isCancelled = appointment.status === "cancelled";

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
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
        <div className="flex justify-end mt-1">
          <button
            onClick={() => onCancel(appointment.id)}
            className="px-4 py-1.5 rounded-lg text-sm border hover:text-red-400 transition-colors"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: colors.gray }}>
            Отменить
          </button>
        </div>
      )}
    </div>
  );
}

export default AppointmentCard;
