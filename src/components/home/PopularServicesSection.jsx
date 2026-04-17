import { useNavigate } from "react-router-dom";
import { Scissors, UserRound, BadgeCheck, Baby } from "lucide-react";
import colors from "../../constants/colors";

const serviceChips = [
  { label: "Стрижка", icon: Scissors, value: "haircut" },
  { label: "Борода", icon: UserRound, value: "beard" },
  { label: "Комплекс", icon: BadgeCheck, value: "complex" },
  { label: "Детская", icon: Baby, value: "kids" },
];

function PopularServicesSection() {
  const navigate = useNavigate();

  return (
    <div className="mb-6">
      <h2 className="text-base font-semibold text-white mb-3">Популярные услуги</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
        {serviceChips.map((chip) => {
          const Icon = chip.icon;
          return (
            <button
              key={chip.value}
              onClick={() => navigate(`/search?service=${chip.value}`)}
              className="flex items-center gap-3 px-4 py-4 rounded-xl text-sm font-medium transition-opacity hover:opacity-80"
              style={{ backgroundColor: colors.light, color: "#ffffff" }}
            >
              <Icon size={18} />
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PopularServicesSection;
