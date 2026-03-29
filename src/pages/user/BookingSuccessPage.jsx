import { useNavigate } from 'react-router-dom';

const BookingSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1117] flex flex-col items-center justify-center text-white p-4">
      <div className="w-24 h-24 bg-[#FF4961] rounded-full flex items-center justify-center mb-6">
        <span className="text-4xl text-white">✓</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Запись подтверждена!</h2>
      <p className="text-[#9BA1A6] text-center mb-8">Ваша запись в BroBarbershop успешно оформлена.</p>
      
      <div className="bg-[#1C1F26] p-4 rounded-2xl w-full max-w-xs mb-8">
        <p className="text-sm text-[#9BA1A6]">Дата и Время</p>
        <p className="font-bold mb-2">25 Октября, 15:00</p>
        <p className="text-sm text-[#9BA1A6]">Мастер</p>
        <p className="font-bold">Алихан (Топ Барбер)</p>
      </div>
      
      <button 
        onClick={() => navigate('/')}
        className="w-full max-w-xs bg-[#1C1F26] py-3 rounded-xl font-semibold border border-[#FF4961] text-[#FF4961]">
          На главную
      </button>
    </div>
  );
};
export default BookingSuccessPage;
