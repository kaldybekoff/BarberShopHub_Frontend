import colors from "../../styles/colors";

function StatsCard({ label, value, icon }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2"
      style={{ backgroundColor: colors.dark }}
    >
      <div className="text-xl">{icon}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
      <div className="text-xs" style={{ color: colors.gray }}>
        {label}
      </div>
    </div>
  );
}

export default StatsCard;
