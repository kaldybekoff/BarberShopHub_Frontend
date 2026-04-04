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

  async function handleRegister(e) {
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

  const inputClass = "w-full px-4 py-3 rounded-xl text-white text-sm focus:outline-none focus:border-white/30 transition-colors";
  const inputStyle = {
    backgroundColor: colors.light,
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-10"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: colors.dark }}
      >
        {/* табы */}
        <div className="flex border-b mb-8" style={{ borderColor: colors.light }}>
          <Link
            to="/login"
            className="flex-1 py-3 text-center text-sm font-medium transition-colors hover:text-white"
            style={{ color: colors.gray }}
          >
            Войти
          </Link>
          <span
            className="flex-1 py-3 text-center text-sm font-semibold text-white"
            style={{ borderBottom: `2px solid ${colors.accent}` }}
          >
            Регистрация
          </span>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white">Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white">Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-white">Подтвердите пароль</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          {/* выбор роли */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-white">Я регистрируюсь как</label>
            <div className="flex gap-3">
              {["User", "Barbershop"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: r })}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: formData.role === r ? colors.accent : colors.light,
                    border: formData.role === r ? "none" : "1px solid rgba(255,255,255,0.1)",
                    color: formData.role === r ? "#ffffff" : colors.gray,
                  }}
                >
                  {r === "User" ? "Клиент" : "Барбершоп"}
                </button>
              ))}
            </div>
          </div>

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white text-base mt-1 hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: colors.accent }}
          >
            {isLoading ? "Регистрируем..." : "Зарегистрироваться"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default RegisterPage;
