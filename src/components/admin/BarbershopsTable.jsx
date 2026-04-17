import colors from "../../constants/colors";

const statusConfig = {
  active: { label: "Активен", color: colors.success },
  blocked: { label: "Заблокирован", color: colors.accent },
  pending: { label: "Ожидает", color: colors.warning },
};

function BarbershopsTable({ barbershopList }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: colors.dark }}>
        <h2 className="text-white font-semibold text-base">Барбершопы</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm table-fixed min-w-[820px]">
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.dark}` }}>
              {["Название", "Адрес", "Рейтинг", "Статус"].map((col) => (
                <th
                  key={col}
                  className="text-left px-4 py-2.5 font-medium text-xs uppercase tracking-wide"
                  style={{ color: colors.gray }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {barbershopList.map((shop, index) => {
              const status = statusConfig[shop.status];
              const isLast = index === barbershopList.length - 1;
              return (
                <tr
                  key={shop.id}
                  style={isLast ? {} : { borderBottom: `1px solid ${colors.dark}` }}
                >
                  <td className="px-4 py-2.5 text-white font-medium truncate">{shop.name}</td>
                  <td className="px-4 py-2.5 truncate" style={{ color: colors.gray }}>{shop.address}</td>
                  <td className="px-4 py-2.5" style={{ color: colors.gold }}>★ {shop.rating}</td>
                  <td className="px-4 py-2.5">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded-full"
                      style={{ color: status.color, backgroundColor: `${status.color}20` }}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BarbershopsTable;
