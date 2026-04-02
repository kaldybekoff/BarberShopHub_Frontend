import colors from "../../styles/colors";

function ScheduleSlot({ slotItem }) {
  const isFree = slotItem.status === "free";
  const isConfirmed = slotItem.status === "confirmed";

  const statusLabel = isConfirmed ? "Подтверждено" : isFree ? null : "Ожидает";
  const statusColor = isConfirmed ? colors.success : colors.warning;

  return (
    <div
      className="flex items-center justify-between rounded-xl px-4 py-3"
      style={{ backgroundColor: colors.light }}
    >
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold w-12" style={{ color: colors.gray }}>
          {slotItem.time}
        </span>

        {isFree ? (
          <span className="text-sm" style={{ color: colors.gray }}>
            Свободно
          </span>
        ) : (
          <div className="flex flex-col gap-0.5">
            <span className="text-white text-sm font-medium">
              {slotItem.clientName}
            </span>
            <span className="text-xs" style={{ color: colors.gray }}>
              {slotItem.service} · {slotItem.barber}
            </span>
          </div>
        )}
      </div>

      {!isFree && (
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{
            color: statusColor,
            backgroundColor: `${statusColor}20`,
          }}
        >
          {statusLabel}
        </span>
      )}
    </div>
  );
}

export default ScheduleSlot;
