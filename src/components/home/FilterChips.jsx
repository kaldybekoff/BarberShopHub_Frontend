import colors from "../../constants/colors";
import { Trophy, MapPin, Zap, Wallet } from "lucide-react";

const chipIconSize = 14;

const filters = [
  { label: "Топ рейтинг", value: "top", icon: Trophy },
  { label: "Рядом", value: "nearby", icon: MapPin },
  { label: "Сейчас открыто", value: "open", icon: Zap },
  { label: "До 2000₸", value: "cheap", icon: Wallet },
];

function FilterChips({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;
        const Icon = filter.icon;
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            style={{
              backgroundColor: isActive ? colors.accent : colors.light,
              color: isActive ? "#ffffff" : colors.gray,
            }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Icon size={chipIconSize} />
              {filter.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
