import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail, resendCode } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || "";

  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((p) => p - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  function handleDigitChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const updated = [...codeDigits];
    updated[index] = value;
    setCodeDigits(updated);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!text) return;
    const updated = ["", "", "", ""];
    text.split("").forEach((ch, i) => { updated[i] = ch; });
    setCodeDigits(updated);
    inputRefs.current[Math.min(text.length, 3)]?.focus();
  }

  async function handleConfirm() {
    setErrorMessage("");
    const code = codeDigits.join("");
    if (code.length < 4) {
      setErrorMessage("Введите все 4 цифры кода");
      return;
    }
    setIsLoading(true);
    try {
      const { access_token, user } = await verifyEmail(email, code);
      login(user, access_token);
      navigate(user.role === "Barbershop" ? "/barbershop/dashboard" : "/home");
    } catch {
      setErrorMessage("Неверный или истёкший код");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResend() {
    if (resending || countdown > 0) return;
    setResending(true);
    setErrorMessage("");
    try {
      await resendCode(email);
      setCountdown(60);
      setCodeDigits(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setErrorMessage("Не удалось отправить код повторно");
    } finally {
      setResending(false);
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
            maxWidth: "480px",
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

          {/* Header */}
          <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, textAlign: "center" }}>
            Подтверждение email
          </h1>
          <p style={{ color: "#A8B2C1", fontSize: "13px", textAlign: "center", marginTop: "8px", marginBottom: "32px" }}>
            Код отправлен на{" "}
            {email && (
              <span style={{ color: "#ffffff", fontWeight: 600 }}>{email}</span>
            )}
          </p>

          {/* OTP inputs */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {codeDigits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                style={{
                  width: "68px",
                  height: "72px",
                  backgroundColor: "#1E2A3A",
                  border: digit
                    ? "2px solid #E94560"
                    : "2px solid rgba(255,255,255,0.12)",
                  borderRadius: "14px",
                  color: "#ffffff",
                  fontSize: "28px",
                  fontWeight: 700,
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => {
                  if (!digit) e.target.style.borderColor = "rgba(233,69,96,0.5)";
                }}
                onBlur={(e) => {
                  if (!digit) e.target.style.borderColor = "rgba(255,255,255,0.12)";
                }}
              />
            ))}
          </div>

          {/* Error */}
          {errorMessage && (
            <p style={{ color: "#E94560", fontSize: "13px", textAlign: "center", marginBottom: "16px" }}>
              {errorMessage}
            </p>
          )}

          {/* Confirm button */}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            style={{
              width: "100%",
              backgroundColor: "#E94560",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              padding: "14px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
              marginBottom: "20px",
            }}
          >
            {isLoading ? "Проверяем..." : "Подтвердить"}
          </button>

          {/* Resend */}
          <p style={{ textAlign: "center", color: "#A8B2C1", fontSize: "13px" }}>
            Не получили код?{" "}
            {countdown > 0 ? (
              <span>Отправить повторно через {countdown}с</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                style={{
                  background: "none",
                  border: "none",
                  color: "#E94560",
                  fontWeight: 600,
                  fontSize: "13px",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                {resending ? "Отправка..." : "Отправить повторно"}
              </button>
            )}
          </p>

          {/* Back */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              type="button"
              onClick={() => navigate(-1)}
              style={{
                background: "none",
                border: "none",
                color: "#A8B2C1",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              ← Назад
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerifyPage;
