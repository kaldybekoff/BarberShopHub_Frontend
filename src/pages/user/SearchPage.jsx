import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mockShops from "../../data/mockShops";

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
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: "#1A1A2E" }}>

      {/* поиск */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Найти барбершоп..."
          className="flex-1 px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
          style={{ backgroundColor: "#1E2A3A" }}
        />
        <button
          type="submit"
          className="px-4 py-3 rounded-xl text-sm font-medium text-white"
          style={{ backgroundColor: "#E94560" }}>
          Найти
        </button>
      </form>

      {/* фильтры */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {services.map((s) => (
          <button
            key={s.value}
            onClick={() => handleServiceClick(s.value)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              backgroundColor: activeService === s.value ? "#E94560" : "#1E2A3A",
              color: activeService === s.value ? "#ffffff" : "#A8B2C1",
            }}>
            {s.label}
          </button>
        ))}
      </div>

      {/* счётчик */}
      <p className="text-sm mb-4" style={{ color: "#A8B2C1" }}>
        Найдено: {filteredShops.length} барбершопов
      </p>

      {/* список */}
      {filteredShops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
          <p className="text-white font-semibold text-lg">Ничего не найдено</p>
          <p className="text-sm" style={{ color: "#A8B2C1" }}>
            Попробуйте изменить запрос
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredShops.map((shop) => (
            <div
              key={shop.id}
              className="rounded-2xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: "#16213E" }}>

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-white text-base">{shop.name}</h3>
                  <p className="text-xs mt-0.5" style={{ color: "#A8B2C1" }}>
                    {shop.address} · {shop.distance}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-full font-medium"
                  style={{
                    backgroundColor: shop.isOpen ? "#1a3a2a" : "#2a1a1a",
                    color: shop.isOpen ? "#48BB78" : "#E94560",
                  }}>
                  {shop.isOpen ? "Открыто" : "Закрыто"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span style={{ color: "#F5A623" }}>★</span>
                  <span className="text-sm text-white font-medium">{shop.rating}</span>
                  <span className="text-xs" style={{ color: "#A8B2C1" }}>
                    ({shop.reviewCount})
                  </span>
                </div>
                <span className="text-sm" style={{ color: "#A8B2C1" }}>
                  от {shop.priceFrom} ₸
                </span>
              </div>

              <button
                onClick={() => navigate(`/shops/${shop.id}`)}
                className="w-full py-2 rounded-xl text-sm font-semibold text-white mt-1 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#E94560" }}>
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
