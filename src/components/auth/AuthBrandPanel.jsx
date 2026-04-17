import colors from "../../constants/colors";
import { Scissors } from "lucide-react";

const leftPanelStyle = {
  background:
    "radial-gradient(circle at 50% 38%, rgba(233,69,96,0.18) 0%, rgba(233,69,96,0.10) 14%, rgba(10,14,25,0.94) 40%, #090c16 70%, #070910 100%)",
};

const dividerStyle = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
};

function AuthLogoLockup({ compact = false }) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div
        className={`${compact ? "mb-5 h-20 w-20" : "mb-9 h-24 w-24"} flex items-center justify-center rounded-full`}
        style={{
          background:
            "radial-gradient(circle, rgba(233,69,96,0.20) 0%, rgba(233,69,96,0.02) 68%, rgba(233,69,96,0) 100%)",
        }}
      >
        <Scissors
          size={compact ? 46 : 58}
          style={{
            color: colors.accent,
            transform: "translateY(-2px)",
            filter:
              "drop-shadow(0 0 12px rgba(255,109,126,0.52)) drop-shadow(0 0 24px rgba(233,69,96,0.20))",
          }}
        />
      </div>

      <h1
        className={`${compact ? "text-4xl" : "text-[4.1rem]"} font-extrabold leading-none tracking-[-0.04em] text-white`}
      >
        Barber<span style={{ color: colors.accent }}>Hub</span>
      </h1>

      <p
        className={`${compact ? "mt-3 text-sm" : "mt-3 text-[1.02rem]"} font-medium`}
        style={{ color: "rgba(255,255,255,0.56)" }}
      >
        Твой барбер в один клик
      </p>
    </div>
  );
}

function AuthBrandPanel({ showIndicators = false }) {
  return (
    <section
      className="relative hidden min-h-screen overflow-hidden lg:flex lg:flex-col lg:items-center lg:justify-center"
      style={leftPanelStyle}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[39%] h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{ background: "rgba(233,69,96,0.10)" }}
        />
      </div>

      <div className="absolute right-0 top-0 h-full w-px" style={dividerStyle} />

      <AuthLogoLockup />

      {showIndicators && (
        <div className="absolute bottom-[56px] left-1/2 flex -translate-x-1/2 items-center gap-[8px]">
          <span
            className="h-[6px] w-[21px] rounded-full"
            style={{ backgroundColor: colors.accent }}
          />
          <span
            className="h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: "rgba(124,135,164,0.52)" }}
          />
          <span
            className="h-[6px] w-[6px] rounded-full"
            style={{ backgroundColor: "rgba(124,135,164,0.30)" }}
          />
        </div>
      )}
    </section>
  );
}

function AuthBrandHeader({ className = "" }) {
  return (
    <div className={className}>
      <AuthLogoLockup compact />
    </div>
  );
}

export { AuthBrandHeader };
export default AuthBrandPanel;
