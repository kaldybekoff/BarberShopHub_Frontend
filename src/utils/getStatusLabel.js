import colors from "../constants/colors";

const statusMap = {
  confirmed: { label: "Подтверждено", color: colors.success },
  pending:   { label: "Ожидает",      color: colors.warning },
  cancelled: { label: "Отменено",     color: colors.accent },
  completed: { label: "Завершено",    color: colors.gray },
};

function getStatusLabel(status) {
  return statusMap[status] || { label: status, color: colors.gray };
}

export default getStatusLabel;
