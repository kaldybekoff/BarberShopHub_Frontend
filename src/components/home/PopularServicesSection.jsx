import { useNavigate } from "react-router-dom";

const serviceChips = [
  { label: "Стрижка", icon: "✂️", value: "haircut" },
  { label: "Борода", icon: "🪒", value: "beard" },
  { label: "Комплекс", icon: "💎", value: "complex" },
  { label: "Детская", icon: "👦", value: "kids" },
];

function PopularServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="mt-7 border-t px-6 pt-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
      <h2 className="mb-4 text-xl font-semibold text-white">Популярные услуги</h2>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {serviceChips.map((chip) => (
          <button
            key={chip.value}
            type="button"
            onClick={() => navigate(`/search?service=${chip.value}`)}
            className="aspect-square rounded-2xl p-3 transition-opacity hover:opacity-85"
            style={{
              backgroundColor: "#1E2A3A",
            }}
          >
            <span className="mb-2 block text-3xl">{chip.icon}</span>
            <span className="text-sm font-medium text-white">{chip.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default PopularServicesSection;
