import colors from "../../styles/colors";

const filters = ["Рядом", "Топ", "Открыто сейчас"];

function FilterChips({ activeFilter, onFilterChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
      {filters.map((filter) => {
        const isActive = filter === activeFilter;
        return (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: isActive ? colors.accent : colors.light,
              color: isActive ? "#ffffff" : colors.gray,
            }}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
