const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-8 mt-4">Профиль</h2>
      
      <div className="flex items-center gap-4 mb-8 bg-[#1C1F26] p-4 rounded-2xl">
        <div className="w-16 h-16 bg-[#2a2d36] rounded-full"></div>
        <div>
          <h3 className="font-bold text-xl">Азамат</h3>
          <p className="text-[#9BA1A6]">+7 777 000 0000</p>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full bg-[#1C1F26] p-4 rounded-xl text-left flex justify-between">
          <span>Редактировать профиль</span>
          <span className="text-[#9BA1A6]">&gt;</span>
        </button>
        <button className="w-full bg-[#1C1F26] p-4 rounded-xl text-left flex justify-between">
          <span>Способы оплаты</span>
          <span className="text-[#9BA1A6]">&gt;</span>
        </button>
        <button className="w-full bg-[#1C1F26] p-4 rounded-xl text-left flex justify-between">
          <span>Настройки</span>
          <span className="text-[#9BA1A6]">&gt;</span>
        </button>
        <button className="w-full bg-[#1C1F26] p-4 rounded-xl text-left text-[#FF4961] font-semibold mt-4">
          Выйти
        </button>
      </div>
    </div>
  );
};
export default ProfilePage;
