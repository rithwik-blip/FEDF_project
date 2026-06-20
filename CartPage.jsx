import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const sampleCart = [
  { id: 1, name: "Veg Burger", price: 60, emoji: "🍔", qty: 1 },
  { id: 2, name: "Margherita Pizza", price: 120, emoji: "🍕", qty: 2 },
];

function CartPage() {
  const [items, setItems] = useState(sampleCart);
  const navigate = useNavigate();

  const updateQty = (id, delta) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
          .filter(i => i.qty > 0)
    );
  };

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in">
        <h1 className="cb-section-title">Your Cart</h1>
        <p className="cb-section-sub">{items.length} item(s) ready to order</p>

        {items.length === 0 ? (
          <div className="cb-card" style={{ textAlign: "center", padding: "60px 32px" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>Your cart is empty</h2>
            <p style={{ color: "var(--text-light)", marginBottom: 24 }}>Add some items from the menu!</p>
            <button className="cb-btn cb-btn-primary" onClick={() => navigate("/menu")}>Browse Menu</button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {items.map(item => (
              <div key={item.id} className="cb-card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px" }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 12,
                  background: "var(--accent-light)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 26, flexShrink: 0,
                }}>
                  {item.emoji}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "var(--heading)", fontSize: 16 }}>{item.name}</div>
                  <div style={{ color: "var(--text-light)", fontSize: 14 }}>₹{item.price} each</div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button className="cb-btn cb-btn-ghost" style={{ width: 34, height: 34, padding: 0, fontWeight: 700 }} onClick={() => updateQty(item.id, -1)}>−</button>
                  <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center", color: "var(--heading)" }}>{item.qty}</span>
                  <button className="cb-btn cb-btn-ghost" style={{ width: 34, height: 34, padding: 0, fontWeight: 700 }} onClick={() => updateQty(item.id, 1)}>+</button>
                </div>

                <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: 17, minWidth: 70, textAlign: "right" }}>
                  ₹{item.price * item.qty}
                </div>
              </div>
            ))}

            {/* Summary */}
            <div className="cb-card" style={{ padding: "24px 28px", background: "var(--accent-light)", border: "1.5px solid var(--accent)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontWeight: 500 }}>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontWeight: 500 }}>Canteen Fee</span>
                <span style={{ color: "var(--green)", fontWeight: 500 }}>Free</span>
              </div>
              <hr className="cb-divider" style={{ margin: "0 0 20px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ fontWeight: 700, fontSize: 18 }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 22, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>₹{total}</span>
              </div>
              <button className="cb-btn cb-btn-primary" style={{ width: "100%", padding: 14, fontSize: 16 }} onClick={() => navigate("/payment")}>
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
