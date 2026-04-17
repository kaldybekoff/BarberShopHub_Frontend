function groupByCategory(services) {
  const groups = {};
  services.forEach((service) => {
    if (!groups[service.category]) groups[service.category] = [];
    groups[service.category].push(service);
  });
  return groups;
}

function ServiceSelector({ services, selectedId, onSelect }) {
  const grouped = groupByCategory(services);
  const categories = Object.keys(grouped);

  return (
    <div>
      {categories.map((category, idx) => (
        <div key={category}>
          <h3
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#A8B2C1",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "10px",
              marginTop: idx === 0 ? 0 : "20px",
            }}
          >
            {category}
          </h3>

          {grouped[category].map((service) => {
            const isSelected = selectedId === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelect(service)}
                className="flex items-center w-full"
                style={{
                  backgroundColor: isSelected ? "transparent" : "#1E2A3A",
                  borderRadius: "12px",
                  padding: "14px 16px",
                  gap: "12px",
                  marginBottom: "8px",
                  cursor: "pointer",
                  border: isSelected
                    ? "2px solid #E94560"
                    : "2px solid transparent",
                  textAlign: "left",
                }}
              >
                <div
                  className="flex items-center justify-center shrink-0"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "#16213E",
                    borderRadius: "8px",
                    fontSize: "18px",
                  }}
                >
                  {service.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    className="text-white"
                    style={{ fontSize: "15px", fontWeight: 600 }}
                  >
                    {service.name}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#A8B2C1",
                      marginTop: "3px",
                    }}
                  >
                    ⏱ {service.duration} мин
                  </p>
                </div>

                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 700,
                    color: isSelected ? "#E94560" : "#ffffff",
                    marginLeft: "auto",
                  }}
                >
                  {service.price.toLocaleString("ru-RU")}₸
                </span>

                {isSelected && (
                  <span
                    style={{
                      color: "#E94560",
                      fontSize: "16px",
                      marginLeft: "6px",
                    }}
                  >
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ServiceSelector;
