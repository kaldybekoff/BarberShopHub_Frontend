import colors from "../../constants/colors";
import { CalendarDays, Wallet, UserRound, BarChart3, Users, Scissors, MessageSquare } from "lucide-react";

const iconMap = {
  calendar: CalendarDays,
  money: Wallet,
  user: UserRound,
  chart: BarChart3,
  users: Users,
  scissors: Scissors,
  message: MessageSquare,
};

function StatsCard({ label, value, icon }) {
  const Icon = iconMap[icon];

  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2"
      style={{ backgroundColor: colors.dark }}
    >
      <div style={{ color: colors.accent }}>{Icon ? <Icon size={20} /> : null}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-xs" style={{ color: colors.gray }}>
        {label}
      </div>
    </div>
  );
}

export default StatsCard;
