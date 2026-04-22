import { useState, useEffect } from "react";
import { getOwnerServices, deleteOwnerService, createOwnerService } from "../../api/dashboardApi";

function formatPrice(price) {
  return `${Number(price).toLocaleString("ru-RU")}₸`;
}

function mapService(s) {
  return {
    id: s.id,
    name: s.name,
    duration: s.duration_minutes ?? s.duration ?? 0,
    price: s.price,
    category: s.category?.name ?? s.category ?? "Прочее",
    icon: "✂️",
  };
}

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null); // null = add, object = edit

  async function loadServices() {
    setLoading(true);
    try {
      const data = await getOwnerServices();
      setServices(data.map(mapService));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  const categories = [...new Set(services.map((s) => s.category))];

  function handleAdd() {
    setEditTarget(null);
    setShowModal(true);
  }

  function handleEdit(id) {
    const svc = services.find((s) => s.id === id);
    setEditTarget(svc ?? null);
    setShowModal(true);
  }

  async function handleModalSubmit(formData) {
    try {
      await createOwnerService(formData);
      setShowModal(false);
      await loadServices();
    } catch (e) {
      // Endpoint not implemented yet — backend needs POST /owner/services
      console.error(e);
      setShowModal(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteOwnerService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div style={{ backgroundColor: "#1A1A2E", padding: "28px 32px", minHeight: "100vh" }}>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "24px", gap: "16px", flexWrap: "wrap" }}
      >
        <div>
          <h1 className="text-white" style={{ fontSize: "22px", fontWeight: 700 }}>
            Услуги
          </h1>
          <p style={{ color: "#A8B2C1", fontSize: "13px", marginTop: "3px" }}>
            Услуги вашего барбершопа
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="text-white"
          style={{
            backgroundColor: "#E94560",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#c73652"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#E94560"; }}
        >
          + Добавить услугу
        </button>
      </div>

      {loading ? (
        <div
          className="text-center"
          style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "40px 20px", color: "#A8B2C1", fontSize: "14px" }}
        >
          Загрузка...
        </div>
      ) : services.length === 0 ? (
        <div
          className="text-center"
          style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "40px 20px", color: "#A8B2C1", fontSize: "14px" }}
        >
          Услуг пока нет
        </div>
      ) : (
        categories.map((category) => {
          const items = services.filter((s) => s.category === category);
          return (
            <div key={category} style={{ marginBottom: "24px" }}>
              <p
                style={{
                  color: "#A8B2C1",
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 600,
                  marginBottom: "12px",
                }}
              >
                {category}
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: "12px",
                }}
              >
                {items.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}

      {showModal && (
        <ServiceModal
          initial={editTarget}
          onClose={() => setShowModal(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}

// ─── ADD / EDIT MODAL ────────────────────────────────────────────────────────
function ServiceModal({ initial, onClose, onSubmit }) {
  const isEdit = !!initial;
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    category: initial?.category ?? "",
    price: initial?.price ?? "",
    duration: initial?.duration ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.price || !form.duration) {
      setError("Заполните все обязательные поля");
      return;
    }
    setSaving(true);
    setError("");
    await onSubmit({
      name: form.name.trim(),
      category: form.category.trim() || "Прочее",
      price: Number(form.price),
      duration_minutes: Number(form.duration),
    });
    setSaving(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        style={{
          backgroundColor: "#1E2A3A",
          borderRadius: "16px",
          padding: "28px",
          width: "100%",
          maxWidth: "440px",
          boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex items-center justify-between" style={{ marginBottom: "24px" }}>
          <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 700 }}>
            {isEdit ? "Редактировать услугу" : "Новая услуга"}
          </h2>
          <button type="button" onClick={onClose} style={{ background: "none", border: "none", color: "#A8B2C1", fontSize: "20px", cursor: "pointer", lineHeight: 1 }}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Field label="Название *">
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Классическая стрижка"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
              onBlur={(e) => { e.target.style.borderColor = "#2a3a4a"; }}
            />
          </Field>

          <Field label="Категория">
            <input
              type="text"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Стрижка"
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
              onBlur={(e) => { e.target.style.borderColor = "#2a3a4a"; }}
            />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="Цена (₸) *">
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="1500"
                min="0"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
                onBlur={(e) => { e.target.style.borderColor = "#2a3a4a"; }}
              />
            </Field>
            <Field label="Длительность (мин) *">
              <input
                type="number"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="30"
                min="1"
                style={inputStyle}
                onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
                onBlur={(e) => { e.target.style.borderColor = "#2a3a4a"; }}
              />
            </Field>
          </div>

          {error && (
            <p style={{ color: "#E94560", fontSize: "13px", marginBottom: "12px" }}>{error}</p>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "1px solid #2a3a4a",
                color: "#A8B2C1",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={saving}
              style={{
                flex: 2,
                backgroundColor: "#E94560",
                border: "none",
                color: "#fff",
                borderRadius: "10px",
                padding: "12px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: saving ? "not-allowed" : "pointer",
                opacity: saving ? 0.7 : 1,
              }}
            >
              {saving ? "Сохранение..." : isEdit ? "Сохранить" : "Добавить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  backgroundColor: "#16213E",
  border: "1px solid #2a3a4a",
  borderRadius: "10px",
  padding: "11px 14px",
  color: "#fff",
  fontSize: "14px",
  outline: "none",
  fontFamily: "inherit",
  boxSizing: "border-box",
  transition: "border-color 0.15s",
};

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={{ display: "block", color: "#A8B2C1", fontSize: "12px", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ backgroundColor: "#1E2A3A", borderRadius: "12px", padding: "18px 20px", gap: "16px" }}
    >
      <div className="flex items-center" style={{ gap: "14px", flex: 1, minWidth: 0 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            backgroundColor: "rgba(233, 69, 96, 0.12)",
            fontSize: "22px",
            flexShrink: 0,
          }}
        >
          {service.icon}
        </div>

        <div style={{ minWidth: 0 }}>
          <div className="text-white truncate" style={{ fontSize: "15px", fontWeight: 600 }}>
            {service.name}
          </div>
          <div style={{ color: "#A8B2C1", fontSize: "12px", marginTop: "2px" }}>
            ⏱ {service.duration} мин
          </div>
        </div>
      </div>

      <div className="flex items-center" style={{ gap: "14px", flexShrink: 0 }}>
        <span className="text-white" style={{ fontSize: "16px", fontWeight: 700 }}>
          {formatPrice(service.price)}
        </span>

        <div style={{ width: "1px", height: "28px", backgroundColor: "rgba(255,255,255,0.08)" }} />

        <div className="flex items-center" style={{ gap: "8px" }}>
          <button
            type="button"
            onClick={() => onEdit(service.id)}
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "#A8B2C1",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Ред.
          </button>
          <button
            type="button"
            onClick={() => onDelete(service.id)}
            style={{
              backgroundColor: "rgba(233, 69, 96, 0.1)",
              color: "#E94560",
              border: "1px solid rgba(233, 69, 96, 0.2)",
              borderRadius: "6px",
              padding: "6px 12px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
