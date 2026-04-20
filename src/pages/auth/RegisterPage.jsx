import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import { register } from "../../api/authApi";

const pageStyle = { backgroundColor: "#171A33" };

const labelStyle = {
  display: "block",
  color: "#A8B2C1",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "1px",
  textTransform: "uppercase",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  backgroundColor: "#1E2A3A",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "10px",
  padding: "13px 16px",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
};

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("user");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен быть не менее 8 символов");
      return;
    }

    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/verify", { state: { email } });
    } catch (err) {
      const msg = err?.response?.data?.message || "Ошибка регистрации";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[43fr_57fr]"
      style={pageStyle}
    >
      <AuthBrandPanel />

      <section
        style={{
          flex: 1,
          backgroundColor: "#1A1A2E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            backgroundColor: "#16213E",
            borderRadius: "20px",
            padding: "40px 44px",
            width: "100%",
            maxWidth: "480px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{ gap: "8px", marginBottom: "28px" }}
          >
            <span style={{ fontSize: "20px", color: "#E94560" }}>✂️</span>
            <span
              style={{
                fontSize: "20px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Barber<span style={{ color: "#E94560" }}>Hub</span>
            </span>
          </div>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            Создайте аккаунт
          </h1>
          <p
            style={{
              color: "#A8B2C1",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "6px",
              marginBottom: "24px",
            }}
          >
            Заполните данные и начните пользоваться BarberHub
          </p>

          <div
            style={{
              display: "flex",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "24px",
            }}
          >
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/login");
              }}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#A8B2C1",
              }}
            >
              Войти
            </div>
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#E94560",
                borderBottom: "2px solid #E94560",
                marginBottom: "-1px",
              }}
            >
              Регистрация
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="register-name" style={labelStyle}>
                Имя
              </label>
              <input
                id="register-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                className="placeholder:text-[#4A5568]"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="register-email" style={labelStyle}>
                Email
              </label>
              <input
                id="register-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="placeholder:text-[#4A5568]"
                style={inputStyle}
              />
            </div>

            <div
              className="grid grid-cols-2"
              style={{ gap: "12px", marginBottom: "16px" }}
            >
              <div>
                <label htmlFor="register-password" style={labelStyle}>
                  Пароль
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="placeholder:text-[#4A5568]"
                    style={{ ...inputStyle, paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#A8B2C1",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                  >
                    👁
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="register-confirm" style={labelStyle}>
                  Повторите пароль
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="register-confirm"
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="placeholder:text-[#4A5568]"
                    style={{ ...inputStyle, paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#A8B2C1",
                      fontSize: "14px",
                      cursor: "pointer",
                      padding: "4px",
                    }}
                    aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <span style={labelStyle}>Я регистрируюсь как</span>
              <div
                className="grid grid-cols-2"
                style={{ gap: "10px" }}
              >
                {[
                  { value: "user", label: "Клиент", icon: "👤" },
                  { value: "business", label: "Бизнес", icon: "✂️" },
                ].map((option) => {
                  const isActive = selectedRole === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSelectedRole(option.value)}
                      style={{
                        backgroundColor: isActive ? "#E94560" : "#1E2A3A",
                        color: isActive ? "#ffffff" : "#A8B2C1",
                        border: "none",
                        borderRadius: "10px",
                        padding: "12px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                      }}
                    >
                      <span>{option.icon}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {error && (
              <p
                style={{
                  color: "#E94560",
                  fontSize: "13px",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#E94560",
                color: "#ffffff",
                border: "none",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "15px",
                fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: "16px",
                marginBottom: "16px",
              }}
            >
              {loading ? "Отправка..." : "Зарегистрироваться"}
            </button>
          </form>

          <div
            className="flex items-center"
            style={{ marginBottom: "14px" }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
            <span
              style={{
                color: "#A8B2C1",
                fontSize: "12px",
                padding: "0 10px",
              }}
            >
              или
            </span>
            <div
              style={{
                flex: 1,
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          </div>

          <div
            style={{
              textAlign: "center",
              color: "#A8B2C1",
              fontSize: "13px",
            }}
          >
            Уже есть аккаунт?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/login");
              }}
              style={{
                color: "#E94560",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Войти
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
