import { useState } from "react";
import mockShops from "../../data/mockShops";
import GreetingBlock from "../../components/home/GreetingBlock";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";
import colors from "../../constants/colors";

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("top");

  const filteredShops = (() => {
    if (activeFilter === "open") return mockShops.filter((s) => s.isOpen);
    if (activeFilter === "top") return [...mockShops].sort((a, b) => b.rating - a.rating);
    if (activeFilter === "cheap") return mockShops.filter((s) => s.priceFrom <= 2000);
    return mockShops;
  })();

  return (
    <div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8"
      style={{ backgroundColor: colors.primary }}
    >
      <GreetingBlock />
      <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <NearbyShopsSection shops={filteredShops} />
      <PopularServicesSection />
    </div>
  );
}

export default HomePage;
