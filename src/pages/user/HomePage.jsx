import { homeMockShops } from "../../data/mockShops";
import GreetingBlock from "../../components/home/GreetingBlock";
import SearchBar from "../../components/home/SearchBar";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";

function HomePage() {
  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 40px" }}
      >
        <GreetingBlock />
        <SearchBar />
        <FilterChips />
        <NearbyShopsSection shops={homeMockShops} />
        <PopularServicesSection />
      </div>
    </div>
  );
}

export default HomePage;
