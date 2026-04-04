import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import colors from "../../styles/colors";

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

      if (user.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "Barbershop") {
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
      className="min-h-screen flex items-center justify-center px-6 py-10"
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ backgroundColor: colors.dark }}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm mb-7 w-fit"
          style={{ color: colors.gray }}
        >
          ← Назад
        </button>

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-white">Введите код</h1>
          <p className="text-sm mt-2" style={{ color: colors.gray }}>
            Код отправлен на ваш email
          </p>
        </div>

        <div className="flex justify-between gap-3 mb-5">
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
              className="w-14 h-14 text-center text-2xl font-semibold text-white rounded-xl focus:outline-none"
              style={{
                backgroundColor: colors.light,
                border: digit ? `1px solid ${colors.accent}` : "1px solid rgba(255,255,255,0.1)",
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
          className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity disabled:opacity-60 mb-4"
          style={{ backgroundColor: colors.accent }}
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
    </div>
  );
}

export default VerifyPage;
