import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

function ShopCard({ shop }) {
  const navigate = useNavigate();

  return (
    <div
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
          <span className="text-xs" style={{ color: colors.gray }}>({shop.reviewCount})</span>
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
  );
}

export default ShopCard;
