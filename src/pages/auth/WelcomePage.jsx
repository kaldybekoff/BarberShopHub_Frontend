import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1A1A2E" }}>

      <div className="w-full max-w-sm flex flex-col items-center text-center gap-6">

        {/* лого */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
            style={{ backgroundColor: "#E94560" }}>
            ✂
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">
            Barber<span style={{ color: "#E94560" }}>Hub</span>
          </h1>
        </div>

        {/* текст */}
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-white">
            Запись к барберу — просто
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "#A8B2C1" }}>
            Найди барбершоп рядом, выбери мастера и запишись онлайн за пару минут.
          </p>
        </div>

        {/* кнопки */}
        <div className="w-full flex flex-col gap-3 mt-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-xl font-semibold text-white text-base transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#E94560" }}>
            Войти
          </button>
          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl font-semibold text-base border transition-colors hover:bg-white hover:text-gray-900"
            style={{ borderColor: "#A8B2C1", color: "#A8B2C1" }}>
            Создать аккаунт
          </button>
        </div>

      </div>
    </div>
  );
}

export default WelcomePage;
