import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyEmail } from "../../api/authApi";
import useAuth from "../../hooks/useAuth";
import AuthBrandPanel from "../../components/auth/AuthBrandPanel";

/**
 * OTP is disabled on the API for now. This page remains for old links:
 * completes sign-in via /auth/verify-email with email only.
 * When OTP is re-enabled, restore the code UI here and pass the code to verifyEmail.
 */
function VerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || "";

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  async function handleContinue() {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const { access_token, user } = await verifyEmail(email);
      login(user, access_token);
      navigate(user.role === "Barbershop" ? "/barbershop/dashboard" : "/home");
    } catch {
      setErrorMessage("Could not complete sign-in. Try registering again or sign in.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) {
    return null;
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
          <div className="flex items-center justify-center" style={{ gap: "8px", marginBottom: "28px" }}>
            <span style={{ fontSize: "20px", color: "#E94560" }}>✂️</span>
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#ffffff" }}>
              Barber<span style={{ color: "#E94560" }}>Hub</span>
            </span>
          </div>

          <h1 style={{ color: "#ffffff", fontSize: "24px", fontWeight: 800, textAlign: "center" }}>
            Almost there
          </h1>
          <p style={{ color: "#A8B2C1", fontSize: "13px", textAlign: "center", marginTop: "8px", marginBottom: "24px", lineHeight: 1.55 }}>
            Email confirmation codes are turned off for now. If you came from an older link for{" "}
            <span style={{ color: "#ffffff", fontWeight: 600 }}>{email}</span>, tap below to finish
            signing in.
          </p>

          {errorMessage && (
            <p style={{ color: "#E94560", fontSize: "13px", textAlign: "center", marginBottom: "16px" }}>
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            onClick={handleContinue}
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
              marginBottom: "16px",
            }}
          >
            {isLoading ? "Signing in..." : "Continue to BarberHub"}
          </button>

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
              ← Back to sign in
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default VerifyPage;
