import { useNavigate } from "react-router-dom";

const services = [
  { label: "Стрижка", icon: "✂️", value: "haircut" },
  { label: "Борода", icon: "🪒", value: "beard" },
  { label: "Комплекс", icon: "💎", value: "complex" },
  { label: "Детская", icon: "👦", value: "kids" },
];

function PopularServicesSection() {
  const navigate = useNavigate();

  return (
    <section>
      <div
        style={{
          height: "1px",
          backgroundColor: "#1E2A3A",
          margin: "32px 0",
        }}
      />

      <h2
        className="text-white"
        style={{ fontSize: "20px", fontWeight: 700, marginBottom: "16px" }}
      >
        Популярные услуги
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "14px" }}>
        {services.map((service) => (
          <button
            key={service.value}
            type="button"
            onClick={() => navigate(`/search?service=${service.value}`)}
            className="flex flex-col items-center transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "#1E2A3A",
              borderRadius: "16px",
              padding: "24px 16px",
              gap: "10px",
              cursor: "pointer",
              border: "none",
            }}
          >
            <span style={{ fontSize: "32px" }}>{service.icon}</span>
            <span
              className="text-white"
              style={{ fontSize: "14px", fontWeight: 600 }}
            >
              {service.label}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularServicesSection;
