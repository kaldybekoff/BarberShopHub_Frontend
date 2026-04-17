import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import colors from "../../constants/colors";
import { login as apiLogin } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import AuthBrandPanel, { AuthBrandHeader } from "../../components/auth/AuthBrandPanel";

const pageStyle = { backgroundColor: "#171A33" };

const fieldStyle = {
  backgroundColor: "#243044",
  border: "1px solid rgba(88,103,130,0.16)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
};

const dividerStyle = {
  backgroundColor: "rgba(255,255,255,0.08)",
};

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Заполните все поля");
      return;
    }

    setIsLoading(true);
    try {
      const { access_token, user } = await apiLogin(email, password);
      login(user, access_token);

      if (user.role === "Admin") navigate("/admin/dashboard");
      else if (user.role === "Barbershop") navigate("/barbershop/dashboard");
      else navigate("/home");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || error.message || "Неверный логин или пароль"
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
        <div className="w-full max-w-[304px] sm:max-w-[332px] lg:max-w-[376px]">
          <AuthBrandHeader className="mb-10 lg:hidden" />

          <header className="mb-7 text-left">
            <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.5rem]">
              Добро пожаловать <span className="inline-block">👋</span>
            </h1>
            <p
              className="mt-2 text-[0.97rem] font-medium leading-normal"
              style={{ color: "rgba(168,178,193,0.72)" }}
            >
              Войдите в свой аккаунт
            </p>
          </header>

          <div
            className="mb-5 grid grid-cols-2 border-b"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <span
              className="pb-2.5 text-center text-[0.98rem] font-bold"
              style={{
                color: colors.accent,
                borderBottom: `2px solid ${colors.accent}`,
              }}
            >
              Войти
            </span>
            <Link
              to="/register"
              className="pb-2.5 text-center text-[0.98rem] font-semibold transition-opacity hover:opacity-85"
              style={{ color: "rgba(168,178,193,0.52)" }}
            >
              Регистрация
            </Link>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="auth-email"
                  className="mb-2 block text-[0.88rem] font-medium"
                  style={{ color: "rgba(168,178,193,0.76)" }}
                >
                  Email
                </label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@mail.com"
                  className="h-[46px] w-full rounded-[10px] px-4 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.26)]"
                  style={fieldStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="auth-password"
                  className="mb-2 block text-[0.88rem] font-medium"
                  style={{ color: "rgba(168,178,193,0.76)" }}
                >
                  Пароль
                </label>

                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-[46px] w-full rounded-[10px] px-4 pr-11 text-[0.98rem] text-white outline-none placeholder:text-[rgba(168,178,193,0.26)]"
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

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="text-[0.78rem] font-medium transition-opacity hover:opacity-85"
                    style={{ color: colors.accent }}
                  >
                    Забыли пароль?
                  </button>
                </div>
              </div>
            </div>

            {errorMessage && (
              <p className="mt-4 text-sm font-medium text-red-400">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-6 h-[50px] w-full rounded-[12px] text-[1.08rem] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, #ee4766 0%, #ea4262 52%, #e83f5f 100%)",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(233,69,96,0.30)",
              }}
            >
              {isLoading ? "Входим..." : "Войти"}
            </button>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-px flex-1" style={dividerStyle} />
              <span
                className="text-[0.84rem] font-semibold"
                style={{ color: "rgba(168,178,193,0.42)" }}
              >
                или
              </span>
              <div className="h-px flex-1" style={dividerStyle} />
            </div>

            <button
              type="button"
              className="mt-4 flex h-[46px] w-full items-center justify-center gap-2 rounded-[12px] border text-[0.98rem] font-semibold transition-colors hover:bg-white/2"
              style={{
                borderColor: colors.accent,
                borderWidth: "1.5px",
                color: colors.accent,
                backgroundColor: "transparent",
                boxShadow: "0 0 0 1px rgba(233,69,96,0.12)",
              }}
            >
              <span aria-hidden="true">🌐</span>
              Войти через Google
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
