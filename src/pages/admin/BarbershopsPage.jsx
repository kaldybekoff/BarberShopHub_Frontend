import { useState } from "react";
import { barbershopList } from "../../data/mockAdminStats";
import BarbershopsTable from "../../components/admin/BarbershopsTable";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
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
      <SectionTitle title="Барбершопы" subtitle="Управление барбершопами платформы" />

      <div className="mb-4">
        <Input
          placeholder="Поиск по названию или адресу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

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

      {filteredBarbershops.length === 0 ? (
        <EmptyState icon="✂️" message="Барбершопы не найдены. Попробуйте изменить запрос или фильтр." />
      ) : (
        <BarbershopsTable barbershopList={filteredBarbershops} />
      )}
    </div>
  );
}

export default BarbershopsPage;
