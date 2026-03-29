const MyAppointmentsPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Мои записи</h2>
      
      <div className="flex gap-4 border-b border-[#1C1F26] pb-2 mb-6">
        <button className="text-[#FF4961] font-semibold border-b-2 border-[#FF4961] pb-2">Предстоящие</button>
        <button className="text-[#9BA1A6] font-semibold pb-2">Прошедшие</button>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1C1F26] rounded-2xl p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold">BroBarbershop</h4>
              <p className="text-[#9BA1A6] text-sm">Мужская стрижка и борода</p>
            </div>
            <span className="bg-[#FF4961]/20 text-[#FF4961] text-xs px-2 py-1 rounded-full">Подтверждена</span>
          </div>
          <div className="bg-[#0F1117] rounded-xl p-3 mt-4 flex justify-between items-center text-sm">
            <span>📅 25 Окт</span>
            <span>🕒 15:00</span>
            <span className="text-white font-bold">13000 ₸</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyAppointmentsPage;
