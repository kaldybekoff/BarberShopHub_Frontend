import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      return;
    }

    navigate("/search");
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full px-6">
      <span
        className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 text-sm"
        style={{ color: "#A8B2C1" }}
      >
        🔍
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Найти барбершоп или мастера..."
        className="w-full rounded-xl border py-3 pl-10 pr-4 text-sm text-white placeholder:text-sm focus:outline-none"
        style={{
          backgroundColor: "#1E2A3A",
          borderColor: "rgba(255,255,255,0.1)",
        }}
      />
    </form>
  );
}

export default SearchBar;
