import { useState } from "react";
import { useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

function SearchBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
    } else {
      navigate("/search");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative mb-5 max-w-xl">
      <span
        className="absolute left-4 top-1/2 -translate-y-1/2 text-base"
        style={{ color: colors.gray }}
      >
        🔍
      </span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Найти барбершоп или мастера..."
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none"
        style={{
          backgroundColor: colors.light,
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#ffffff",
        }}
      />
    </form>
  );
}

export default SearchBar;
