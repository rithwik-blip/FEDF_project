import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import Navbar from "../components/Navbar";

const orderId = "ORDER-" + Math.floor(Math.random() * 100000);

const recentOrders = [
  { id: orderId, items: "Veg Burger × 1, Pizza × 2", total: 300, status: "Ready", time: "Today, 12:45 PM" },
  { id: "ORDER-82341", items: "Chicken Roll × 1", total: 90, status: "Collected", time: "Yesterday, 1:10 PM" },
];

function OrdersPage() {
  const [selected, setSelected] = useState(recentOrders[0]);

  const statusColor = {
    Ready: { bg: "var(--green-light)", text: "var(--green)" },
    Collected: { bg: "var(--border)", text: "var(--text-light)" },
    Preparing: { bg: "#fff8e1", text: "#b45309" },
  };

  return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in">
        <h1 className="cb-section-title">My Orders</h1>
        <p className="cb-section-sub">Show this QR code at the counter to collect your order.</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* QR Code */}
          <div className="cb-card" style={{ textAlign: "center", padding: "36px 28px" }}>
            <div style={{
              display: "inline-block",
              padding: 16,
              background: "white",
              borderRadius: 12,
              border: "2px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
              marginBottom: 20,
            }}>
              <QRCodeCanvas value={selected.id} size={160} />
            </div>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 6 }}>
              {selected.id}
            </h3>
            <span style={{
              ...statusColor[selected.status],
              padding: "4px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600,
              display: "inline-block", marginBottom: 12,
            }}>
              {selected.status === "Ready" ? "✅" : "✔️"} {selected.status}
            </span>
            <p style={{ color: "var(--text-light)", fontSize: 13 }}>{selected.items}</p>
            <p style={{ fontWeight: 700, color: "var(--accent)", marginTop: 8, fontSize: 18 }}>₹{selected.total}</p>
          </div>

          {/* Orders List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 4 }}>Order History</h2>
            {recentOrders.map(order => (
              <button
                key={order.id}
                className="cb-card"
                style={{
                  textAlign: "left", cursor: "pointer",
                  border: selected.id === order.id ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                  background: selected.id === order.id ? "var(--accent-light)" : "var(--surface)",
                  padding: "18px 20px",
                }}
                onClick={() => setSelected(order)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: "var(--heading)" }}>{order.id}</span>
                  <span style={{
                    ...statusColor[order.status],
                    padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  }}>
                    {order.status}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-light)", marginBottom: 4 }}>{order.items}</p>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "var(--text-light)" }}>{order.time}</span>
                  <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>₹{order.total}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersPage;
