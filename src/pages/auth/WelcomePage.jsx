import { useNavigate } from "react-router-dom";
import { Scissors } from "lucide-react";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen overflow-hidden">
      {/* Left panel — hidden on mobile, shown on desktop */}
      <div
        className="hidden md:flex relative flex-col items-center justify-center gap-4"
        style={{
          width: "42%",
          backgroundColor: "#070B17",
          borderRight: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(233,69,96,0.32) 0%, rgba(233,69,96,0.1) 30%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="flex items-center justify-center" style={{ marginBottom: "12px" }}>
            <Scissors
              size={72}
              strokeWidth={2}
              style={{
                color: "#E94560",
                filter:
                  "drop-shadow(0 0 16px rgba(233,69,96,0.55)) drop-shadow(0 0 28px rgba(233,69,96,0.25))",
              }}
            />
          </div>

          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            Barber<span style={{ color: "#E94560" }}>Hub</span>
          </div>

          <p style={{ marginTop: "10px", color: "#A8B2C1", fontSize: "15px", letterSpacing: "0.02em" }}>
            Твой барбер в один клик
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
            zIndex: 1,
          }}
        >
          <span style={{ width: "22px", height: "7px", borderRadius: "4px", backgroundColor: "#E94560" }} />
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>

      {/* Right panel — full screen on mobile */}
      <div
        className="flex-1 flex flex-col items-center justify-center"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        {/* Logo shown only on mobile */}
        <div className="flex md:hidden flex-col items-center mb-8">
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(233,69,96,0.18) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
          <Scissors
            size={48}
            strokeWidth={2}
            style={{
              color: "#E94560",
              filter: "drop-shadow(0 0 12px rgba(233,69,96,0.5))",
              marginBottom: "8px",
            }}
          />
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
            Barber<span style={{ color: "#E94560" }}>Hub</span>
          </div>
          <p style={{ marginTop: "6px", color: "#A8B2C1", fontSize: "13px" }}>
            Твой барбер в один клик
          </p>
        </div>

        <div style={{ maxWidth: "420px", width: "100%", padding: "0 32px", textAlign: "center" }}>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(26px, 6vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
          >
            Найди лучший барбершоп рядом
          </h1>

          <p
            style={{
              color: "#A8B2C1",
              fontSize: "15px",
              lineHeight: 1.6,
              marginBottom: "40px",
            }}
          >
            Сотни проверенных барбершопов с реальными отзывами и ценами
          </p>

          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              width: "100%",
              backgroundColor: "#E94560",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: "20px",
            }}
          >
            Начать
          </button>

          <div style={{ color: "#A8B2C1", fontSize: "14px" }}>
            Уже есть аккаунт?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login")}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate("/login"); }}
              style={{ color: "#ffffff", fontWeight: 700, cursor: "pointer" }}
            >
              Войти
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
