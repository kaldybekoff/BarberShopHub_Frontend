import { useState } from "react";
import { barbershopList } from "../../data/mockAdminStats";
import BarbershopsTable from "../../components/admin/BarbershopsTable";
import colors from "../../styles/colors";

const tabs = ["Все", "Активные", "Заблокированные"];

const tabFilterMap = {
  Все: null,
  Активные: "active",
  Заблокированные: "blocked",
};

function BarbershopsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Все");

  const statusFilter = tabFilterMap[activeTab];

  const filteredBarbershops = barbershopList.filter((shop) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      shop.name.toLowerCase().includes(query) ||
      shop.address.toLowerCase().includes(query);
    const matchesTab = statusFilter ? shop.status === statusFilter : true;
    return matchesSearch && matchesTab;
  });

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Барбершопы</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Управление барбершопами платформы
        </p>
      </div>

      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию или адресу..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4"
        style={{
          backgroundColor: colors.light,
          border: `1px solid ${colors.dark}`,
          color: "#ffffff",
        }}
      />

      {/* Табы */}
      <div className="flex gap-2 mb-5">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                backgroundColor: isActive ? colors.accent : colors.light,
                color: isActive ? "#ffffff" : colors.gray,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Таблица или EmptyState */}
      {filteredBarbershops.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl">✂️</span>
          <p className="text-white font-medium">Барбершопы не найдены</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            Попробуйте изменить запрос или фильтр
          </p>
        </div>
      ) : (
        <BarbershopsTable barbershopList={filteredBarbershops} />
      )}
    </div>
  );
}

export default BarbershopsPage;
