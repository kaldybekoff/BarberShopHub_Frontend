import { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Заполните все поля");
      return;
    }

    // TODO: подключить API авторизации
    console.log("login:", formData);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1A1A2E" }}>

      <div className="w-full max-w-sm flex flex-col gap-6">

        {/* заголовок */}
        <div>
          <h1 className="text-2xl font-bold text-white">Вход</h1>
          <p className="text-sm mt-1" style={{ color: "#A8B2C1" }}>
            Войдите в свой аккаунт BarberHub
          </p>
        </div>

        {/* форма */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
              style={{ backgroundColor: "#1E2A3A" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
              style={{ backgroundColor: "#1E2A3A" }}
            />
          </div>

          {errorMessage && (
            <p className="text-sm" style={{ color: "#E94560" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-base mt-1 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "#E94560" }}>
            Войти
          </button>
        </form>

        {/* доп. ссылки */}
        <div className="flex flex-col items-center gap-2 text-sm">
          <span style={{ color: "#A8B2C1" }}>Забыли пароль? — скоро будет</span>
          <p style={{ color: "#A8B2C1" }}>
            Нет аккаунта?{" "}
            <Link to="/register" style={{ color: "#E94560" }}>
              Зарегистрироваться
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
