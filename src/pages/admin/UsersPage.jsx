import { useState } from "react";
import { userList } from "../../data/mockAdminStats";
import UsersTable from "../../components/admin/UsersTable";
import colors from "../../styles/colors";

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = userList.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );
  });

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Пользователи</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Управление пользователями платформы
        </p>
      </div>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по имени или телефону..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm text-white outline-none mb-5"
        style={{
          backgroundColor: colors.light,
          border: `1px solid ${colors.dark}`,
          color: colors.white,
        }}
      />

      {/* Таблица или EmptyState */}
      {filteredUsers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl">🔍</span>
          <p className="text-white font-medium">Пользователи не найдены</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            Попробуйте изменить запрос
          </p>
        </div>
      ) : (
        <UsersTable userList={filteredUsers} />
      )}
    </div>
  );
}

export default UsersPage;
