import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function VerifyPage() {
  const navigate = useNavigate();
  const [codeDigits, setCodeDigits] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
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

  function handleConfirm() {
    setErrorMessage("");
    const code = codeDigits.join("");

    if (code.length < 4) {
      setErrorMessage("Введите все 4 цифры кода");
      return;
    }

    console.log("code:", code);
    navigate("/home");
  }

  function handleResend() {
    console.log("resend");
    setCountdown(42);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: "#1A1A2E" }}>

      <div className="w-full max-w-sm flex flex-col gap-7">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm w-fit"
          style={{ color: "#A8B2C1" }}>
          ← Назад
        </button>

        <div>
          <h1 className="text-2xl font-bold text-white">Введите код</h1>
          <p className="text-sm mt-2" style={{ color: "#A8B2C1" }}>
            Код отправлен на ваш email
          </p>
        </div>

        {/* 4 поля для цифр */}
        <div className="flex justify-between gap-3">
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
              className="w-full aspect-square text-center text-xl font-semibold text-white rounded-xl focus:outline-none"
              style={{
                backgroundColor: "#1E2A3A",
                border: digit ? "1px solid #E94560" : "1px solid transparent",
              }}
            />
          ))}
        </div>

        {errorMessage && (
          <p className="text-sm" style={{ color: "#E94560" }}>
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleConfirm}
          className="w-full py-3 rounded-xl font-semibold text-white text-base hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#E94560" }}>
          Подтвердить
        </button>

        <p className="text-sm text-center" style={{ color: "#A8B2C1" }}>
          Не получили код?{" "}
          {countdown > 0 ? (
            <span>Отправить повторно через {countdown}с</span>
          ) : (
            <button
              onClick={handleResend}
              className="underline"
              style={{ color: "#E94560" }}>
              Отправить повторно
            </button>
          )}
        </p>

      </div>
    </div>
  );
}

export default VerifyPage;
