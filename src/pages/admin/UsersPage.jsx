const UsersPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4">Пользователи</h2>
      <div className="bg-[#1C1F26] p-4 rounded-2xl">
        <div className="flex justify-between items-center border-b border-[#0F1117] pb-2 mb-2">
          <span className="font-bold">Тимур Омаров</span>
          <span className="text-green-500 text-sm">Активен</span>
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
