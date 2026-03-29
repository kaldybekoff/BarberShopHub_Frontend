const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <div className="flex justify-between items-center mb-6 mt-4">
        <h2 className="text-2xl font-bold">Услуги</h2>
        <button className="w-10 h-10 bg-[#FF4961] rounded-full flex items-center justify-center text-xl">+</button>
      </div>

      <div className="space-y-4">
        <div className="bg-[#1C1F26] p-4 rounded-2xl flex justify-between items-center">
          <div>
            <h4 className="font-bold">Мужская стрижка</h4>
            <p className="text-[#9BA1A6] text-sm">45 мин</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#FF4961]">8000 ₸</p>
            <p className="text-[#9BA1A6] text-xs">Изменить</p>
          </div>
        </div>
        
        <div className="bg-[#1C1F26] p-4 rounded-2xl flex justify-between items-center">
          <div>
            <h4 className="font-bold">Стрижка бороды</h4>
            <p className="text-[#9BA1A6] text-sm">30 мин</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-[#FF4961]">5000 ₸</p>
            <p className="text-[#9BA1A6] text-xs">Изменить</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesPage;
