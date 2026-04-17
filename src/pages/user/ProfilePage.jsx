import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import mockAppointments from "../../data/mockAppointments";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const name = user?.name || "Артём Иванов";
  const email = user?.email || "user@test.com";
  const phone = user?.phone || "+7 (777) 000-00-00";
  const role = user?.role || "User";

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalAppointments = mockAppointments.length;
  const completedAppointments = mockAppointments.filter(
    (a) => a.status === "done"
  ).length;
  const rating = 4.8;

  const recentAppointments = mockAppointments
    .filter((a) => a.status === "confirmed" || a.status === "pending")
    .slice(0, 2);

  const menuItems = [
    { icon: "📅", label: "Мои записи", onClick: () => navigate("/appointments") },
    { icon: "✂️", label: "Найти барбершоп", onClick: () => navigate("/search") },
    { icon: "⭐", label: "Мои отзывы", onClick: () => {} },
  ];

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: "1100px", padding: "32px 24px 48px" }}
      >
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: "280px 1fr",
            gap: "24px",
          }}
        >
          <aside
            className="flex flex-col"
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "32px 24px 24px",
            }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="flex items-center justify-center text-white"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  backgroundColor: "#E94560",
                  fontSize: "38px",
                  fontWeight: 700,
                  marginBottom: "18px",
                }}
              >
                {initials}
              </div>
              <h1
                className="text-white"
                style={{ fontSize: "20px", fontWeight: 700 }}
              >
                {name}
              </h1>
              <p
                style={{
                  color: "#A8B2C1",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                Пользователь
              </p>
            </div>

            <div
              style={{
                height: "1px",
                backgroundColor: "#2a3a4a",
                margin: "24px 0",
              }}
            />

            <nav className="flex flex-col" style={{ gap: "4px" }}>
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.onClick}
                  className="flex items-center justify-between transition-opacity hover:opacity-85"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    padding: "12px 4px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span
                    className="flex items-center text-white"
                    style={{ gap: "12px", fontSize: "15px", fontWeight: 600 }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    {item.label}
                  </span>
                  <span style={{ color: "#A8B2C1", fontSize: "18px" }}>›</span>
                </button>
              ))}
            </nav>

            <div
              style={{
                height: "1px",
                backgroundColor: "#2a3a4a",
                margin: "20px 0",
              }}
            />

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center transition-opacity hover:opacity-85"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#E94560",
                fontSize: "15px",
                fontWeight: 600,
                gap: "10px",
                padding: "4px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>→</span>
              Выйти
            </button>
          </aside>

          <div className="flex flex-col" style={{ gap: "20px" }}>
            <div
              className="grid"
              style={{
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "16px",
              }}
            >
              <StatCard value={totalAppointments} label="Записей всего" />
              <StatCard value={completedAppointments} label="Завершено" />
              <StatCard
                value={rating}
                label={
                  <>
                    <span style={{ color: "#F5A623" }}>★</span> Оценка
                  </>
                }
              />
            </div>

            <div
              style={{
                backgroundColor: "#1E2A3A",
                borderRadius: "16px",
                padding: "24px",
              }}
            >
              <h2
                className="text-white"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "20px",
                }}
              >
                Мои данные
              </h2>

              <InfoRow label="Имя" value={name} />
              <InfoRow label="Email" value={email} />
              <InfoRow label="Телефон" value={phone} />
              <InfoRow
                label="Роль"
                value={
                  <span
                    style={{
                      backgroundColor: "rgba(233, 69, 96, 0.15)",
                      color: "#E94560",
                      borderRadius: "999px",
                      padding: "4px 14px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {role}
                  </span>
                }
                isLast
              />
            </div>

            <div>
              <h2
                className="text-white"
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  marginBottom: "14px",
                }}
              >
                Последние записи
              </h2>

              <div className="flex flex-col" style={{ gap: "10px" }}>
                {recentAppointments.length === 0 ? (
                  <p style={{ color: "#A8B2C1", fontSize: "14px" }}>
                    Записей пока нет
                  </p>
                ) : (
                  recentAppointments.map((appointment) => (
                    <RecentAppointmentRow
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div
      className="text-center"
      style={{
        backgroundColor: "#16213E",
        borderRadius: "14px",
        padding: "22px 16px",
      }}
    >
      <div
        className="text-white"
        style={{ fontSize: "30px", fontWeight: 700, lineHeight: 1.1 }}
      >
        {value}
      </div>
      <div
        style={{
          color: "#A8B2C1",
          fontSize: "13px",
          marginTop: "8px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function InfoRow({ label, value, isLast }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: "14px 0",
        borderBottom: isLast ? "none" : "1px solid #2a3a4a",
      }}
    >
      <span style={{ color: "#A8B2C1", fontSize: "14px" }}>{label}</span>
      <span
        className="text-white"
        style={{ fontSize: "14px", fontWeight: 600 }}
      >
        {value}
      </span>
    </div>
  );
}

function RecentAppointmentRow({ appointment }) {
  const isConfirmed = appointment.status === "confirmed";
  const statusLabel = isConfirmed ? "Подтверждено" : "Ожидает";
  const statusColor = isConfirmed ? "#48BB78" : "#F6AD55";
  const statusBg = isConfirmed
    ? "rgba(72, 187, 120, 0.15)"
    : "rgba(246, 173, 85, 0.15)";

  return (
    <div
      className="flex items-center justify-between"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "14px",
        padding: "16px 20px",
      }}
    >
      <div>
        <p
          className="text-white"
          style={{ fontSize: "15px", fontWeight: 700 }}
        >
          {appointment.shop}
        </p>
        <p
          style={{
            color: "#A8B2C1",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          {appointment.service} · {appointment.date} · {appointment.time}
        </p>
      </div>

      <span
        style={{
          backgroundColor: statusBg,
          color: statusColor,
          borderRadius: "999px",
          padding: "5px 14px",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        {statusLabel}
      </span>
    </div>
  );
}

export default ProfilePage;
