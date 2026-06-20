import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PaymentPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [paid, setPaid] = useState(false);

  const methods = [
    { key: "upi", label: "UPI / QR Code", emoji: "📱" },
    { key: "card", label: "Card", emoji: "💳" },
    { key: "cash", label: "Pay at Counter", emoji: "💵" },
  ];

  const handlePay = () => {
    setPaid(true);
    setTimeout(() => navigate("/orders"), 2000);
  };

  if (paid) return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>✅</div>
          <h1 style={{ fontSize: 28, marginBottom: 10 }}>Payment Successful!</h1>
          <p style={{ color: "var(--text-light)" }}>Redirecting to your orders...</p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in">
        <h1 className="cb-section-title">Payment</h1>
        <p className="cb-section-sub">Choose your preferred payment method.</p>

        <div style={{ maxWidth: 480 }}>
          {/* Order Summary */}
          <div className="cb-card" style={{ marginBottom: 24, padding: "20px 24px" }}>
            <h2 style={{ fontSize: 16, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 14 }}>Order Summary</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 14, color: "var(--text-light)" }}>
              <span>Veg Burger × 1</span><span>₹60</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--text-light)" }}>
              <span>Margherita Pizza × 2</span><span>₹240</span>
            </div>
            <hr className="cb-divider" />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18 }}>
              <span>Total</span>
              <span style={{ color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>₹300</span>
            </div>
          </div>

          {/* Method Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
            {methods.map(m => (
              <button
                key={m.key}
                className="cb-card"
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  cursor: "pointer", padding: "16px 20px",
                  border: method === m.key ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                  background: method === m.key ? "var(--accent-light)" : "var(--surface)",
                }}
                onClick={() => setMethod(m.key)}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: method === m.key ? "var(--accent)" : "var(--bg)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, border: method === m.key ? "none" : "1px solid var(--border)",
                }}>
                  {m.emoji}
                </div>
                <span style={{ fontWeight: 500, color: "var(--heading)" }}>{m.label}</span>
                {method === m.key && <span style={{ marginLeft: "auto", color: "var(--accent)", fontWeight: 700 }}>✓</span>}
              </button>
            ))}
          </div>

          <button className="cb-btn cb-btn-primary" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={handlePay}>
            Pay ₹300 →
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
