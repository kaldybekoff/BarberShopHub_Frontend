import colors from "../../styles/colors";

function StatsCard({ label, value, icon }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-2"
      style={{ backgroundColor: colors.light }}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm" style={{ color: colors.gray }}>
        {label}
      </div>
    </div>
  );
}

export default StatsCard;
