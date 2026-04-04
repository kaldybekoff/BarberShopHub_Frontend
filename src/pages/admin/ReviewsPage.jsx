import { useState, useEffect } from "react";
import { getReviews } from "../../api/adminApi";
import ReviewModerationTable from "../../components/admin/ReviewModerationTable";
import EmptyState from "../../components/common/EmptyState";
import SectionTitle from "../../components/common/SectionTitle";
import colors from "../../styles/colors";

const tabs = ["Все", "Ожидает", "Одобрено", "Отклонено"];

const tabFilterMap = {
  Все: null,
  Ожидает: "pending",
  Одобрено: "approved",
  Отклонено: "rejected",
};

function ReviewsPage() {
  const [reviewList, setReviewList] = useState([]);
  const [activeTab, setActiveTab] = useState("Все");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReviews()
      .then((data) => setReviewList(data))
      .finally(() => setIsLoading(false));
  }, []);

  const statusFilter = tabFilterMap[activeTab];
  const filteredReviews = statusFilter
    ? reviewList.filter((review) => review.status === statusFilter)
    : reviewList;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}>
        <p className="text-sm" style={{ color: colors.gray }}>Загрузка...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-6 max-w-4xl mx-auto"
      style={{ backgroundColor: colors.primary }}
    >
      <SectionTitle title="Модерация отзывов" subtitle="Проверка и управление отзывами" />

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

      {filteredReviews.length === 0 ? (
        <EmptyState icon="💬" message="В этой категории пока нет отзывов." />
      ) : (
        <ReviewModerationTable reviewList={filteredReviews} />
      )}
    </div>
  );
}

export default ReviewsPage;
