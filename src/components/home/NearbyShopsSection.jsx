import { Link } from "react-router-dom";
import ShopCard from "../shop/ShopCard";

function NearbyShopsSection({ shops }) {
  return (
    <section>
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "16px" }}
      >
        <h2
          className="text-white"
          style={{ fontSize: "20px", fontWeight: 700 }}
        >
          Рядом с тобой
        </h2>
        <Link
          to="/search"
          className="transition-opacity hover:opacity-85"
          style={{
            color: "#E94560",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Все →
        </Link>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "20px",
        }}
      >
        {shops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} variant="home" />
        ))}
      </div>
    </section>
  );
}

export default NearbyShopsSection;
