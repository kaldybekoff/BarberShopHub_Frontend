import { useLocation, useNavigate } from "react-router-dom";
import colors from "../../styles/colors";

function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: colors.primary }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mb-5"
          style={{ backgroundColor: colors.success }}>
          ✓
        </div>
        <h1 className="text-2xl font-bold text-white mb-6">Запись подтверждена! 🎉</h1>
        <button
          onClick={() => navigate("/home")}
          className="w-full max-w-xs py-3 rounded-xl font-semibold text-white"
          style={{ backgroundColor: colors.accent }}>
          На главную
        </button>
      </div>
    );
  }

  const { shopName, service, master, date, time } = bookingData;

  return (
    <div className="min-h-screen px-4 py-10" style={{ backgroundColor: colors.primary }}>
      <div className="max-w-md mx-auto flex flex-col items-center">

        {/* иконка успеха */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-5"
          style={{ backgroundColor: colors.success }}>
          ✓
        </div>

        {/* заголовок */}
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Запись подтверждена! 🎉
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: colors.gray }}>
          Ждём тебя {date} в {time} в {shopName}
        </p>

        {/* карточка деталей */}
        <div className="w-full rounded-2xl p-6 mt-6 mb-8"
          style={{ backgroundColor: colors.dark }}>

          <DetailRow label="Барбершоп" value={shopName} />
          <DetailRow label="Дата и время" value={`${date} · ${time}`} />
          <div className="border-b border-white/5 my-2" />
          <DetailRow label="Услуга" value={service?.name} />
          <DetailRow label="Длительность" value={service?.duration} />
          <DetailRow
            label="Мастер"
            value={master ? master.name : "Любой доступный"}
          />
          <div className="border-b border-white/5 my-2" />
          <div className="flex items-center justify-between pt-1">
            <span className="text-sm font-bold text-white">Стоимость</span>
            <span className="text-base font-bold" style={{ color: colors.accent }}>
              {service?.price} ₸
            </span>
          </div>
        </div>

        {/* кнопки */}
        <div className="w-full flex flex-col gap-3">
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent }}>
            На главную
          </button>
          <button
            onClick={() => navigate("/appointments")}
            className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-80 transition-opacity border"
            style={{ backgroundColor: colors.light, borderColor: "rgba(255,255,255,0.1)" }}>
            Мои записи
          </button>
        </div>

      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm" style={{ color: colors.gray }}>{label}</span>
      <span className="text-sm text-white font-medium">{value}</span>
    </div>
  );
}

export default BookingSuccessPage;
