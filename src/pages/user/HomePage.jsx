import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import mockShops from "../../data/mockShops";

const popularServices = [
  { label: "Стрижка", value: "haircut" },
  { label: "Борода", value: "beard" },
  { label: "Комплекс", value: "complex" },
  { label: "Детская", value: "kids" },
];

function HomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const nearbyShops = mockShops;

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    } else {
      navigate("/search");
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto"
      style={{ backgroundColor: "#1A1A2E" }}>

      {/* приветствие */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          Привет, {user?.name || "друг"} 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: "#A8B2C1" }}>
          Найди барбершоп рядом
        </p>
      </div>

      {/* поиск */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
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
          className="px-4 py-3 rounded-xl font-medium text-white text-sm"
          style={{ backgroundColor: "#E94560" }}>
          Найти
        </button>
      </form>

      {/* популярные услуги */}
      <div className="mb-8">
        <h2 className="text-base font-semibold text-white mb-3">Популярные услуги</h2>
        <div className="flex gap-2 flex-wrap">
          {popularServices.map((s) => (
            <button
              key={s.value}
              onClick={() => navigate(`/search?service=${s.value}`)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-80"
              style={{ backgroundColor: "#1E2A3A", color: "#A8B2C1" }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* рядом с тобой */}
      <div>
        <h2 className="text-base font-semibold text-white mb-3">Рядом с тобой</h2>
        <div className="flex flex-col gap-3">
          {nearbyShops.map((shop) => (
            <div
              key={shop.id}
              className="rounded-2xl p-4 flex flex-col gap-2"
              style={{ backgroundColor: "#16213E" }}>

              {/* шапка карточки */}
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

              {/* рейтинг и цена */}
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
      </div>

    </div>
  );
}

export default HomePage;
