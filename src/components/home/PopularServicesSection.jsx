import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

const serviceChips = [
  { label: "Стрижка", icon: "✂️", value: "haircut" },
  { label: "Борода", icon: "🧔", value: "beard" },
  { label: "Комплекс", icon: "💈", value: "complex" },
  { label: "Детская", icon: "👦", value: "kids" },
];

function PopularServicesSection() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-white mb-3">Популярные услуги</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {serviceChips.map((chip) => (
          <button
            key={chip.value}
            onClick={() => navigate(`/search?service=${chip.value}`)}
            className="flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: colors.light, color: "#ffffff" }}
          >
            <span className="text-xl">{chip.icon}</span>
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PopularServicesSection;
