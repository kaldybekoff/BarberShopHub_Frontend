import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "../../styles/colors";
import { login as apiLogin } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Заполните все поля");
      return;
    }

    setIsLoading(true);
    try {
      const { access_token, user } = await apiLogin(formData.email, formData.password);
      login(user, access_token);

      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "Barbershop") {
        navigate("/barbershop/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || error.message || "Ошибка входа");
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
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: colors.dark }}
      >
        {/* табы */}
        <div className="flex border-b mb-8" style={{ borderColor: colors.light }}>
          <span
            className="flex-1 py-3 text-center text-sm font-semibold text-white"
            style={{ borderBottom: `2px solid ${colors.accent}` }}
          >
            Войти
          </span>
          <Link
            to="/register"
            className="flex-1 py-3 text-center text-sm font-medium transition-colors hover:text-white"
            style={{ color: colors.gray }}
          >
            Регистрация
          </Link>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
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

          {errorMessage && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-semibold text-white text-base mt-1 hover:opacity-90 transition-opacity disabled:opacity-60"
            style={{ backgroundColor: colors.accent }}
          >
            {isLoading ? "Входим..." : "Войти"}
          </button>
        </form>

        <p className="text-sm text-center mt-6" style={{ color: colors.gray }}>
          Забыли пароль? — скоро будет
        </p>

      </div>
    </div>
  );
}

export default LoginPage;
