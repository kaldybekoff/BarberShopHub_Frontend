import { useMemo, useState } from "react";
import { searchMockShops } from "../../data/mockShops";
import ShopCard from "../../components/shop/ShopCard";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("барбершоп");
  const [statusFilter, setStatusFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(null);
  const [priceFilters, setPriceFilters] = useState([]);
  const [priceRange, setPriceRange] = useState(2000);
  const [activeView, setActiveView] = useState("list");

  const toggleStatus = (value) => {
    setStatusFilter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const togglePrice = (value) => {
    setPriceFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filteredShops = useMemo(() => {
    return searchMockShops.filter((shop) => {
      if (
        searchQuery.trim() &&
        !shop.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ) {
        return false;
      }

      if (statusFilter.length > 0 && !statusFilter.includes(shop.status)) {
        return false;
      }

      if (ratingFilter === "top" && shop.rating < 4.8) return false;
      if (ratingFilter === "good" && shop.rating < 4.0) return false;

      if (distanceFilter) {
        const km = parseFloat(shop.distance);
        const limit = Number(distanceFilter);
        if (!Number.isNaN(km) && km > limit) return false;
      }

      if (shop.price > priceRange) return false;

      if (priceFilters.length > 0) {
        const passes = priceFilters.some((limit) => shop.price <= limit);
        if (!passes) return false;
      }

      return true;
    });
  }, [searchQuery, statusFilter, ratingFilter, distanceFilter, priceRange, priceFilters]);

  return (
    <div
      className="flex min-h-[calc(100vh-54px)] w-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <aside
        className="shrink-0"
        style={{
          width: "260px",
          backgroundColor: "#000000",
          padding: "24px",
        }}
      >
        <h1
          className="text-white"
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}
        >
          Поиск
        </h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="барбершоп"
          className="w-full text-white focus:outline-none"
          style={{
            border: "2px solid #E94560",
            backgroundColor: "transparent",
            borderRadius: "10px",
            padding: "10px 14px",
            fontSize: "14px",
          }}
        />

        <h2
          className="text-white"
          style={{ fontWeight: 700, marginTop: "24px", marginBottom: "12px" }}
        >
          Фильтры
        </h2>

        <FilterSection title="Статус">
          <FilterCheckbox
            icon="🟢"
            label="Открыто"
            checked={statusFilter.includes("open")}
            onChange={() => toggleStatus("open")}
          />
          <FilterCheckbox
            icon="🔴"
            label="Скоро откроется"
            checked={statusFilter.includes("soon")}
            onChange={() => toggleStatus("soon")}
          />
        </FilterSection>

        <FilterSection title="Рейтинг">
          <FilterCheckbox
            icon="⭐"
            label="Топ (4.8+)"
            checked={ratingFilter === "top"}
            onChange={() =>
              setRatingFilter(ratingFilter === "top" ? null : "top")
            }
          />
          <FilterCheckbox
            icon="⭐"
            label="Хороший (4.0+)"
            checked={ratingFilter === "good"}
            onChange={() =>
              setRatingFilter(ratingFilter === "good" ? null : "good")
            }
          />
        </FilterSection>

        <FilterSection title="Расстояние">
          <FilterRadio
            icon="📍"
            label="До 1 км"
            checked={distanceFilter === "1"}
            onChange={() =>
              setDistanceFilter(distanceFilter === "1" ? null : "1")
            }
          />
          <FilterRadio
            icon="📍"
            label="До 3 км"
            checked={distanceFilter === "3"}
            onChange={() =>
              setDistanceFilter(distanceFilter === "3" ? null : "3")
            }
          />
          <FilterRadio
            icon="📍"
            label="До 5 км"
            checked={distanceFilter === "5"}
            onChange={() =>
              setDistanceFilter(distanceFilter === "5" ? null : "5")
            }
          />
        </FilterSection>

        <FilterSection title="Цена">
          <FilterCheckbox
            icon="💰"
            label="До 2000₸"
            checked={priceFilters.includes(2000)}
            onChange={() => togglePrice(2000)}
          />
          <FilterCheckbox
            icon="💰"
            label="До 5000₸"
            checked={priceFilters.includes(5000)}
            onChange={() => togglePrice(5000)}
          />

          <input
            type="range"
            min={0}
            max={5000}
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full"
            style={{ accentColor: "#E94560", marginTop: "12px" }}
          />
          <div
            className="flex items-center justify-between"
            style={{ fontSize: "12px", color: "#A8B2C1", marginTop: "6px" }}
          >
            <span>от</span>
            <span>{priceRange}₸</span>
          </div>
        </FilterSection>
      </aside>

      <main
        className="flex-1"
        style={{ padding: "24px", backgroundColor: "#1A1A2E" }}
      >
        <div
          className="flex items-center"
          style={{ gap: "16px", marginBottom: "20px" }}
        >
          <button
            onClick={() => setActiveView("list")}
            className="font-semibold"
            style={{
              padding: "8px 18px",
              fontSize: "14px",
              borderRadius: "10px",
              backgroundColor: activeView === "list" ? "#E94560" : "#1E2A3A",
              color: activeView === "list" ? "#ffffff" : "#A8B2C1",
              cursor: "pointer",
              border: "none",
            }}
          >
            📋 Список
          </button>
          <button
            onClick={() => setActiveView("map")}
            className="font-semibold"
            style={{
              padding: "8px 18px",
              fontSize: "14px",
              borderRadius: "10px",
              backgroundColor: activeView === "map" ? "#E94560" : "#1E2A3A",
              color: activeView === "map" ? "#ffffff" : "#A8B2C1",
              cursor: "pointer",
              border: "none",
            }}
          >
            🗺 Карта
          </button>

          <p
            style={{
              marginLeft: "auto",
              color: "#A8B2C1",
              fontSize: "14px",
            }}
          >
            Найдено: {filteredShops.length} барбершопа
          </p>
        </div>

        {activeView === "map" ? (
          <div
            className="flex items-center justify-center rounded-2xl text-white"
            style={{
              backgroundColor: "#1E2A3A",
              minHeight: "400px",
              fontSize: "16px",
            }}
          >
            🗺 Карта в разработке
          </div>
        ) : filteredShops.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#1E2A3A", padding: "60px 20px" }}
          >
            <p className="text-white" style={{ fontSize: "16px", fontWeight: 600 }}>
              Ничего не найдено
            </p>
            <p style={{ color: "#A8B2C1", fontSize: "14px", marginTop: "6px" }}>
              Попробуйте изменить фильтры
            </p>
          </div>
        ) : (
          <div
            className="grid"
            style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px" }}
          >
            {filteredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function FilterSection({ title, children }) {
  return (
    <div style={{ marginTop: "16px" }}>
      <p
        style={{
          color: "#A8B2C1",
          fontSize: "12px",
          marginBottom: "8px",
        }}
      >
        {title}
      </p>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FilterCheckbox({ icon, label, checked, onChange }) {
  return (
    <label
      className="flex items-center cursor-pointer select-none"
      style={{
        gap: "8px",
        fontSize: "14px",
        color: "#ffffff",
        marginBottom: "4px",
        fontWeight: checked ? 700 : 400,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: "#E94560", display: "none" }}
      />
      <span>{icon}</span>
      <span>{label}</span>
    </label>
  );
}

function FilterRadio({ icon, label, checked, onChange }) {
  return (
    <label
      className="flex items-center cursor-pointer select-none"
      style={{
        gap: "8px",
        fontSize: "14px",
        color: "#ffffff",
        marginBottom: "4px",
        fontWeight: checked ? 700 : 400,
      }}
    >
      <input
        type="radio"
        name="distance"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: "#E94560", display: "none" }}
      />
      <span>{icon}</span>
      <span>{label}</span>
    </label>
  );
}

export default SearchPage;
