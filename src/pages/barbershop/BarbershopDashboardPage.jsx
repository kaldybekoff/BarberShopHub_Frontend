const BarbershopDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <header className="flex justify-between items-center mb-8 mt-4">
        <h2 className="text-2xl font-bold">Панель управления</h2>
        <div className="w-10 h-10 bg-[#1C1F26] rounded-full flex items-center justify-center text-xs">Bro</div>
      </header>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#1C1F26] p-4 rounded-2xl">
          <p className="text-[#9BA1A6] text-sm mb-1">Выручка за сегодня</p>
          <p className="text-2xl font-bold text-[#FF4961]">200 000 ₸</p>
        </div>
        <div className="bg-[#1C1F26] p-4 rounded-2xl">
          <p className="text-[#9BA1A6] text-sm mb-1">Записи</p>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4">Предстоящие сегодня</h3>
      <div className="space-y-4">
        <div className="bg-[#1C1F26] p-4 rounded-2xl flex justify-between items-center">
          <div>
            <h4 className="font-bold">10:00 - Мадияр</h4>
            <p className="text-[#9BA1A6] text-sm">Стрижка и борода</p>
          </div>
          <button className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm">Начать</button>
        </div>
      </div>
    </div>
  );
};
export default BarbershopDashboardPage;
