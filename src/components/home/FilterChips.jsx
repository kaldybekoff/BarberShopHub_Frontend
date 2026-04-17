const filters = [
  { label: "🏆 Топ рейтинг", value: "top" },
  { label: "📍 Рядом", value: "nearby" },
  { label: "⚡ Сейчас открыто", value: "open" },
  { label: "💰 До 2000₸", value: "cheap" },
];

function FilterChips({ activeFilter, onFilterChange }) {
  return (
    <div className="mb-5 flex gap-2 overflow-x-auto px-6 pb-1">
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className="shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-85"
            style={{
              backgroundColor: isActive ? "#E94560" : "#1E2A3A",
              color: "#ffffff",
              border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default FilterChips;
