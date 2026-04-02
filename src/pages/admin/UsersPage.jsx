import { useState } from "react";
import { userList } from "../../data/mockAdminStats";
import UsersTable from "../../components/admin/UsersTable";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
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
      <SectionTitle title="Пользователи" subtitle="Управление пользователями платформы" />

      <div className="mb-5">
        <Input
          placeholder="Поиск по имени или телефону..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState icon="🔍" message="Пользователи не найдены. Попробуйте изменить запрос." />
      ) : (
        <UsersTable userList={filteredUsers} />
      )}
    </div>
  );
}

export default UsersPage;
