const AnalyticsPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Аналитика</h2>
      
      <div className="bg-[#1C1F26] p-6 rounded-2xl mb-6">
        <p className="text-[#9BA1A6] mb-2">Общая выручка за месяц</p>
        <h3 className="text-4xl font-bold text-[#FF4961]">1 850 000 ₸</h3>
        <p className="text-green-500 text-sm mt-2">+12% с прошлого месяца</p>
      </div>
      
      <div className="bg-[#1C1F26] h-48 rounded-2xl flex items-center justify-center text-[#9BA1A6]">
        [График выручки]
      </div>
    </div>
  );
};
export default AnalyticsPage;
