import { useState } from "react";
import mockShops from "../../data/mockShops";
import GreetingBlock from "../../components/home/GreetingBlock";
import SearchBar from "../../components/home/SearchBar";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";
import colors from "../../styles/colors";

function HomePage() {
  const [activeFilter, setActiveFilter] = useState("Рядом");

  const filteredShops = activeFilter === "Открыто сейчас"
    ? mockShops.filter((shop) => shop.isOpen)
    : activeFilter === "Топ"
    ? [...mockShops].sort((a, b) => b.rating - a.rating)
    : mockShops;

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-8"
      style={{ backgroundColor: colors.primary }}
    >
      <GreetingBlock />
      <SearchBar />
      <FilterChips activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <NearbyShopsSection shops={filteredShops} />
      <PopularServicesSection />
    </div>
  );
}

export default HomePage;
