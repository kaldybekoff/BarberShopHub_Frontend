import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

function ShopHeader({ shop }) {
  const navigate = useNavigate();

  return (
    <div className="px-4 pt-6 pb-4" style={{ backgroundColor: colors.dark }}>
      <button
        onClick={() => navigate(-1)}
        className="text-sm mb-4 flex items-center gap-1"
        style={{ color: colors.gray }}>
        ← Назад
      </button>

      {shop.image ? (
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-44 object-cover rounded-2xl mb-4"
        />
      ) : (
        <div
          className="w-full h-44 rounded-2xl flex items-center justify-center mb-4 text-4xl"
          style={{ backgroundColor: colors.light }}>
          ✂
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">{shop.name}</h1>
          <p className="text-sm mt-1" style={{ color: colors.gray }}>{shop.address}</p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium mt-1"
          style={{
            backgroundColor: shop.isOpen ? "#1a3a2a" : "#2a1a1a",
            color: shop.isOpen ? colors.success : colors.accent,
          }}>
          {shop.isOpen ? "Открыто" : "Закрыто"}
        </span>
      </div>

      <div className="flex items-center gap-1 mt-2">
        <span style={{ color: colors.gold }}>★</span>
        <span className="text-sm font-medium text-white">{shop.rating}</span>
        <span className="text-xs" style={{ color: colors.gray }}>
          ({shop.reviewCount} отзывов)
        </span>
      </div>
    </div>
  );
}

export default ShopHeader;
