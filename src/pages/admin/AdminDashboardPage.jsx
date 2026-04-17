import { Link } from "react-router-dom";

const stats = [
  {
    icon: "👥",
    label: "ПОЛЬЗОВАТЕЛИ",
    value: "1 248",
    delta: "▲ +24 за неделю",
    iconBg: "rgba(233,69,96,0.12)",
    deltaColor: "#48BB78",
  },
  {
    icon: "✂️",
    label: "БАРБЕРШОПЫ",
    value: "34",
    delta: "▲ +2 за неделю",
    iconBg: "rgba(72,187,120,0.12)",
    deltaColor: "#48BB78",
  },
  {
    icon: "📅",
    label: "ЗАПИСЕЙ ЗА МЕСЯЦ",
    value: "2 107",
    delta: "▲ +18%",
    iconBg: "rgba(245,166,35,0.12)",
    deltaColor: "#48BB78",
  },
  {
    icon: "💬",
    label: "НА МОДЕРАЦИИ",
    value: "8",
    delta: "⏳ Ожидают",
    iconBg: "rgba(246,173,85,0.12)",
    deltaColor: "#F6AD55",
  },
];

const mockUsers = [
  { name: "Алибек Д.", phone: "+7 700 123 4567", role: "User", date: "01.03.2026", status: "active" },
  { name: "Марат Б.", phone: "+7 702 345 6789", role: "Barbershop", date: "10.02.2026", status: "active" },
  { name: "Темирлан А.", phone: "+7 703 456 7890", role: "User", date: "15.02.2026", status: "blocked" },
  { name: "Айгерим К.", phone: "+7 704 567 8901", role: "User", date: "20.01.2026", status: "active" },
  { name: "Даниар О.", phone: "+7 705 678 9012", role: "Barbershop", date: "25.01.2026", status: "blocked" },
];

const mockShops = [
  { name: "BarberKing", address: "ул. Абая, 12", rating: 4.8, status: "active" },
  { name: "Chop Chop", address: "пр. Достык, 45", rating: 4.6, status: "active" },
  { name: "OldSchool", address: "ул. Толе би, 78", rating: 4.4, status: "blocked" },
  { name: "Fade Masters", address: "ул. Байтурсынова, 5", rating: 4.9, status: "active" },
  { name: "CutZone", address: "ул. Сейфуллина, 33", rating: 4.2, status: "pending" },
];

const mockReviews = [
  {
    author: "Алибек Д.",
    shop: "BarberKing",
    text: "Отличное место, мастер очень профессиональный!",
    rating: 5,
    status: "pending",
  },
  {
    author: "Тимур Н.",
    shop: "Fade Masters",
    text: "Лучшие фейды в городе, однозначно рекомендую!",
    rating: 5,
    status: "pending",
  },
  {
    author: "Даурен К.",
    shop: "CutZone",
    text: "Хорошее соотношение цены и качества.",
    rating: 4,
    status: "pending",
  },
];

const statusBadges = {
  active: {
    label: "Активен",
    background: "rgba(72,187,120,0.15)",
    color: "#48BB78",
  },
  blocked: {
    label: "Заблок.",
    background: "rgba(233,69,96,0.12)",
    color: "#E94560",
  },
  pending: {
    label: "Ожидает",
    background: "rgba(246,173,85,0.15)",
    color: "#F6AD55",
  },
};

function AdminDashboardPage() {
  function handleApprove(author) {
    console.log("approve review", author);
  }

  function handleReject(author) {
    console.log("reject review", author);
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
          Панель администратора
        </h1>
        <p
          style={{
            fontSize: "13px",
            color: "#A8B2C1",
            marginTop: "4px",
          }}
        >
          Общая статистика и управление платформой
        </p>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        style={{ gap: "12px", marginBottom: "24px" }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style={{ gap: "16px" }}
      >
        <TableBlock title="Пользователи" linkTo="/admin/users">
          <UsersTable users={mockUsers} />
        </TableBlock>

        <TableBlock title="Барбершопы" linkTo="/admin/barbershops">
          <ShopsTable shops={mockShops} />
        </TableBlock>
      </div>

      <div style={{ marginTop: "16px" }}>
        <TableBlock title="Отзывы на модерации" linkTo="/admin/reviews">
          <ReviewsGrid
            reviews={mockReviews}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </TableBlock>
      </div>
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "18px 20px",
      }}
    >
      <div
        className="flex items-center"
        style={{ gap: "10px", marginBottom: "12px" }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            backgroundColor: stat.iconBg,
            fontSize: "18px",
          }}
        >
          {stat.icon}
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#A8B2C1",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {stat.label}
        </span>
      </div>

      <div
        className="text-white"
        style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1.1 }}
      >
        {stat.value}
      </div>

      <div
        style={{
          marginTop: "8px",
          fontSize: "12px",
          color: stat.deltaColor,
          fontWeight: 500,
        }}
      >
        {stat.delta}
      </div>
    </div>
  );
}

function TableBlock({ title, linkTo, children }) {
  return (
    <div
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          {title}
        </span>
        <Link
          to={linkTo}
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#E94560",
            textDecoration: "none",
          }}
        >
          Все →
        </Link>
      </div>
      {children}
    </div>
  );
}

function UsersTable({ users }) {
  const columns = "2fr 1.5fr 1fr 1fr";

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "12px",
          padding: "10px 20px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#A8B2C1",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span>Имя</span>
        <span>Телефон</span>
        <span>Роль</span>
        <span>Статус</span>
      </div>

      {users.map((user, idx) => (
        <div
          key={user.phone}
          className="items-center"
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: "12px",
            alignItems: "center",
            padding: "12px 20px",
            borderBottom:
              idx === users.length - 1
                ? "none"
                : "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              className="text-white truncate"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {user.name}
            </div>
            <div style={{ fontSize: "11px", color: "#A8B2C1", marginTop: "2px" }}>
              {user.date}
            </div>
          </div>
          <span
            style={{
              fontSize: "13px",
              color: "#C8D0DC",
            }}
          >
            {user.phone}
          </span>
          <span style={{ fontSize: "13px", color: "#C8D0DC" }}>{user.role}</span>
          <span>
            <StatusBadge status={user.status} />
          </span>
        </div>
      ))}
    </div>
  );
}

function ShopsTable({ shops }) {
  const columns = "1.8fr 1.5fr 0.8fr 1fr";

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: columns,
          gap: "12px",
          padding: "10px 20px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#A8B2C1",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <span>Название</span>
        <span>Адрес</span>
        <span>Рейтинг</span>
        <span>Статус</span>
      </div>

      {shops.map((shop, idx) => (
        <div
          key={shop.name}
          style={{
            display: "grid",
            gridTemplateColumns: columns,
            gap: "12px",
            alignItems: "center",
            padding: "12px 20px",
            borderBottom:
              idx === shops.length - 1
                ? "none"
                : "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span
            className="text-white truncate"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            {shop.name}
          </span>
          <span
            style={{
              fontSize: "13px",
              color: "#C8D0DC",
              minWidth: 0,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {shop.address}
          </span>
          <span
            className="flex items-center"
            style={{ gap: "4px", fontSize: "13px", color: "#C8D0DC" }}
          >
            <span style={{ color: "#F5A623" }}>★</span>
            {shop.rating}
          </span>
          <span>
            <StatusBadge status={shop.status} />
          </span>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const badge = statusBadges[status] || statusBadges.active;
  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: badge.background,
        color: badge.color,
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "11px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {badge.label}
    </span>
  );
}

function ReviewsGrid({ reviews, onApprove, onReject }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: 0 }}
    >
      {reviews.map((review, idx) => (
        <ReviewCard
          key={review.author}
          review={review}
          isLast={idx === reviews.length - 1}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, isLast, onApprove, onReject }) {
  return (
    <div
      style={{
        padding: "14px 20px",
        borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div
        className="flex items-start justify-between"
        style={{ gap: "8px", marginBottom: "8px" }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            className="text-white"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            {review.author}{" "}
            <span style={{ color: "#A8B2C1", fontWeight: 400 }}>
              → {review.shop}
            </span>
          </div>
        </div>
        <div style={{ color: "#F5A623", fontSize: "12px", whiteSpace: "nowrap" }}>
          {"★".repeat(review.rating)}
        </div>
      </div>

      <p
        style={{
          fontSize: "13px",
          color: "#C8D0DC",
          lineHeight: 1.5,
          marginBottom: "12px",
        }}
      >
        {review.text}
      </p>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          type="button"
          onClick={() => onApprove(review.author)}
          style={{
            flex: 1,
            background: "rgba(72, 187, 120, 0.15)",
            color: "#48BB78",
            border: "1px solid rgba(72, 187, 120, 0.3)",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✓ Одобрить
        </button>
        <button
          type="button"
          onClick={() => onReject(review.author)}
          style={{
            flex: 1,
            background: "rgba(233, 69, 96, 0.1)",
            color: "#E94560",
            border: "1px solid rgba(233, 69, 96, 0.25)",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          ✕ Отклонить
        </button>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
