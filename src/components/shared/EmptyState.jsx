import colors from "../../constants/colors";
import { Search, Scissors, MessageSquare, Inbox } from "lucide-react";

const iconMap = {
  search: Search,
  scissors: Scissors,
  message: MessageSquare,
  inbox: Inbox,
};

function EmptyState({ message, icon }) {
  const Icon = iconMap[icon];

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      {Icon ? <Icon size={34} style={{ color: colors.gray }} /> : null}
      <p className="text-sm font-medium" style={{ color: colors.gray }}>
        {message}
      </p>
    </div>
  );
}

export default EmptyState;
