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
    <form
      onSubmit={handleSubmit}
      className="flex items-center"
      style={{
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        marginBottom: "24px",
        backgroundColor: "#1E2A3A",
        borderRadius: "14px",
        padding: "14px 20px",
        gap: "10px",
      }}
    >
      <span style={{ fontSize: "16px", color: "#A8B2C1" }}>🔍</span>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Найти барбершоп или мастера..."
        className="text-white focus:outline-none"
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          width: "100%",
          fontSize: "15px",
        }}
      />
    </form>
  );
}

export default SearchBar;
