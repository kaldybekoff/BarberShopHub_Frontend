const mockServices = [
  {
    id: 1,
    name: "Классическая стрижка",
    duration: 30,
    price: 2500,
    category: "Стрижки",
    icon: "✂️",
  },
  {
    id: 2,
    name: "Фейд + укладка",
    duration: 50,
    price: 3500,
    category: "Стрижки",
    icon: "👑",
  },
  {
    id: 3,
    name: "Стрижка бороды",
    duration: 25,
    price: 1500,
    category: "Борода",
    icon: "🪒",
  },
  {
    id: 4,
    name: "Комплекс",
    duration: 60,
    price: 4500,
    category: "Борода",
    icon: "💎",
  },
];

const formatPrice = (price) => `${price.toLocaleString("ru-RU")}₸`;

function ServicesPage() {
  const categories = [...new Set(mockServices.map((s) => s.category))];

  function handleAdd() {
    console.log("add service");
  }

  function handleEdit(id) {
    console.log("edit service", id);
  }

  function handleDelete(id) {
    console.log("delete service", id);
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
          <h1
            className="text-white"
            style={{ fontSize: "22px", fontWeight: 700 }}
          >
            Услуги
          </h1>
          <p
            style={{
              color: "#A8B2C1",
              fontSize: "13px",
              marginTop: "3px",
            }}
          >
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
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c73652";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#E94560";
          }}
        >
          + Добавить услугу
        </button>
      </div>

      {categories.map((category) => {
        const items = mockServices.filter((s) => s.category === category);
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
      })}
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
      <div
        className="flex items-center"
        style={{ gap: "14px", flex: 1, minWidth: 0 }}
      >
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
          <div
            className="text-white truncate"
            style={{ fontSize: "15px", fontWeight: 600 }}
          >
            {service.name}
          </div>
          <div
            style={{
              color: "#A8B2C1",
              fontSize: "12px",
              marginTop: "2px",
            }}
          >
            ⏱ {service.duration} мин
          </div>
        </div>
      </div>

      <div
        className="flex items-center"
        style={{ gap: "14px", flexShrink: 0 }}
      >
        <span
          className="text-white"
          style={{ fontSize: "16px", fontWeight: 700 }}
        >
          {formatPrice(service.price)}
        </span>

        <div
          style={{
            width: "1px",
            height: "28px",
            backgroundColor: "rgba(255,255,255,0.08)",
          }}
        />

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
