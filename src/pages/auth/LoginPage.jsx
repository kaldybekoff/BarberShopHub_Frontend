import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";
import { login as apiLogin } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";

const pageStyle = { backgroundColor: "#171A33" };

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

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const { access_token, user } = await apiLogin(email, password);
      login(user, access_token);

      if (user.role === "Barbershop") navigate("/barbershop/dashboard");
      else navigate("/home");
    } catch (error) {
      setErrorMessage(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[43fr_57fr]"
      style={pageStyle}
    >
      <AuthBrandPanel />

      <section
        style={{
          flex: 1,
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
          <div
            className="flex items-center justify-center"
            style={{ gap: "8px", marginBottom: "28px" }}
          >
            <span style={{ fontSize: "18px", color: "#E94560" }}>✂️</span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              Barber<span style={{ color: "#E94560" }}>Hub</span>
            </span>
          </div>

          <h1
            style={{
              color: "#ffffff",
              fontSize: "24px",
              fontWeight: 800,
              textAlign: "center",
            }}
          >
            Welcome 👋
          </h1>
          <p
            style={{
              color: "#A8B2C1",
              fontSize: "13px",
              textAlign: "center",
              marginTop: "6px",
              marginBottom: "24px",
            }}
          >
            Sign in to your account
          </p>

          <div
            style={{
              display: "flex",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#E94560",
                borderBottom: "2px solid #E94560",
                marginBottom: "-1px",
              }}
            >
              Sign in
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate("/register")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/register");
              }}
              style={{
                flex: 1,
                textAlign: "center",
                padding: "10px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#A8B2C1",
              }}
            >
              Sign up
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="login-email" style={labelStyle}>
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="placeholder:text-[#4A5568]"
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="login-password" style={labelStyle}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="placeholder:text-[#4A5568]"
                  style={{ ...inputStyle, paddingRight: "40px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "#A8B2C1",
                    fontSize: "14px",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  👁
                </button>
              </div>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => navigate("/forgot-password")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/forgot-password");
              }}
              style={{
                textAlign: "right",
                color: "#E94560",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              Forgot password?
            </div>

            {errorMessage && (
              <p
                style={{
                  color: "#F87171",
                  fontSize: "13px",
                  fontWeight: 500,
                  marginBottom: "12px",
                }}
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
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
                cursor: isLoading ? "default" : "pointer",
                opacity: isLoading ? 0.7 : 1,
                marginBottom: "16px",
              }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div
            style={{
              textAlign: "center",
              color: "#A8B2C1",
              fontSize: "13px",
            }}
          >
            {"Don't have an account? "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/register")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") navigate("/register");
              }}
              style={{
                color: "#E94560",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Create account
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
