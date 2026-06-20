import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function HomePage() {
  const navigate = useNavigate();

  const quickLinks = [
    { icon: "🍔", label: "Browse Menu", sub: "See today's offerings", path: "/menu", accent: true },
    { icon: "🛒", label: "My Cart", sub: "Review your selections", path: "/cart" },
    { icon: "📦", label: "My Orders", sub: "Track & collect orders", path: "/orders" },
    { icon: "💬", label: "Feedback", sub: "Share your experience", path: "/feedback" },
  ];

  const stats = [
    { label: "Items Available", value: "12+" },
    { label: "Avg Wait Time", value: "5 min" },
    { label: "Orders Today", value: "48" },
  ];

  return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in">

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, var(--accent) 0%, #c04d10 100%)",
          borderRadius: "var(--radius)",
          padding: "48px 40px",
          color: "white",
          marginBottom: 32,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", right: -20, top: -20,
            fontSize: 120, opacity: 0.12, lineHeight: 1,
          }}>🍽️</div>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, marginBottom: 10 }}>
            Welcome back, Student
          </p>
          <h1 style={{ color: "white", fontSize: 34, marginBottom: 12, lineHeight: 1.2 }}>
            Ready to pre-order<br />your meal today?
          </h1>
          <p style={{ opacity: 0.85, fontSize: 15, marginBottom: 24, maxWidth: 400 }}>
            Skip the queue — order online and collect with your QR code in minutes.
          </p>
          <button
            className="cb-btn"
            style={{ background: "white", color: "var(--accent)", fontWeight: 600 }}
            onClick={() => navigate("/menu")}
          >
            Browse Today's Menu →
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
          {stats.map((s) => (
            <div key={s.label} className="cb-card" style={{ textAlign: "center", padding: "20px 16px" }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "var(--text-light)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <h2 className="cb-section-title" style={{ fontSize: 22, marginBottom: 16 }}>Quick Access</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {quickLinks.map((link) => (
            <button
              key={link.path}
              className="cb-card"
              style={{
                display: "flex", alignItems: "center", gap: 16,
                cursor: "pointer", border: link.accent ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                background: link.accent ? "var(--accent-light)" : "var(--surface)",
                textAlign: "left",
              }}
              onClick={() => navigate(link.path)}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: link.accent ? "var(--accent)" : "var(--bg)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, flexShrink: 0,
                border: link.accent ? "none" : "1px solid var(--border)",
              }}>
                {link.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: "var(--heading)", fontSize: 15 }}>{link.label}</div>
                <div style={{ fontSize: 13, color: "var(--text-light)", marginTop: 2 }}>{link.sub}</div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </>
  );
}

export default HomePage;
