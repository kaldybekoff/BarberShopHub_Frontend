import { useLocation, useNavigate } from "react-router-dom";
import { Check, CalendarPlus, Share2 } from "lucide-react";
import colors from "../../constants/colors";

function BookingSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state;

  if (!bookingData) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mb-5"
          style={{ backgroundColor: colors.accent }}
        >
          <Check size={28} />
        </div>
        <h1 className="text-2xl font-bold text-white mb-6">Запись подтверждена!</h1>
        <button
          onClick={() => navigate("/home")}
          className="w-full max-w-xs py-3 rounded-xl font-semibold text-white"
          style={{ backgroundColor: colors.accent }}
        >
          На главную
        </button>
      </div>
    );
  }

  const { shopName, shopId, service, master, date, time } = bookingData;

  return (
    <div
      className="min-h-full flex items-center justify-center px-4 md:px-6 py-10"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-5xl rounded-2xl px-5 md:px-8 py-8 md:py-10 grid lg:grid-cols-[1.1fr_1fr] gap-8"
        style={{ backgroundColor: colors.light }}
      >
        <div className="flex flex-col items-start">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-5"
            style={{ backgroundColor: colors.accent }}
          >
          <Check size={34} />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Запись подтверждена!</h1>
          <p className="text-sm mb-6" style={{ color: colors.gray }}>
            Ждём тебя {date} в {time} в {shopName}
          </p>

          <div
            className="w-full rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
            style={{ backgroundColor: colors.dark }}
          >
            <div>
              <p className="text-xs mb-1" style={{ color: colors.gray }}>
                Барбершоп
              </p>
              <p className="text-sm font-semibold text-white">{shopName}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: colors.gray }}>
                Дата и время
              </p>
              <p className="text-sm font-semibold text-white">
                {date} · {time}
              </p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: colors.gray }}>
                Услуга
              </p>
              <p className="text-sm font-semibold text-white">{service?.name}</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: colors.gray }}>
                Стоимость
              </p>
              <p className="text-sm font-semibold text-white">
                {service?.price?.toLocaleString("ru-RU")}₸
              </p>
            </div>
          </div>
        </div>

        {/* кнопки */}
        <div className="w-full flex flex-col gap-3 self-center">
          <button
            className="w-full py-3 rounded-xl font-semibold text-white text-sm hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <CalendarPlus size={16} />
              Добавить в календарь
            </span>
          </button>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 rounded-xl font-medium text-white text-sm border hover:border-white/20 transition-colors"
              style={{
                backgroundColor: colors.dark,
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <span className="inline-flex items-center justify-center gap-1.5">
                <Share2 size={14} />
                Поделиться
              </span>
            </button>
            <button
              onClick={() => navigate("/home")}
              className="flex-1 py-3 rounded-xl font-medium text-sm border transition-colors hover:text-white"
              style={{
                backgroundColor: colors.dark,
                borderColor: "rgba(255,255,255,0.1)",
                color: colors.gray,
              }}
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessPage;
