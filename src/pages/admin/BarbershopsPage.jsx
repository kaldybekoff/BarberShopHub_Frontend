import { useMemo, useState } from "react";

const mockShops = [
  { id: 1, name: "BarberKing", owner: "Марат Сейткали", address: "ул. Абая, 12", rating: 4.8, status: "active", icon: "💈" },
  { id: 2, name: "Chop Chop", owner: "Азамат Нуров", address: "пр. Достык, 45", rating: 4.6, status: "active", icon: "✂️" },
  { id: 3, name: "OldSchool Barbershop", owner: "Руслан Ким", address: "ул. Толе би, 78", rating: 4.4, status: "blocked", icon: "🪒" },
  { id: 4, name: "Fade Masters", owner: "Берик Алиев", address: "ул. Байтурсынова, 5", rating: 4.9, status: "active", icon: "👑" },
  { id: 5, name: "CutZone", owner: "Дамир Жаксыбеков", address: "ул. Сейфуллина, 33", rating: 4.2, status: "pending", icon: "💈" },
  { id: 6, name: "Royal Cuts", owner: "Нурлан Омаров", address: "пр. Аль-Фараби, 17", rating: 4.7, status: "active", icon: "✂️" },
];

const filters = [
  { id: "all", label: "Все" },
  { id: "active", label: "Активные" },
  { id: "pending", label: "Ожидают" },
  { id: "blocked", label: "Заблокированные" },
];

const statusBadge = {
  active: { bg: "rgba(72,187,120,0.15)", color: "#48BB78", label: "Активен" },
  blocked: { bg: "rgba(233,69,96,0.12)", color: "#E94560", label: "Заблок." },
  pending: { bg: "rgba(246,173,85,0.15)", color: "#F6AD55", label: "Ожидает" },
};

const COLUMNS = "2fr 1.8fr 1fr 0.9fr 1.2fr";

function BarbershopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return mockShops
      .filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.address.toLowerCase().includes(q)
      )
      .filter((s) => {
        if (activeFilter === "all") return true;
        if (activeFilter === "active") return s.status === "active";
        if (activeFilter === "pending") return s.status === "pending";
        if (activeFilter === "blocked") return s.status === "blocked";
        return true;
      });
  }, [searchQuery, activeFilter]);

  function handleView(shop) {
    console.log("view shop", shop.id);
  }

  function handleBlock(shop) {
    console.log("block shop", shop.id);
  }

  function handleUnblock(shop) {
    console.log("unblock shop", shop.id);
  }

  function handleApprove(shop) {
    console.log("approve shop", shop.id);
  }

  function handleReject(shop) {
    console.log("reject shop", shop.id);
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
          Барбершопы
        </h1>
        <p style={{ fontSize: "13px", color: "#A8B2C1", marginTop: "4px" }}>
          Управление барбершопами платформы
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
            placeholder="Поиск по названию или адресу..."
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
          <span>Барбершоп</span>
          <span>Адрес</span>
          <span>Рейтинг</span>
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
            Барбершопы не найдены
          </div>
        ) : (
          filtered.map((shop, idx) => (
            <ShopRow
              key={shop.id}
              shop={shop}
              isLast={idx === filtered.length - 1}
              onView={handleView}
              onBlock={handleBlock}
              onUnblock={handleUnblock}
              onApprove={handleApprove}
              onReject={handleReject}
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
        Всего барбершопов:{" "}
        <span className="text-white" style={{ fontWeight: 700 }}>
          {filtered.length}
        </span>
      </div>
    </div>
  );
}

function ShopRow({
  shop,
  isLast,
  onView,
  onBlock,
  onUnblock,
  onApprove,
  onReject,
}) {
  const statusStyle = statusBadge[shop.status] || statusBadge.active;

  return (
    <div
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
            width: "38px",
            height: "38px",
            borderRadius: "10px",
            backgroundColor: "rgba(233,69,96,0.12)",
            fontSize: "18px",
          }}
        >
          {shop.icon}
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            className="text-white"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            {shop.name}
          </div>
          <div style={{ fontSize: "12px", color: "#A8B2C1", marginTop: "2px" }}>
            {shop.owner}
          </div>
        </div>
      </div>

      <span
        style={{
          fontSize: "13px",
          color: "#C8D0DC",
        }}
      >
        {shop.address}
      </span>

      <span className="flex items-center" style={{ gap: "6px" }}>
        <span style={{ color: "#F5A623", fontSize: "14px" }}>★</span>
        <span
          className="text-white"
          style={{ fontSize: "14px", fontWeight: 600 }}
        >
          {shop.rating}
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

      <div className="flex flex-wrap" style={{ gap: "8px" }}>
        {shop.status === "pending" ? (
          <>
            <ActionButton variant="success" onClick={() => onApprove(shop)}>
              Одобрить
            </ActionButton>
            <ActionButton variant="danger" onClick={() => onReject(shop)}>
              Отклонить
            </ActionButton>
          </>
        ) : (
          <>
            <ActionButton variant="neutral" onClick={() => onView(shop)}>
              Просмотр
            </ActionButton>
            {shop.status === "active" ? (
              <ActionButton variant="danger" onClick={() => onBlock(shop)}>
                Заблок.
              </ActionButton>
            ) : (
              <ActionButton variant="success" onClick={() => onUnblock(shop)}>
                Разблок.
              </ActionButton>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ActionButton({ variant, onClick, children }) {
  const variants = {
    neutral: {
      background: "rgba(168,178,193,0.08)",
      color: "#C8D0DC",
      border: "1px solid rgba(255,255,255,0.06)",
    },
    success: {
      background: "rgba(72,187,120,0.1)",
      color: "#48BB78",
      border: "1px solid rgba(72,187,120,0.3)",
    },
    danger: {
      background: "rgba(233,69,96,0.1)",
      color: "#E94560",
      border: "1px solid rgba(233,69,96,0.25)",
    },
  };
  const style = variants[variant] || variants.neutral;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: style.background,
        color: style.color,
        border: style.border,
        borderRadius: "8px",
        padding: "8px 14px",
        fontSize: "12px",
        fontWeight: 600,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}

export default BarbershopsPage;
