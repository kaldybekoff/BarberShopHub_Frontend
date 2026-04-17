import { useState, useEffect } from "react";
import { getUsers } from "../../api/adminApi";
import UsersTable from "../../components/admin/UsersTable";
import Input from "../../components/shared/Input";
import EmptyState from "../../components/shared/EmptyState";
import SectionTitle from "../../components/shared/SectionTitle";
import colors from "../../constants/colors";

function UsersPage() {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then((data) => setUserList(data))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredUsers = userList.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.phone.includes(query)
    );
  });

  if (isLoading) {
    return (
      <div className="min-h-full flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.gray }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-full px-4 md:px-6 py-6 max-w-7xl mx-auto"
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
        <EmptyState icon="search" message="Пользователи не найдены. Попробуйте изменить запрос." />
      ) : (
        <UsersTable userList={filteredUsers} />
      )}
    </div>
  );
}

export default UsersPage;
