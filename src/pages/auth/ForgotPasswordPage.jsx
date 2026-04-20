import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import { forgotPassword } from "../../api/authApi";

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

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Введите email");
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Ошибка отправки. Попробуйте снова.");
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

          {sent ? (
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
                ✉️
              </div>
              <h1 style={{ color: "#ffffff", fontSize: "22px", fontWeight: 800, marginBottom: "10px" }}>
                Письмо отправлено!
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", lineHeight: 1.6, marginBottom: "28px" }}>
                Мы отправили код подтверждения на{" "}
                <span style={{ color: "#ffffff", fontWeight: 600 }}>{email}</span>.
                Проверьте папку «Спам», если письмо не пришло.
              </p>
              <button
                type="button"
                onClick={() => navigate("/reset-password", { state: { email } })}
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
                  marginBottom: "12px",
                }}
              >
                Ввести код →
              </button>
              <button
                type="button"
                onClick={() => { setSent(false); setEmail(""); }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#A8B2C1",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Отправить снова
              </button>
            </div>
          ) : (
            /* Form state */
            <>
              <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, textAlign: "center" }}>
                Забыли пароль?
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", textAlign: "center", marginTop: "8px", marginBottom: "28px", lineHeight: 1.5 }}>
                Введите email — мы отправим ссылку для сброса пароля
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label htmlFor="forgot-email" style={labelStyle}>
                    Email
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="placeholder:text-[#4A5568]"
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(233,69,96,0.6)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    autoFocus
                  />
                </div>

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
                  {loading ? "Отправка..." : "Отправить инструкцию"}
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

export default ForgotPasswordPage;
