const BookingsPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Управление записями</h2>
      
      <div className="flex gap-4 border-b border-[#1C1F26] pb-2 mb-6">
        <button className="text-[#FF4961] font-semibold border-b-2 border-[#FF4961] pb-2">Новые (2)</button>
        <button className="text-[#9BA1A6] font-semibold pb-2">Подтвержденные</button>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1C1F26] p-4 rounded-2xl">
          <div className="flex justify-between mb-4">
            <div>
              <p className="font-bold text-lg">Руслан</p>
              <p className="text-[#9BA1A6] text-sm">Стрижка и борода</p>
            </div>
            <div className="text-right text-[#9BA1A6] text-sm">
              <p>Сегодня</p>
              <p>14:00</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 bg-[#FF4961] py-2 rounded-xl text-sm font-semibold">Принять</button>
            <button className="flex-1 bg-transparent border border-[#ff4961] text-[#FF4961] py-2 rounded-xl text-sm font-semibold">Отклонить</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingsPage;
