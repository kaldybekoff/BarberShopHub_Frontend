const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Модерация отзывов</h2>
      <div className="bg-[#1C1F26] p-4 rounded-2xl">
        <p className="text-[#9BA1A6] text-sm mb-2">Отзыв на модерации</p>
        <p className="mb-4">"Плохо постригли, не рекомендую..."</p>
        <button className="text-[#FF4961] text-sm font-bold">Удалить отзыв</button>
      </div>
    </div>
  );
};
export default ReviewsPage;
