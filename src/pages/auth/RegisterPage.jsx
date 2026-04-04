import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { register as apiRegister } from "../../api/authApi";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Заполните все поля");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      return;
    }

    setIsLoading(true);
    try {
      await apiRegister(formData.name, formData.email, formData.password);
      navigate("/verify", { state: { email: formData.email } });
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || error.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  }

  const inputStyle = { backgroundColor: colors.light };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10"
      style={{ backgroundColor: colors.primary }}>

      <div className="w-full max-w-sm flex flex-col gap-6">

        <div>
          <h1 className="text-2xl font-bold text-white">Регистрация</h1>
          <p className="text-sm mt-1" style={{ color: colors.gray }}>
            Создайте аккаунт в BarberHub
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
              style={inputStyle}
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
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-white">Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none"
              style={inputStyle}
            />
          </div>

          {/* выбор роли */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-white">Я регистрируюсь как</label>
            <div className="flex gap-3">
              {["User", "Barbershop"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className="flex-1 py-2 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: formData.role === r ? colors.accent : colors.light,
                    color: formData.role === r ? "#ffffff" : colors.gray,
                  }}>
                  {r === "User" ? "Клиент" : "Барбершоп"}
                </button>
              ))}
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm" style={{ color: colors.accent }}>
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white text-base mt-1 hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: colors.accent }}>
            {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="text-sm text-center" style={{ color: colors.gray }}>
          Уже есть аккаунт?{" "}
          <Link to="/login" style={{ color: colors.accent }}>
            Войти
          </Link>
        </p>

      </div>
    </div>
  );
}

export default RegisterPage;
