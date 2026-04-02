import colors from "../../styles/colors";

const roleLabel = { user: "Клиент", barbershop: "Барбершоп", admin: "Админ" };

const statusConfig = {
  active: { label: "Активен", color: colors.success },
  blocked: { label: "Заблокирован", color: colors.accent },
  pending: { label: "Ожидает", color: colors.warning },
};

function UsersTable({ userList }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: colors.light }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: colors.dark }}>
        <h2 className="text-white font-semibold text-base">Пользователи</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.dark}` }}>
              {["Имя", "Телефон", "Дата", "Роль", "Статус"].map((col) => (
                <th
                  key={col}
                  className="text-left px-5 py-3 font-medium"
                  style={{ color: colors.gray }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              const status = statusConfig[user.status];
              const isLast = index === userList.length - 1;
              return (
                <tr
                  key={user.id}
                  style={isLast ? {} : { borderBottom: `1px solid ${colors.dark}` }}
                >
                  <td className="px-5 py-3 text-white">{user.name}</td>
                  <td className="px-5 py-3" style={{ color: colors.gray }}>{user.phone}</td>
                  <td className="px-5 py-3" style={{ color: colors.gray }}>{user.registeredAt}</td>
                  <td className="px-5 py-3" style={{ color: colors.gray }}>{roleLabel[user.role]}</td>
                  <td className="px-5 py-3">
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

export default UsersTable;
