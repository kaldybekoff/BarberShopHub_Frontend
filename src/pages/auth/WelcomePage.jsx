import { Link, useNavigate } from "react-router-dom";
import colors from "../../constants/colors";
import AuthBrandPanel, { AuthBrandHeader } from "../../components/auth/AuthBrandPanel";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[43fr_57fr]"
      style={{ backgroundColor: "#171A33" }}
    >
      <AuthBrandPanel showIndicators />

      <section
        className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-16"
        style={{ backgroundColor: "#171A33" }}
      >
        <div className="w-full max-w-[460px] text-center lg:max-w-[520px]">
          <AuthBrandHeader className="mb-12 lg:hidden" />

          <h2 className="mx-auto max-w-[420px] text-[2.45rem] font-extrabold leading-[1.14] tracking-[-0.03em] text-white sm:text-[3rem] lg:max-w-[460px] lg:text-[3.6rem]">
            Найди лучший
            <br />
            барбершоп рядом
          </h2>

          <p
            className="mx-auto mt-5 max-w-[420px] text-[1rem] leading-[1.35] sm:text-[1.06rem] lg:max-w-[430px] lg:text-[1.12rem]"
            style={{ color: "rgba(168,178,193,0.78)" }}
          >
            Сотни проверенных барбершопов с реальными отзывами и ценами
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-11 h-[64px] w-full rounded-[16px] text-[1.42rem] font-bold tracking-[-0.02em] text-white transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(180deg, #ee4766 0%, #ea4262 52%, #e83f5f 100%)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.03) inset, 0 0 22px rgba(233,69,96,0.36)",
            }}
          >
            Начать
          </button>

          <div className="mt-5 space-y-4 text-center">
            <p
              className="text-[1rem] font-medium sm:text-[1.05rem]"
              style={{ color: "rgba(168,178,193,0.74)" }}
            >
              Уже есть аккаунт?{" "}
              <Link
                to="/login"
                className="font-semibold text-white transition-opacity hover:opacity-85"
              >
                Войти
              </Link>
            </p>

            <p
              className="text-[1rem] font-medium sm:text-[1.05rem]"
              style={{ color: "rgba(168,178,193,0.48)" }}
            >
              Вы барбер?{" "}
              <Link
                to="/login"
                className="font-bold transition-opacity hover:opacity-85"
                style={{ color: colors.accent }}
              >
                Войти как бизнес →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
