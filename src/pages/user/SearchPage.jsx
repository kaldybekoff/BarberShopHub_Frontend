import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mockShops from "../../data/mockShops";
import colors from "../../styles/colors";

const services = [
  { label: "Все", value: "all" },
  { label: "Стрижка", value: "haircut" },
  { label: "Борода", value: "beard" },
  { label: "Комплекс", value: "complex" },
  { label: "Детская", value: "kids" },
];

function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeService, setActiveService] = useState(searchParams.get("service") || "all");

  function handleSearch(e) {
    e.preventDefault();
    const params = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    if (activeService !== "all") params.service = activeService;
    setSearchParams(params);
  }

  function handleServiceClick(value) {
    setActiveService(value);
    const params = {};
    if (searchQuery.trim()) params.q = searchQuery.trim();
    if (value !== "all") params.service = value;
    setSearchParams(params);
  }

  const filteredShops = mockShops.filter((shop) => {
    const matchesQuery = searchQuery.trim()
      ? shop.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      : true;
    // фильтр по сервису пока не применяем, в mock данных нет услуг
    return matchesQuery;
  });

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-6 py-8"
      style={{ backgroundColor: colors.primary }}>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6 max-w-xl">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Найти барбершоп..."
          className="flex-1 px-4 py-3 rounded-xl text-white text-sm focus:outline-none"
          style={{
            backgroundColor: colors.light,
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-xl text-sm font-medium text-white hover:opacity-90 transition-opacity"
          style={{ backgroundColor: colors.accent }}>
          Найти
        </button>
      </form>

      <div className="flex gap-0 border-b mb-6" style={{ borderColor: colors.light }}>
        {services.map((s) => (
          <button
            key={s.value}
            onClick={() => handleServiceClick(s.value)}
            className="px-5 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              color: activeService === s.value ? "#ffffff" : colors.gray,
              borderBottom: activeService === s.value
                ? `2px solid ${colors.accent}`
                : "2px solid transparent",
            }}>
            {s.label}
          </button>
        ))}
      </div>

      <p className="text-sm mb-5" style={{ color: colors.gray }}>
        Найдено: {filteredShops.length} барбершопов
      </p>

      {filteredShops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-white font-semibold text-lg">Ничего не найдено</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            Попробуйте изменить запрос
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="rounded-2xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: colors.light }}>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white text-base">{shop.name}</h3>
                  <p className="text-sm mt-0.5" style={{ color: colors.gray }}>
                    {shop.address} · {shop.distance}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                  style={{
                    backgroundColor: shop.isOpen ? `${colors.success}20` : `${colors.accent}20`,
                    color: shop.isOpen ? colors.success : colors.accent,
                  }}>
                  {shop.isOpen ? "Открыто" : "Закрыто"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span style={{ color: colors.gold }}>★</span>
                  <span className="text-sm text-white font-medium">{shop.rating}</span>
                  <span className="text-xs" style={{ color: colors.gray }}>
                    ({shop.reviewCount})
                  </span>
                </div>
                <span className="text-sm text-white">
                  от {shop.priceFrom} ₸
                </span>
              </div>

              <button
                onClick={() => navigate(`/shops/${shop.id}`)}
                className="w-full py-2 rounded-xl text-sm font-semibold text-white mt-1 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: colors.accent }}>
                Записаться
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default SearchPage;
