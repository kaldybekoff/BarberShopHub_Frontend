import colors from "../constants/colors";

const statusMap = {
  confirmed: { label: "Confirmed", color: colors.success },
  pending:   { label: "Pending",      color: colors.warning },
  cancelled: { label: "Cancelled",     color: colors.accent },
  completed: { label: "Completed",    color: colors.gray },
};

function getStatusLabel(status) {
  return statusMap[status] || { label: status, color: colors.gray };
}

export default getStatusLabel;
