import { Link } from "react-router-dom";
import ShopCard from "../shop/ShopCard";

function NearbyShopsSection({ shops }) {
  return (
    <section className="mt-5 px-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Рядом с тобой</h2>
        <Link
          to="/search"
          className="text-sm font-semibold transition-opacity hover:opacity-85"
          style={{ color: "#E94560" }}
        >
          Все →
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  );
}

export default NearbyShopsSection;
