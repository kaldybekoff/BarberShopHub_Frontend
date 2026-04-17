import { useMemo, useState } from "react";

const mockUsers = [
  { id: 1, name: "Алибек Джаксыбеков", email: "alibek@gmail.com", role: "User", date: "01.03.2026", status: "active" },
  { id: 2, name: "Нурлан Сейткали", email: "nurlan@mail.ru", role: "User", date: "05.03.2026", status: "active" },
  { id: 3, name: "Марат Барбер", email: "marat@barbershop.kz", role: "Barbershop", date: "10.02.2026", status: "active" },
  { id: 4, name: "Темирлан Ахметов", email: "temirlan@gmail.com", role: "User", date: "15.02.2026", status: "blocked" },
  { id: 5, name: "Айгерим Касымова", email: "aigеrim@mail.ru", role: "User", date: "20.01.2026", status: "active" },
  { id: 6, name: "Даниар Омаров", email: "daniyar@gmail.com", role: "Barbershop", date: "25.01.2026", status: "blocked" },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "User", label: "User" },
  { id: "Barbershop", label: "Barbershop" },
  { id: "blocked", label: "Заблокированные" },
];

const avatarPalette = [
  { bg: "rgba(233,69,96,0.2)", color: "#E94560" },
  { bg: "rgba(72,187,120,0.2)", color: "#48BB78" },
  { bg: "rgba(245,166,35,0.2)", color: "#F5A623" },
  { bg: "rgba(168,178,193,0.15)", color: "#A8B2C1" },
];

const roleBadge = {
  User: { bg: "rgba(168,178,193,0.1)", color: "#A8B2C1" },
  Barbershop: { bg: "rgba(245,166,35,0.12)", color: "#F5A623" },
};

const statusBadge = {
  active: { bg: "rgba(72,187,120,0.15)", color: "#48BB78", label: "Активен" },
  blocked: { bg: "rgba(233,69,96,0.12)", color: "#E94560", label: "Заблок." },
};

const getInitials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const COLUMNS = "2.2fr 1.6fr 1fr 0.9fr 1fr";

function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mockUsers
      .filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      )
      .filter((u) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "blocked") return u.status === "blocked";
        return u.role === activeFilter;
      });
  }, [searchQuery, activeFilter]);

  function handleToggleStatus(user) {
    console.log("toggle status", user.id);
  }

  return (
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100%",
      }}
    >
      <div style={{ marginBottom: "24px" }}>
        <h1
          className="text-white"
          style={{ fontSize: "22px", fontWeight: 700, lineHeight: 1.2 }}
        >
          Пользователи
        </h1>
        <p style={{ fontSize: "13px", color: "#A8B2C1", marginTop: "4px" }}>
          Управление пользователями платформы
        </p>
      </div>

      <div
        className="flex flex-wrap items-center"
        style={{ gap: "10px", marginBottom: "20px" }}
      >
        <div
          className="flex items-center"
          style={{
            flex: "1 1 280px",
            minWidth: "240px",
            backgroundColor: "#1E2A3A",
            borderRadius: "10px",
            padding: "10px 16px",
            gap: "10px",
          }}
        >
          <span style={{ fontSize: "15px" }}>🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по имени или email..."
            className="text-white w-full"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: "14px",
            }}
          />
        </div>

        <div className="flex flex-wrap" style={{ gap: "8px" }}>
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id)}
                style={{
                  backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                  color: isActive ? "#ffffff" : "#C8D0DC",
                  border: "1px solid",
                  borderColor: isActive
                    ? "#E94560"
                    : "rgba(255,255,255,0.06)",
                  borderRadius: "10px",
                  padding: "10px 18px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#1E2A3A",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: COLUMNS,
            gap: "12px",
            alignItems: "center",
            padding: "12px 20px",
            backgroundColor: "rgba(255,255,255,0.02)",
            fontSize: "11px",
            fontWeight: 600,
            color: "#A8B2C1",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>Пользователь</span>
          <span>Email</span>
          <span>Роль</span>
          <span>Статус</span>
          <span>Действия</span>
        </div>

        {filtered.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              color: "#A8B2C1",
              fontSize: "14px",
            }}
          >
            Пользователи не найдены
          </div>
        ) : (
          filtered.map((user, idx) => (
            <UserRow
              key={user.id}
              user={user}
              index={idx}
              isLast={idx === filtered.length - 1}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>

      <div
        style={{
          marginTop: "16px",
          fontSize: "13px",
          color: "#A8B2C1",
        }}
      >
        Всего пользователей:{" "}
        <span className="text-white" style={{ fontWeight: 700 }}>
          {filtered.length}
        </span>
      </div>
    </div>
  );
}

function UserRow({ user, index, isLast, onToggleStatus }) {
  const avatarStyle = avatarPalette[index % 4];
  const roleStyle = roleBadge[user.role] || roleBadge.User;
  const statusStyle = statusBadge[user.status] || statusBadge.active;
  const isActive = user.status === "active";

  return (
    <div
      className="user-row"
      style={{
        display: "grid",
        gridTemplateColumns: COLUMNS,
        gap: "12px",
        alignItems: "center",
        padding: "14px 20px",
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
        transition: "background-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <div className="flex items-center" style={{ gap: "12px", minWidth: 0 }}>
        <div
          className="flex items-center justify-center shrink-0"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: avatarStyle.bg,
            color: avatarStyle.color,
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          {getInitials(user.name)}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            className="text-white truncate"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {user.name}
          </div>
          <div style={{ fontSize: "12px", color: "#A8B2C1", marginTop: "2px" }}>
            {user.date}
          </div>
        </div>
      </div>

      <span
        style={{
          fontSize: "13px",
          color: "#C8D0DC",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {user.email}
      </span>

      <span>
        <span
          style={{
            display: "inline-block",
            backgroundColor: roleStyle.bg,
            color: roleStyle.color,
            padding: "3px 10px",
            borderRadius: "6px",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {user.role}
        </span>
      </span>

      <span>
        <span
          style={{
            display: "inline-block",
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
            padding: "3px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {statusStyle.label}
        </span>
      </span>

      <span>
        <button
          type="button"
          onClick={() => onToggleStatus(user)}
          style={{
            background: isActive ? "rgba(233,69,96,0.1)" : "rgba(72,187,120,0.1)",
            color: isActive ? "#E94560" : "#48BB78",
            border: `1px solid ${
              isActive ? "rgba(233,69,96,0.25)" : "rgba(72,187,120,0.3)"
            }`,
            borderRadius: "8px",
            padding: "8px 14px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          {isActive ? "Заблокировать" : "Разблокировать"}
        </button>
      </span>
    </div>
  );
}

export default UsersPage;
