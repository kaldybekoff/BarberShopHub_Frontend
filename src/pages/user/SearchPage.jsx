import { useMemo, useState, useEffect, useRef } from "react";
import ShopCard from "../../components/shop/ShopCard";
import { getShops } from "../../api/shopApi";

function normalizeShop(s) {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    rating: s.rating ?? 0,
    reviews: s.reviews_count ?? 0,
    distance: s.distance_km != null ? `${s.distance_km} км` : "",
    distanceKm: s.distance_km ?? null,
    price: s.price_from ?? 0,
    status: s.status ?? "closed",
  };
}

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [ratingFilter, setRatingFilter] = useState(null);
  const [allShops, setAllShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userCoords, setUserCoords] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
  }, []);

  function requestLocation() {
    if (!navigator.geolocation) return;
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoLoading(false);
      },
      () => {
        alert("Не удалось определить местоположение. Проверьте настройки браузера.");
        setGeoLoading(false);
      }
    );
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setLoading(true);
      const params = { per_page: 50 };
      if (searchQuery) params.search = searchQuery;
      if (onlyOpen) params.is_open = true;
      if (orderBy) params.order_by = orderBy;
      if (userCoords) {
        params.user_lat = userCoords.lat;
        params.user_lng = userCoords.lng;
      }
      getShops(params)
        .then((data) => {
          const list = Array.isArray(data) ? data : data.data ?? [];
          setAllShops(list.map(normalizeShop));
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [searchQuery, onlyOpen, orderBy, userCoords]);

  const filteredShops = useMemo(() => {
    let list = allShops.filter((shop) => {
      if (ratingFilter === "top" && shop.rating < 4.8) return false;
      if (ratingFilter === "good" && shop.rating < 4.0) return false;
      return true;
    });
    if (orderBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [allShops, ratingFilter, orderBy]);

  return (
    <div
      className="flex min-h-[calc(100vh-54px)] w-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <aside
        className="shrink-0"
        style={{ width: "260px", backgroundColor: "#000000", padding: "24px" }}
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

        <h2 className="text-white" style={{ fontWeight: 700, marginTop: "24px", marginBottom: "12px" }}>
          Фильтры
        </h2>

        <FilterSection title="Сортировка">
          <select
            value={orderBy}
            onChange={(e) => setOrderBy(e.target.value)}
            style={{
              width: "100%",
              backgroundColor: "#1E2A3A",
              border: "1px solid #2a3a4a",
              borderRadius: "8px",
              padding: "8px 10px",
              color: "#ffffff",
              fontSize: "13px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <option value="">По умолчанию</option>
            <option value="rating">По рейтингу</option>
            {userCoords && <option value="distance">По расстоянию</option>}
          </select>
        </FilterSection>

        <FilterSection title="Статус">
          <FilterCheckbox
            icon="🟢"
            label="Только открытые"
            checked={onlyOpen}
            onChange={() => setOnlyOpen((v) => !v)}
          />
        </FilterSection>

        <FilterSection title="Рейтинг">
          <FilterCheckbox
            icon="⭐"
            label="Топ (4.8+)"
            checked={ratingFilter === "top"}
            onChange={() => setRatingFilter(ratingFilter === "top" ? null : "top")}
          />
          <FilterCheckbox
            icon="⭐"
            label="Хороший (4.0+)"
            checked={ratingFilter === "good"}
            onChange={() => setRatingFilter(ratingFilter === "good" ? null : "good")}
          />
        </FilterSection>

        <FilterSection title="Моё местоположение">
          {userCoords ? (
            <div className="flex items-center" style={{ gap: "6px" }}>
              <span style={{ color: "#48BB78", fontSize: "13px" }}>✓ Определено</span>
              <button
                type="button"
                onClick={requestLocation}
                style={{ color: "#A8B2C1", fontSize: "11px", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
              >
                обновить
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={requestLocation}
              disabled={geoLoading}
              style={{
                width: "100%",
                backgroundColor: "#1E2A3A",
                border: "1px solid #2a3a4a",
                borderRadius: "8px",
                padding: "9px 12px",
                color: geoLoading ? "#A8B2C1" : "#ffffff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: geoLoading ? "not-allowed" : "pointer",
                textAlign: "left",
              }}
            >
              {geoLoading ? "Определяем..." : "📍 Определить местоположение"}
            </button>
          )}
        </FilterSection>

      </aside>

      <main className="flex-1" style={{ padding: "24px", backgroundColor: "#1A1A2E" }}>
        <div className="flex items-center" style={{ marginBottom: "20px" }}>
          <p style={{ marginLeft: "auto", color: "#A8B2C1", fontSize: "14px" }}>
            {loading ? "Поиск..." : `Найдено: ${filteredShops.length}`}
          </p>
        </div>

        {loading ? (
          <div
            className="flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: "#1E2A3A", padding: "60px 20px" }}
          >
            <p style={{ color: "#A8B2C1", fontSize: "14px" }}>Загрузка...</p>
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
      {title && <p style={{ color: "#A8B2C1", fontSize: "12px", marginBottom: "8px" }}>{title}</p>}
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
