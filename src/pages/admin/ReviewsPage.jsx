import { useState } from "react";
import { reviewList } from "../../data/mockAdminStats";
import ReviewModerationTable from "../../components/admin/ReviewModerationTable";
import colors from "../../styles/colors";

const tabs = ["Все", "Ожидает", "Одобрено", "Отклонено"];

const tabFilterMap = {
  Все: null,
  Ожидает: "pending",
  Одобрено: "approved",
  Отклонено: "rejected",
};

function ReviewsPage() {
  const [activeTab, setActiveTab] = useState("Все");

  const statusFilter = tabFilterMap[activeTab];
  const filteredReviews = statusFilter
    ? reviewList.filter((review) => review.status === statusFilter)
    : reviewList;

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold">Модерация отзывов</h1>
        <p className="text-sm mt-1" style={{ color: colors.gray }}>
          Проверка и управление отзывами
        </p>
      </div>

      {/* Табы */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
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
      {filteredReviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="text-4xl">💬</span>
          <p className="text-white font-medium">Отзывов нет</p>
          <p className="text-sm" style={{ color: colors.gray }}>
            В этой категории пока ничего нет
          </p>
        </div>
      ) : (
        <ReviewModerationTable reviewList={filteredReviews} />
      )}
    </div>
  );
}

export default ReviewsPage;
