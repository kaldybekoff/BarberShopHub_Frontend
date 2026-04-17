import { useMemo, useState } from "react";
import { homeMockShops } from "../../data/mockShops";
import GreetingBlock from "../../components/home/GreetingBlock";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("top");

  const filteredShops = useMemo(() => {
    let shops = [...homeMockShops];

    if (activeFilter === "open") {
      shops = shops.filter((shop) => shop.isOpen);
    } else if (activeFilter === "cheap") {
      shops = shops.filter((shop) => shop.priceFrom <= 2000);
    } else if (activeFilter === "top") {
      shops = [...shops].sort((a, b) => b.rating - a.rating);
    }

    return shops;
  }, [activeFilter]);

  return (
    <div
      className="min-h-full pb-8 pt-5 font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <section className="mx-auto w-full max-w-[980px]">
        <GreetingBlock />

        <div className="mt-3">
          <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </div>

        <NearbyShopsSection shops={filteredShops} />
        <PopularServicesSection />
      </section>
    </div>
  );
}

export default HomePage;
