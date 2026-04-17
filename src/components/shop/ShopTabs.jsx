const tabs = [
  { key: "services", label: "Услуги" },
  { key: "masters", label: "Мастера" },
  { key: "reviews", label: "Отзывы" },
  { key: "photos", label: "Фото" },
];

function ShopTabs({ activeTab, onChange }) {
  return (
    <div
      className="flex"
      style={{
        gap: 0,
        borderBottom: "1px solid #2a3a4a",
        marginBottom: "24px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            style={{
              padding: "12px 20px",
              fontSize: "15px",
              cursor: "pointer",
              color: isActive ? "#E94560" : "#A8B2C1",
              fontWeight: isActive ? 600 : 400,
              backgroundColor: "transparent",
              border: "none",
              borderBottom: isActive
                ? "2px solid #E94560"
                : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default ShopTabs;
