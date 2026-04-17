import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";
import colors from "../../constants/colors";

function ShopHeader({ shop }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl p-6" style={{ backgroundColor: colors.dark }}>
      <button
        onClick={() => navigate(-1)}
        className="text-sm mb-5 flex items-center gap-1"
        style={{ color: colors.gray }}>
        ← Назад
      </button>

      <div className="flex gap-6 items-start">
        {/* фото */}
        {shop.image ? (
          <img
            src={shop.image}
            alt={shop.name}
            className="w-32 h-32 object-cover rounded-xl shrink-0"
          />
        ) : (
          <div
            className="w-32 h-32 rounded-xl flex items-center justify-center text-4xl shrink-0"
            style={{ backgroundColor: colors.light }}>
            <Scissors size={38} style={{ color: colors.accent }} />
          </div>
        )}

        {/* инфо */}
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-xl font-bold text-white">{shop.name}</h1>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
              style={{
                backgroundColor: shop.isOpen ? `${colors.success}20` : `${colors.accent}20`,
                color: shop.isOpen ? colors.success : colors.accent,
              }}>
              {shop.isOpen ? "Открыто" : "Закрыто"}
            </span>
          </div>

          <p className="text-sm" style={{ color: colors.gray }}>{shop.address}</p>

          <div className="flex items-center gap-1">
            <span style={{ color: colors.gold }}>★</span>
            <span className="text-sm font-medium text-white">{shop.rating}</span>
            <span className="text-xs" style={{ color: colors.gray }}>
              ({shop.reviewCount} отзывов)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader;
