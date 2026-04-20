import { useState, useEffect } from "react";
import GreetingBlock from "../../components/home/GreetingBlock";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";
import { getShops } from "../../api/shopApi";

function HomePage() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    getShops({ per_page: 3 })
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data ?? [];
        setShops(list);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}>
        <GreetingBlock />
        <FilterChips />
        <NearbyShopsSection shops={shops} />
        <PopularServicesSection />
      </div>
    </div>
  );
}

export default HomePage;
