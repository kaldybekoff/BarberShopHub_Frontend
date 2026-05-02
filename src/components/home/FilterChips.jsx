import { useState } from "react";

const filters = [
  { label: "🏆 Top rated", value: "top" },
  { label: "📍 Nearby", value: "nearby" },
  { label: "⚡ Open now", value: "open" },
  { label: "💰 Under 2000₸", value: "cheap" },
];

function FilterChips() {
  const [activeFilter, setActiveFilter] = useState("top");

  return (
    <div
      className="flex"
      style={{
        gap: "10px",
        marginBottom: "32px",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      {filters.map((filter) => {
        const isActive = filter.value === activeFilter;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => setActiveFilter(filter.value)}
            className="shrink-0 whitespace-nowrap transition-opacity hover:opacity-85"
            style={{
              backgroundColor: isActive ? "#E94560" : "#1E2A3A",
              color: "#ffffff",
              borderRadius: "999px",
              padding: "8px 18px",
              fontSize: "14px",
              fontWeight: isActive ? 600 : 400,
              border: isActive ? "none" : "1px solid #2a3a4a",
              cursor: "pointer",
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
