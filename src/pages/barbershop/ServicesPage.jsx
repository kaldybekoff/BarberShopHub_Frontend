import { useState, useEffect } from "react";
import { getOwnerServices, deleteOwnerService } from "../../api/dashboardApi";

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
    console.log("add service");
  }

  function handleEdit(id) {
    console.log("edit service", id);
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
    <div
      style={{
        backgroundColor: "#1A1A2E",
        padding: "28px 32px",
        minHeight: "100vh",
      }}
    >
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
          style={{
            backgroundColor: "#1E2A3A",
            borderRadius: "12px",
            padding: "40px 20px",
            color: "#A8B2C1",
            fontSize: "14px",
          }}
        >
          Загрузка...
        </div>
      ) : services.length === 0 ? (
        <div
          className="text-center"
          style={{
            backgroundColor: "#1E2A3A",
            borderRadius: "12px",
            padding: "40px 20px",
            color: "#A8B2C1",
            fontSize: "14px",
          }}
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
    </div>
  );
}

function ServiceCard({ service, onEdit, onDelete }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        backgroundColor: "#1E2A3A",
        borderRadius: "12px",
        padding: "18px 20px",
        gap: "16px",
      }}
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
