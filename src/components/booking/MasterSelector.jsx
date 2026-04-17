function MasterSelector({ masters, selectedId, onSelect }) {
  return (
    <div className="flex" style={{ gap: "16px" }}>
      {masters.map((master) => {
        const isSelected = selectedId === master.id;

        return (
          <button
            key={master.id}
            type="button"
            onClick={() => onSelect(master)}
            className="flex flex-col items-center"
            style={{
              gap: "8px",
              cursor: "pointer",
              background: "transparent",
              border: "none",
              padding: 0,
            }}
          >
            <div
              className="flex items-center justify-center text-white"
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: isSelected ? "#E94560" : "#1E2A3A",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              {master.initials}
            </div>

            <div
              style={{
                borderBottom: isSelected ? "2px solid #E94560" : "none",
                paddingBottom: isSelected ? "4px" : 0,
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: isSelected ? "#E94560" : "#ffffff",
                  textAlign: "center",
                }}
              >
                {master.name}
              </p>
            </div>

            {master.rating != null && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#A8B2C1",
                }}
              >
                <span style={{ color: "#F5A623" }}>★</span> {master.rating}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default MasterSelector;
