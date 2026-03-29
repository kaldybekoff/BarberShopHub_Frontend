const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-[#0F1117] text-white p-4">
      <h2 className="text-2xl font-bold mb-6 mt-4 text-[#FF4961]">HQ Admin</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1C1F26] p-4 rounded-2xl">
          <p className="text-[#9BA1A6] text-sm">Всего пользователей</p>
          <p className="text-2xl font-bold">1,240</p>
        </div>
        <div className="bg-[#1C1F26] p-4 rounded-2xl">
          <p className="text-[#9BA1A6] text-sm">Заведения</p>
          <p className="text-2xl font-bold">45</p>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboardPage;
