import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [email, setEmail] = useState(emailFromState);
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (!success) return;
    if (countdown <= 0) { navigate("/login"); return; }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [success, countdown, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const code = codeDigits.join("");
    if (!email) { setError("Введите email"); return; }
    if (code.length !== 4) { setError("Введите все 4 цифры кода"); return; }
    if (password.length < 8) { setError("Пароль должен быть не менее 8 символов"); return; }
    if (password !== confirmPassword) { setError("Пароли не совпадают"); return; }

    setLoading(true);
    try {
      await resetPassword(email, code, password);
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
          <div className="flex items-center justify-center" style={{ gap: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "20px", color: "#E94560" }}>✂️</span>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
              Barber<span style={{ color: "#E94560" }}>Hub</span>
            </span>
          </div>

          {success ? (
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
                Ваш пароль успешно обновлён. Перенаправление через{" "}
                <span style={{ color: "#ffffff", fontWeight: 700 }}>{countdown}</span>...
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
                Войти сейчас
              </button>
            </div>
          ) : (
            <>
              <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, textAlign: "center" }}>
                Новый пароль
              </h1>
              <p style={{ color: "#A8B2C1", fontSize: "13px", textAlign: "center", marginTop: "8px", marginBottom: "28px" }}>
                Введите код из письма и придумайте новый пароль
              </p>

              <form onSubmit={handleSubmit}>
                {!emailFromState && (
                  <div style={{ marginBottom: "16px" }}>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@mail.com"
                      className="placeholder:text-[#4A5568]"
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(233,69,96,0.6)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.08)"; }}
                    />
                  </div>
                )}

                {emailFromState && (
                  <p style={{ color: "#A8B2C1", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
                    Код отправлен на <span style={{ color: "#fff", fontWeight: 600 }}>{email}</span>
                  </p>
                )}

                <div style={{ marginBottom: "20px" }}>
                  <label style={labelStyle}>Код из письма</label>
                  <div className="flex justify-center" style={{ gap: "12px", marginTop: "8px" }}>
                    {codeDigits.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (!val && e.target.value !== "") return;
                          const updated = [...codeDigits];
                          updated[i] = val;
                          setCodeDigits(updated);
                          if (val && i < 3) inputRefs.current[i + 1]?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !codeDigits[i] && i > 0) {
                            inputRefs.current[i - 1]?.focus();
                          }
                        }}
                        onPaste={(e) => {
                          e.preventDefault();
                          const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
                          if (!text) return;
                          const updated = ["", "", "", ""];
                          text.split("").forEach((ch, idx) => { updated[idx] = ch; });
                          setCodeDigits(updated);
                          inputRefs.current[Math.min(text.length, 3)]?.focus();
                        }}
                        style={{
                          width: "56px",
                          height: "56px",
                          textAlign: "center",
                          fontSize: "22px",
                          fontWeight: 700,
                          color: "#ffffff",
                          backgroundColor: "#1E2A3A",
                          border: `2px solid ${digit ? "#E94560" : "rgba(255,255,255,0.08)"}`,
                          borderRadius: "12px",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => { e.target.style.borderColor = "#E94560"; }}
                        onBlur={(e) => { e.target.style.borderColor = digit ? "#E94560" : "rgba(255,255,255,0.08)"; }}
                      />
                    ))}
                  </div>
                </div>

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

                {password.length > 0 && (
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{ height: "4px", borderRadius: "2px", backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          borderRadius: "2px",
                          width: password.length < 6 ? "25%" : password.length < 8 ? "50%" : password.length < 12 ? "75%" : "100%",
                          backgroundColor: password.length < 6 ? "#E94560" : password.length < 8 ? "#F6AD55" : password.length < 12 ? "#48BB78" : "#38A169",
                          transition: "width 0.3s, background-color 0.3s",
                        }}
                      />
                    </div>
                    <p style={{ color: "#A8B2C1", fontSize: "11px", marginTop: "4px" }}>
                      {password.length < 6 ? "Слабый" : password.length < 8 ? "Средний" : password.length < 12 ? "Хороший" : "Отличный"} пароль
                    </p>
                  </div>
                )}

                {error && (
                  <p style={{ color: "#E94560", fontSize: "13px", marginBottom: "14px" }}>{error}</p>
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
                  onClick={() => navigate("/forgot-password")}
                  style={{ background: "none", border: "none", color: "#A8B2C1", fontSize: "13px", cursor: "pointer" }}
                >
                  ← Запросить новый код
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
