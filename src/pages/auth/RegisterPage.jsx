import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import colors from "../../constants/colors";
import { register as apiRegister } from "../../api/authApi";
import AuthBrandPanel, { AuthBrandHeader } from "../../components/auth/AuthBrandPanel";

const pageStyle = { backgroundColor: "#171A33" };

const fieldStyle = {
  backgroundColor: "#2a364b",
  border: "1px solid rgba(88,103,130,0.16)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
};

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setErrorMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
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
      setErrorMessage(
        error.response?.data?.detail || error.message || "Ошибка регистрации"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[43fr_57fr]"
      style={pageStyle}
    >
      <AuthBrandPanel />

      <section
        className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-16"
        style={pageStyle}
      >
        <div className="w-full max-w-[304px] sm:max-w-[356px] lg:max-w-[532px]">
          <AuthBrandHeader className="mb-10 lg:hidden" />

          <header className="mb-6 text-left">
            <h1 className="text-[2.1rem] font-extrabold leading-[1.04] tracking-[-0.05em] text-white sm:text-[2.5rem] lg:text-[3rem]">
              Создайте аккаунт
            </h1>
            <p
              className="mt-2 text-[0.96rem] leading-normal sm:text-[1rem]"
              style={{ color: "rgba(168,178,193,0.72)" }}
            >
              Заполните данные и начните пользоваться BarberHub
            </p>
          </header>

          <div
            className="mb-6 grid grid-cols-2 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <Link
              to="/login"
              className="pb-2.5 text-center text-[0.98rem] font-semibold transition-opacity hover:opacity-85"
              style={{ color: "rgba(168,178,193,0.52)" }}
            >
              Войти
            </Link>
            <span
              className="pb-2.5 text-center text-[0.98rem] font-bold"
              style={{
                color: colors.accent,
                borderBottom: `2px solid ${colors.accent}`,
              }}
            >
              Регистрация
            </span>
          </div>

          <form onSubmit={handleRegister}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-1.5 block text-[0.88rem] font-medium"
                  style={{ color: "rgba(168,178,193,0.76)" }}
                >
                  Имя
                </label>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="h-[46px] w-full rounded-[10px] px-4 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.42)]"
                  style={fieldStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="register-email"
                  className="mb-1.5 block text-[0.88rem] font-medium"
                  style={{ color: "rgba(168,178,193,0.76)" }}
                >
                  Email
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className="h-[46px] w-full rounded-[10px] px-4 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.42)]"
                  style={fieldStyle}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="register-password"
                    className="mb-1.5 block text-[0.88rem] font-medium"
                    style={{ color: "rgba(168,178,193,0.76)" }}
                  >
                    Пароль
                  </label>
                  <div className="relative">
                    <input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="h-[46px] w-full rounded-[10px] px-4 pr-11 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.42)]"
                      style={fieldStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
                      style={{ color: "rgba(168,178,193,0.56)" }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="register-confirm-password"
                    className="mb-1.5 block text-[0.88rem] font-medium"
                    style={{ color: "rgba(168,178,193,0.76)" }}
                  >
                    Повторите пароль
                  </label>
                  <div className="relative">
                    <input
                      id="register-confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="h-[46px] w-full rounded-[10px] px-4 pr-11 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.42)]"
                      style={fieldStyle}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-80"
                      style={{ color: "rgba(168,178,193,0.56)" }}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <p
                  className="mb-3 text-[0.88rem] font-medium"
                  style={{ color: "rgba(168,178,193,0.76)" }}
                >
                  Я регистрируюсь как
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "User", label: "Клиент" },
                    { value: "Barbershop", label: "Бизнес" },
                  ].map((option) => {
                    const isActive = formData.role === option.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() =>
                          setFormData((current) => ({ ...current, role: option.value }))
                        }
                        className="h-[54px] rounded-[14px] border text-[1rem] font-semibold transition-colors"
                        style={{
                          color: isActive ? "#ffffff" : "rgba(168,178,193,0.74)",
                          background: isActive
                            ? "linear-gradient(180deg, #ee4766 0%, #ea4262 52%, #e83f5f 100%)"
                            : "#243044",
                          borderColor: isActive ? colors.accent : "rgba(88,103,130,0.16)",
                          boxShadow: isActive
                            ? "0 0 18px rgba(233,69,96,0.22)"
                            : "inset 0 1px 0 rgba(255,255,255,0.02)",
                        }}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="mt-5 text-sm font-medium text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 h-[54px] w-full rounded-[14px] text-[1.05rem] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, #ee4766 0%, #ea4262 52%, #e83f5f 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(233,69,96,0.30)",
              }}
            >
              {isLoading ? "Создаём аккаунт..." : "Зарегистрироваться"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
