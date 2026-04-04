import colors from "../../styles/colors";

const tabs = [
  { key: "upcoming", label: "Предстоящие" },
  { key: "past", label: "Прошедшие" },
];

function AppointmentTabs({ activeTab, onTabChange }) {
  return (
    <div
      className="flex mb-5 rounded-xl overflow-hidden"
      style={{ backgroundColor: colors.dark }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className="flex-1 py-2.5 text-sm font-medium transition-colors rounded-xl"
          style={{
            backgroundColor: activeTab === tab.key ? colors.accent : "transparent",
            color: activeTab === tab.key ? "#fff" : colors.gray,
          }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AppointmentTabs;
