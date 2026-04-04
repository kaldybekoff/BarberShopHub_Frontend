import { Link, useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

function NearbyShopsSection({ shops }) {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-white">Рядом с тобой</h2>
        <Link to="/search" className="text-sm" style={{ color: colors.accent }}>
          Все →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="rounded-2xl p-4 flex flex-col gap-2"
            style={{ backgroundColor: colors.light }}
          >
            {/* Плейсхолдер картинки */}
            <div
              className="w-full h-28 rounded-xl flex items-center justify-center text-3xl mb-1"
              style={{ backgroundColor: colors.dark }}
            >
              ✂️
            </div>

            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white text-sm leading-tight">{shop.name}</h3>
              <span
                className="text-xs px-2 py-0.5 rounded-full shrink-0 font-medium"
                style={{
                  backgroundColor: shop.isOpen ? `${colors.success}20` : `${colors.accent}20`,
                  color: shop.isOpen ? colors.success : colors.accent,
                }}
              >
                {shop.isOpen ? "Открыто" : "Закрыто"}
              </span>
            </div>

            <p className="text-sm" style={{ color: colors.gray }}>
              {shop.address} · {shop.distance}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span style={{ color: colors.gold }}>★</span>
                <span className="text-sm text-white font-medium">{shop.rating}</span>
                <span className="text-xs" style={{ color: colors.gray }}>({shop.reviewCount})</span>
              </div>
              <span className="text-sm text-white">от {shop.priceFrom} ₸</span>
            </div>

            <button
              onClick={() => navigate(`/shops/${shop.id}`)}
              className="w-full py-2 rounded-xl text-sm font-semibold text-white mt-1 hover:opacity-90 transition-opacity"
              style={{ backgroundColor: colors.accent }}
            >
              Записаться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NearbyShopsSection;
