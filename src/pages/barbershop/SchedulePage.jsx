const SchedulePage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Расписание</h2>
      <div className="flex gap-2 mb-6 overflow-x-auto">
         <div className="bg-[#FF4961] p-3 rounded-xl min-w-[60px] text-center">
            <p className="text-sm">Пн</p>
            <p className="font-bold">25</p>
         </div>
         <div className="bg-[#1C1F26] p-3 rounded-xl min-w-[60px] text-center text-[#9BA1A6]">
            <p className="text-sm">Вт</p>
            <p className="font-bold text-white">26</p>
         </div>
      </div>
      <div className="space-y-4">
         <div className="flex gap-4 items-center">
           <span className="w-16 text-right text-[#9BA1A6] text-sm">10:00</span>
           <div className="flex-1 bg-[#1C1F26] p-4 rounded-2xl border-l-4 border-[#FF4961]">
             <h4 className="font-bold">Алихан (Стрижка)</h4>
           </div>
         </div>
         <div className="flex gap-4 items-center">
           <span className="w-16 text-right text-[#9BA1A6] text-sm">11:00</span>
           <div className="flex-1 p-4 text-[#9BA1A6] text-sm">Свободно</div>
         </div>
      </div>
    </div>
  );
};
export default SchedulePage;
