import colors from "../../constants/colors";

const tabs = [
  { key: "upcoming", label: "Предстоящие" },
  { key: "past", label: "Прошедшие" },
];

function AppointmentTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className="flex-1 py-2.5 text-sm font-medium transition-colors rounded-xl"
          style={{
            backgroundColor: activeTab === tab.key ? colors.accent : colors.light,
            color: activeTab === tab.key ? "#ffffff" : colors.gray,
          }}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default AppointmentTabs;
