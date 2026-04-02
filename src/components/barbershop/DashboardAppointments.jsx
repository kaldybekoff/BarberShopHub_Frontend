import getStatusLabel from "../../utils/getStatusLabel";
import colors from "../../styles/colors";

function DashboardAppointments({ appointmentList }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: colors.light }}
    >
      <h2 className="text-white font-semibold text-base mb-4">
        Ближайшие записи
      </h2>

      <div className="flex flex-col gap-3">
        {appointmentList.map((appointment) => {
          const { label: statusLabel, color: statusColor } = getStatusLabel(appointment.status);

          return (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{ backgroundColor: colors.dark }}
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-white text-sm font-medium">
                  {appointment.clientName}
                </span>
                <span className="text-xs" style={{ color: colors.gray }}>
                  {appointment.service} · {appointment.barber}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-white text-sm font-semibold">
                  {appointment.time}
                </span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    color: statusColor,
                    backgroundColor: `${statusColor}20`,
                  }}
                >
                  {statusLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardAppointments;
