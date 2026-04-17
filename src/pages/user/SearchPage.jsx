import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Wallet, List, Map, Scissors } from "lucide-react";
import mockShops from "../../data/mockShops";
import colors from "../../constants/colors";

const iconSize = {
  sm: 14,
  md: 16,
  lg: 34,
};

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [statusFilter, setStatusFilter] = useState("all"); // all | open | soon
  const [ratingFilter, setRatingFilter] = useState("all"); // all | top | good
  const [distanceFilter, setDistanceFilter] = useState("all"); // all | 1 | 3 | 5
  const [maxPrice, setMaxPrice] = useState(5000);

  function handleSearch(e) {
    e.preventDefault();
    const params = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    setSearchParams(params);
  }

  const filteredShops = mockShops.filter((shop) => {
    if (searchQuery.trim() && !shop.name.toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      return false;
    }
    if (statusFilter === "open" && !shop.isOpen) return false;
    if (ratingFilter === "top" && shop.rating < 4.8) return false;
    if (ratingFilter === "good" && shop.rating < 4.0) return false;
    if (shop.priceFrom > maxPrice) return false;
    return true;
  });

  return (
    <div className="flex min-h-full" style={{ backgroundColor: colors.primary }}>

      {/* sidebar с фильтрами */}
      <aside
        className="hidden lg:block w-72 xl:w-80 shrink-0 px-5 py-6 sticky top-14 self-start h-[calc(100vh-56px)] overflow-y-auto"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <h2 className="text-base font-bold text-white mb-4">Поиск</h2>

        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="барбершоп"
            className="w-full px-3 py-2.5 rounded-xl text-white text-sm focus:outline-none"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${colors.accent}`,
            }}
          />
        </form>

        <div className="flex flex-col gap-5">

          {/* Статус */}
          <div>
            <p className="text-xs font-semibold text-white mb-2">Статус</p>
            <div className="flex flex-col gap-2">
              {[
                { value: "open", label: "Открыто", dot: colors.success },
                { value: "soon", label: "Скоро открывается", dot: "#F6AD55" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    checked={statusFilter === opt.value}
                    onChange={() =>
                      setStatusFilter(statusFilter === opt.value ? "all" : opt.value)
                    }
                    className="hidden"
                  />
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: opt.dot }}
                  />
                  <span
                    className="text-sm"
                    style={{
                      color: statusFilter === opt.value ? "#ffffff" : colors.gray,
                    }}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Рейтинг */}
          <div>
            <p className="text-xs font-semibold text-white mb-2">Рейтинг</p>
            <div className="flex flex-col gap-2">
              {[
                { value: "top", label: "Топ (4.8+)" },
                { value: "good", label: "Хороший (4.0+)" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setRatingFilter(ratingFilter === opt.value ? "all" : opt.value)
                  }
                  className="flex items-center gap-2 text-left"
                >
                  <span style={{ color: colors.gold }}>★</span>
                  <span
                    className="text-sm"
                    style={{
                      color: ratingFilter === opt.value ? "#ffffff" : colors.gray,
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Расстояние */}
          <div>
            <p className="text-xs font-semibold text-white mb-2">Расстояние</p>
            <div className="flex flex-col gap-2">
              {["До 1 км", "До 3 км", "До 5 км"].map((label) => (
                <button
                  key={label}
                  onClick={() =>
                    setDistanceFilter(distanceFilter === label ? "all" : label)
                  }
                  className="flex items-center gap-2 text-left"
                >
                  <MapPin size={iconSize.sm} />
                  <span
                    className="text-sm"
                    style={{
                      color: distanceFilter === label ? "#ffffff" : colors.gray,
                    }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Цена */}
          <div>
            <p className="text-xs font-semibold text-white mb-2">Цена</p>
            <div className="flex flex-col gap-2">
              {[
                { label: "До 2000₸", value: 2000 },
                { label: "До 5000₸", value: 5000 },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setMaxPrice(opt.value)}
                  className="flex items-center gap-2 text-left"
                >
                  <Wallet size={iconSize.sm} />
                  <span
                    className="text-sm"
                    style={{
                      color: maxPrice === opt.value ? "#ffffff" : colors.gray,
                    }}
                  >
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="range"
              min={0}
              max={5000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full mt-3"
              style={{ accentColor: colors.accent }}
            />
            <div
              className="flex justify-between text-xs mt-1"
              style={{ color: colors.gray }}
            >
              <span>от</span>
              <span>{maxPrice.toLocaleString("ru-RU")}₸</span>
            </div>
          </div>

        </div>
      </aside>

      {/* основной контент */}
      <main className="flex-1 px-4 md:px-6 py-6">
        <div className="max-w-7xl mx-auto">

        {/* мобильная форма поиска */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-5 md:hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Найти барбершоп..."
            className="flex-1 px-4 py-2.5 rounded-xl text-white text-sm focus:outline-none"
            style={{
              backgroundColor: colors.light,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-white"
            style={{ backgroundColor: colors.accent }}
          >
            Найти
          </button>
        </form>

        {/* переключатель список/карта */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex rounded-xl overflow-hidden" style={{ backgroundColor: colors.light }}>
            <button
              className="px-4 py-2 text-sm font-medium text-white flex items-center gap-1.5"
              style={{ backgroundColor: colors.accent }}
            >
              <List size={iconSize.sm} />
              Список
            </button>
            <button
              className="px-4 py-2 text-sm font-medium flex items-center gap-1.5"
              style={{ color: colors.gray }}
            >
              <Map size={iconSize.sm} />
              Карта
            </button>
          </div>
          <p className="text-sm sm:text-right" style={{ color: colors.gray }}>
            Найдено: {filteredShops.length} барбершопа
          </p>
        </div>

        {filteredShops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-white font-semibold text-lg">Ничего не найдено</p>
            <p className="text-sm" style={{ color: colors.gray }}>
              Попробуйте изменить фильтры
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredShops.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onBook={() => navigate(`/shops/${shop.id}`)}
              />
            ))}
          </div>
        )}
        </div>
      </main>

    </div>
  );
}

function ShopCard({ shop, onBook }) {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* фото-плейсхолдер */}
      <div
        className="relative h-40 flex items-center justify-center text-4xl"
        style={{ backgroundColor: colors.dark }}
      >
        <Scissors size={iconSize.lg} style={{ color: colors.accent }} />
        <span
          className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full font-medium"
          style={{
            backgroundColor: shop.isOpen
              ? "rgba(72,187,120,0.15)"
              : "rgba(246,173,85,0.15)",
            color: shop.isOpen ? "#48BB78" : "#F6AD55",
          }}
        >
          {shop.isOpen ? "● Открыто" : "● Скоро"}
        </span>
      </div>

      {/* инфо */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-white text-base">{shop.name}</h3>
            <p className="text-sm mt-0.5" style={{ color: colors.gray }}>
              {shop.distance} · {shop.address}
            </p>
          </div>
          <span
            className="text-sm font-semibold shrink-0"
            style={{ color: colors.accent }}
          >
            от {shop.priceFrom.toLocaleString("ru-RU")}₸
          </span>
        </div>

        <div className="flex items-center gap-1">
          <span style={{ color: colors.gold }}>★</span>
          <span className="text-sm text-white font-medium">{shop.rating}</span>
          <span className="text-xs" style={{ color: colors.gray }}>
            ({shop.reviewCount})
          </span>
        </div>

        <button
          onClick={onBook}
          className="w-full py-2.5 rounded-xl text-sm font-semibold text-white mt-1 hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}
        >
          Записаться
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
