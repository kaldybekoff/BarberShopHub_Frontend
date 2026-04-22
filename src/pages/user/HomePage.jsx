import { useState, useEffect } from "react";
import GreetingBlock from "../../components/home/GreetingBlock";
import FilterChips from "../../components/home/FilterChips";
import NearbyShopsSection from "../../components/home/NearbyShopsSection";
import PopularServicesSection from "../../components/home/PopularServicesSection";
import { getShops } from "../../api/shopApi";

function HomePage() {
  const [shops, setShops] = useState([]);
  const [userCoords, setUserCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => {}
    );
  }, []);

  useEffect(() => {
    const params = { per_page: 6 };
    if (userCoords) {
      params.user_lat = userCoords.lat;
      params.user_lng = userCoords.lng;
      params.order_by = "distance";
    }
    getShops(params)
      .then((data) => {
        const list = Array.isArray(data) ? data : data.data ?? [];
        setShops(list);
      })
      .catch((e) => console.error(e));
  }, [userCoords]);

  return (
    <div
      className="min-h-full font-['Plus_Jakarta_Sans',system-ui]"
      style={{ backgroundColor: "#1A1A2E" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }} className="px-4 py-6 md:px-10 md:py-10">
        <GreetingBlock />
        <FilterChips />
        <NearbyShopsSection shops={shops} />
        <PopularServicesSection />
      </div>
    </div>
  );
}

export default HomePage;
