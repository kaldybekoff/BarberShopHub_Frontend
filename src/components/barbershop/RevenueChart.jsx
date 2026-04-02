import colors from "../../styles/colors";

function RevenueChart({ revenueData }) {
  const maxAmount = Math.max(...revenueData.map((d) => d.amount));

  return (
    <div
      className="rounded-2xl p-5"
      style={{ backgroundColor: colors.light }}
    >
      <h2 className="text-white font-semibold text-base mb-4">
        Выручка за 7 дней
      </h2>

      <div className="flex items-end gap-3 h-36">
        {revenueData.map((item) => {
          const heightPercent = Math.round((item.amount / maxAmount) * 100);

          return (
            <div key={item.day} className="flex flex-col items-center flex-1 gap-1">
              <span className="text-xs" style={{ color: colors.gray }}>
                {(item.amount / 1000).toFixed(0)}k
              </span>
              <div className="w-full rounded-t-md" style={{
                height: `${heightPercent}%`,
                backgroundColor: colors.accent,
                minHeight: "4px",
              }} />
              <span className="text-xs" style={{ color: colors.gray }}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RevenueChart;
