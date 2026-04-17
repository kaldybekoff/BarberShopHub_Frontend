import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import colors from "../../constants/colors";
import AuthBrandPanel, { AuthBrandHeader } from "../../components/auth/AuthBrandPanel";

const pageStyle = { backgroundColor: "#171A33" };

function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || "";

  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(42);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  function handleDigitChange(index, value) {
    if (!/^\d?$/.test(value)) return;

    const updated = [...codeDigits];
    updated[index] = value;
    setCodeDigits(updated);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
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

      if (user.role === "Barbershop") {
        navigate("/barbershop/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      setErrorMessage(error.message || "Неверный код");
    } finally {
      setIsLoading(false);
    }
  }

  function handleResend() {
    setCountdown(42);
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

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm mb-7 w-fit"
            style={{ color: "rgba(168,178,193,0.72)" }}
          >
            ← Назад
          </button>

          <h1 className="text-[2.15rem] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:text-[2.5rem] mb-2">
            Введите код
          </h1>
          <p className="text-[0.97rem] font-medium mb-8" style={{ color: "rgba(168,178,193,0.72)" }}>
            Код отправлен на ваш email
          </p>

          <div className="flex justify-between md:justify-start md:gap-3 gap-2 mb-5">
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
                className="h-[46px] w-[70px] md:w-[82px] rounded-[10px] text-center text-[1.3rem] font-semibold text-white outline-none transition-colors"
                style={{
                  backgroundColor: "#243044",
                  border: digit ? `1px solid ${colors.accent}` : "1px solid rgba(255,255,255,0.14)",
                }}
              />
            ))}
          </div>

          {errorMessage && (
            <p className="text-sm mb-4" style={{ color: colors.accent }}>
              {errorMessage}
            </p>
          )}

          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className="h-[50px] w-full rounded-[12px] text-[1.05rem] font-bold text-white transition-transform duration-200 hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-60 mb-4"
            style={{
              background:
                "linear-gradient(180deg, #ee4766 0%, #ea4262 52%, #e83f5f 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(233,69,96,0.30)",
            }}
          >
            {isLoading ? "Проверяем..." : "Подтвердить"}
          </button>

          <p className="text-sm text-center" style={{ color: colors.gray }}>
            Не получили код?{" "}
            {countdown > 0 ? (
              <span>Отправить повторно через {countdown}с</span>
            ) : (
              <button
                onClick={handleResend}
                className="underline"
                style={{ color: colors.accent }}
              >
                Отправить повторно
              </button>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}

export default VerifyPage;
