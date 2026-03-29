import { useState } from "react";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";

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
      style={{ backgroundColor: colors.primary }}>

      <div className="w-full max-w-sm flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold text-white">Вход</h1>
          <p className="text-sm mt-1" style={{ color: colors.gray }}>
            Войдите в свой аккаунт BarberHub
          </p>
        </div>

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
              style={{ backgroundColor: colors.light }}
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
              style={{ backgroundColor: colors.light }}
            />
          </div>

          {errorMessage && (
            <p className="text-sm" style={{ color: colors.accent }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white text-base mt-1 hover:opacity-90 transition-opacity"
            style={{ backgroundColor: colors.accent }}>
            Войти
          </button>
        </form>

        <div className="flex flex-col items-center gap-2 text-sm">
          <span style={{ color: colors.gray }}>Забыли пароль? — скоро будет</span>
          <p style={{ color: colors.gray }}>
            Нет аккаунта?{" "}
            <Link to="/register" style={{ color: colors.accent }}>
              Зарегистрироваться
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
