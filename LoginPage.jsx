import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginUser = () => {
    if (email && password) {
      navigate("/home");
    } else {
      setError("Please enter both email and password.");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdf8f3 0%, #fde8d4 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div className="cb-fade-in" style={{ width: "100%", maxWidth: 440 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64,
            background: "var(--accent)",
            borderRadius: "18px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, margin: "0 auto 16px",
            boxShadow: "0 8px 24px rgba(232,96,28,0.3)",
          }}>🍽️</div>
          <h1 style={{ fontSize: 32, marginBottom: 6 }}>CampusBite</h1>
          <p style={{ color: "var(--text-light)", fontSize: 15 }}>
            School Canteen Pre-Order System
          </p>
        </div>

        {/* Card */}
        <div className="cb-card" style={{ padding: "36px 32px" }}>
          <h2 style={{ fontSize: 22, marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>
            Sign in to your account
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--text)" }}>
                Email Address
              </label>
              <input
                className="cb-input"
                type="email"
                placeholder="you@school.edu"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--text)" }}>
                Password
              </label>
              <input
                className="cb-input"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && loginUser()}
              />
            </div>

            {error && (
              <div style={{
                background: "var(--red-light)", color: "var(--red)",
                padding: "10px 14px", borderRadius: "var(--radius-sm)",
                fontSize: 14,
              }}>
                ⚠️ {error}
              </div>
            )}

            <button
              className="cb-btn cb-btn-primary"
              style={{ width: "100%", padding: "13px", marginTop: 4, fontSize: 15 }}
              onClick={loginUser}
            >
              Sign In →
            </button>
          </div>

          <hr className="cb-divider" />
          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-light)" }}>
            Having trouble? Contact your canteen admin.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
