import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import { resetPassword } from "../../api/authApi";

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

function PasswordInput({ id, label, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div style={{ marginBottom: "16px" }}>
      <label htmlFor={id} style={labelStyle}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="placeholder:text-[#4A5568]"
          style={{ ...inputStyle, paddingRight: "44px" }}
          onFocus={(e) => { e.target.style.borderColor = "rgba(233,69,96,0.6)"; }}
          onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Скрыть" : "Показать"}
          style={{
            position: "absolute",
            top: "50%",
            right: "12px",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            color: "#A8B2C1",
            fontSize: "16px",
            cursor: "pointer",
            padding: "4px",
            lineHeight: 1,
          }}
        >
          {show ? "🙈" : "👁"}
        </button>
      </div>
    </div>
  );
}

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const emailFromUrl = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Ссылка недействительна. Запросите новый сброс пароля.");
      return;
    }
    if (password.length < 8) {
      setError("Пароль должен быть не менее 8 символов");
      return;
    }
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Ошибка сброса пароля. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[43fr_57fr]"
      style={{ backgroundColor: "#171A33" }}
    >
      <AuthBrandPanel />

      <section
        style={{
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
            maxWidth: "460px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Logo */}
          <div className="flex items-center justify-center" style={{ gap: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "20px", color: "#E94560" }}>✂️</span>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
              Barber<span style={{ color: "#E94560" }}>Hub</span>
            </span>
          </div>

          {success ? (
            /* Success state */
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(72, 187, 120, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "28px",
                }}
              >
                ✅
              </div>
              <h1 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 800, marginBottom: "10px" }}>
                Пароль изменён!
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", lineHeight: 1.6, marginBottom: "28px" }}>
                Ваш пароль успешно обновлён. Теперь можете войти с новым паролем.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  backgroundColor: "#E94560",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Войти
              </button>
            </div>
          ) : (
            /* Form state */
            <>
              <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, textAlign: "center" }}>
                Новый пароль
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", textAlign: "center", marginTop: "8px", marginBottom: "28px" }}>
                {emailFromUrl ? (
                  <>Для аккаунта <span style={{ color: "#fff", fontWeight: 600 }}>{emailFromUrl}</span></>
                ) : (
                  "Придумайте надёжный пароль"
                )}
              </p>

              <form onSubmit={handleSubmit}>
                <PasswordInput
                  id="new-password"
                  label="Новый пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Минимум 8 символов"
                />

                <PasswordInput
                  id="confirm-password"
                  label="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />

                {/* Password strength hint */}
                {password.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: "rgba(255,255,255,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "2px",
                          width:
                            password.length < 6 ? "25%" :
                            password.length < 8 ? "50%" :
                            password.length < 12 ? "75%" : "100%",
                          backgroundColor:
                            password.length < 6 ? "#E94560" :
                            password.length < 8 ? "#F6AD55" :
                            password.length < 12 ? "#48BB78" : "#38A169",
                          transition: "width 0.3s, background-color 0.3s",
                        }}
                      />
                    </div>
                    <p style={{ color: "#A8B2C1", fontSize: "11px", marginTop: "4px" }}>
                      {password.length < 6 ? "Слабый" :
                       password.length < 8 ? "Средний" :
                       password.length < 12 ? "Хороший" : "Отличный"} пароль
                    </p>
                  </div>
                )}

                {error && (
                  <p style={{ color: "#E94560", fontSize: "13px", marginBottom: "14px" }}>
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
                    marginBottom: "16px",
                  }}
                >
                  {loading ? "Сохранение..." : "Сохранить пароль"}
                </button>
              </form>

              <div style={{ textAlign: "center" }}>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#A8B2C1",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  ← Вернуться к входу
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default ResetPasswordPage;
