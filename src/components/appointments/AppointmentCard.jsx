import { useState } from "react";
import { cancelAppointment, rescheduleAppointment } from "../../api/appointmentApi";

function extractError(e, fallback) {
  const data = e?.response?.data;
  if (!data) return fallback;
  if (typeof data.message === "string" && data.message) return data.message;
  if (data.errors) {
    try { return Object.values(data.errors).flat().join(", "); } catch { /* ignore */ }
  }
  return fallback;
}

const todayStr = new Date().toISOString().slice(0, 10);

function AppointmentCard({ appointment, onCancelled, onRescheduled }) {
  const [showReschedule, setShowReschedule] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isConfirmed = appointment.status === "confirmed";
  const statusLabel = isConfirmed ? "Подтверждено" : "Ожидает";
  const statusColor = isConfirmed ? "#48BB78" : "#F6AD55";
  const statusBg = isConfirmed ? "rgba(72, 187, 120, 0.15)" : "rgba(246, 173, 85, 0.15)";

  async function handleCancel() {
    if (!window.confirm("Отменить запись?")) return;
    setLoading(true);
    setError("");
    try {
      await cancelAppointment(appointment.id);
      onCancelled?.(appointment.id);
    } catch (e) {
      const msg = extractError(e, "Не удалось отменить запись");
      setError(msg);
      alert(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleReschedule() {
    if (!newDate || !newTime) return;
    const localDt = new Date(`${newDate}T${newTime}:00`);
    if (Number.isNaN(localDt.getTime())) {
      setError("Некорректная дата или время");
      return;
    }
    const scheduledAtUtc = localDt.toISOString();
    setLoading(true);
    setError("");
    try {
      await rescheduleAppointment(appointment.id, scheduledAtUtc);
      setShowReschedule(false);
      setNewDate("");
      setNewTime("");
      onRescheduled?.(appointment.id, localDt.toISOString());
    } catch (e) {
      const msg = extractError(e, "Не удалось перенести запись");
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#1E2A3A", borderRadius: "16px" }}
    >
      <div style={{ padding: "16px", borderBottom: "1px solid #2a3a4a" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-white" style={{ fontWeight: 700, fontSize: "15px" }}>
            {appointment.shop}
          </h3>
          <span
            style={{
              backgroundColor: statusBg,
              color: statusColor,
              borderRadius: "20px",
              padding: "3px 10px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            {statusLabel}
          </span>
        </div>

        <div className="flex items-center" style={{ gap: "12px", marginTop: "14px" }}>
          <div
            className="flex items-center justify-center shrink-0 text-white"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#E94560",
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {appointment.masterInitials}
          </div>
          <div>
            <p className="text-white" style={{ fontWeight: 600, fontSize: "14px" }}>
              {appointment.master}
            </p>
            <p style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
              {appointment.service}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between" style={{ padding: "12px 16px" }}>
        <div className="flex items-center" style={{ gap: "14px" }}>
          <span className="inline-flex items-center" style={{ color: "#A8B2C1", fontSize: "13px", gap: "6px" }}>
            <span>📅</span>{appointment.date}
          </span>
          <span className="inline-flex items-center" style={{ color: "#A8B2C1", fontSize: "13px", gap: "6px" }}>
            <span>⏰</span>{appointment.time}
          </span>
        </div>
        <span style={{ color: "#E94560", fontWeight: 700, fontSize: "16px" }}>
          {Number(appointment.price).toLocaleString("ru-RU")}₸
        </span>
      </div>

      {showReschedule && (
        <div style={{ padding: "12px 16px", borderTop: "1px solid #2a3a4a", backgroundColor: "#16213E" }}>
          <p style={{ color: "#A8B2C1", fontSize: "12px", marginBottom: "8px" }}>Новая дата и время</p>
          {error && (
            <p style={{ color: "#E94560", fontSize: "12px", marginBottom: "8px" }}>{error}</p>
          )}
          <div className="flex" style={{ gap: "8px", marginBottom: "8px" }}>
            <input
              type="date"
              value={newDate}
              min={todayStr}
              onChange={(e) => setNewDate(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "#1E2A3A",
                border: "1px solid #2a3a4a",
                borderRadius: "8px",
                padding: "8px 10px",
                color: "#ffffff",
                fontSize: "13px",
                outline: "none",
              }}
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: "#1E2A3A",
                border: "1px solid #2a3a4a",
                borderRadius: "8px",
                padding: "8px 10px",
                color: "#ffffff",
                fontSize: "13px",
                outline: "none",
              }}
            />
          </div>
          <div className="flex" style={{ gap: "8px" }}>
            <button
              type="button"
              onClick={() => setShowReschedule(false)}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "1px solid #2a3a4a",
                color: "#A8B2C1",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Отмена
            </button>
            <button
              type="button"
              onClick={handleReschedule}
              disabled={!newDate || !newTime || loading}
              style={{
                flex: 1,
                backgroundColor: newDate && newTime ? "#E94560" : "#2a3a4a",
                border: "none",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "8px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: newDate && newTime ? "pointer" : "not-allowed",
              }}
            >
              {loading ? "..." : "Подтвердить"}
            </button>
          </div>
        </div>
      )}

      <div className="flex" style={{ borderTop: "1px solid #2a3a4a" }}>
        <button
          type="button"
          disabled={loading}
          onClick={() => setShowReschedule((v) => !v)}
          style={{
            flex: 1,
            color: "#A8B2C1",
            padding: "12px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
            borderRight: "1px solid #2a3a4a",
          }}
        >
          Перенести
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={handleCancel}
          style={{
            flex: 1,
            color: "#E94560",
            padding: "12px",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            backgroundColor: "transparent",
            border: "none",
          }}
        >
          {loading ? "..." : "Отменить"}
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;
