import { useState } from "react";
import Navbar from "../components/Navbar";

const orders = [
  { id: "ORDER-12345", student: "Arjun S.", items: "Veg Burger × 1", total: 60, status: "Preparing" },
  { id: "ORDER-67890", student: "Priya M.", items: "Pizza × 2, Lime Soda × 1", total: 270, status: "Ready" },
  { id: "ORDER-54321", student: "Rohan K.", items: "Chicken Roll × 1", total: 90, status: "Collected" },
  { id: "ORDER-11111", student: "Sneha R.", items: "Paneer Wrap × 2", total: 150, status: "Preparing" },
];

const statusColors = {
  Preparing: { bg: "#fff8e1", text: "#b45309", next: "Ready" },
  Ready: { bg: "var(--green-light)", text: "var(--green)", next: "Collected" },
  Collected: { bg: "var(--border)", text: "var(--text-light)", next: null },
};

function AdminPage() {
  const [items, setItems] = useState(orders);

  const advance = (id) => {
    setItems(prev => prev.map(o => {
      if (o.id !== id) return o;
      const next = statusColors[o.status].next;
      return next ? { ...o, status: next } : o;
    }));
  };

  const stats = [
    { label: "Total Orders", value: items.length, emoji: "📦" },
    { label: "Preparing", value: items.filter(o => o.status === "Preparing").length, emoji: "👨‍🍳" },
    { label: "Ready", value: items.filter(o => o.status === "Ready").length, emoji: "✅" },
    { label: "Revenue", value: "₹" + items.reduce((s, o) => s + o.total, 0), emoji: "💰" },
  ];

  return (
    <>
      <Navbar />
      <div className="cb-page-wide cb-fade-in">
        <h1 className="cb-section-title">Admin Dashboard</h1>
        <p className="cb-section-sub">Manage orders and track canteen activity.</p>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
          {stats.map(s => (
            <div key={s.label} className="cb-card" style={{ padding: "20px 18px" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.emoji}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div style={{ fontSize: 13, color: "var(--text-light)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="cb-card" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: 18, fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>Live Orders</h2>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)" }}>
                  {["Order ID", "Student", "Items", "Total", "Status", "Action"].map(h => (
                    <th key={h} style={{ padding: "12px 20px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "var(--text-light)", fontFamily: "'DM Sans', sans-serif" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((order, i) => (
                  <tr key={order.id} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600, fontSize: 14, color: "var(--heading)" }}>{order.id}</td>
                    <td style={{ padding: "14px 20px", fontSize: 14 }}>{order.student}</td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--text-light)" }}>{order.items}</td>
                    <td style={{ padding: "14px 20px", fontWeight: 700, color: "var(--accent)" }}>₹{order.total}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{
                        ...statusColors[order.status],
                        padding: "3px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600, display: "inline-block",
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      {statusColors[order.status].next ? (
                        <button className="cb-btn cb-btn-outline" style={{ padding: "6px 14px", fontSize: 13 }} onClick={() => advance(order.id)}>
                          Mark {statusColors[order.status].next}
                        </button>
                      ) : (
                        <span style={{ fontSize: 13, color: "var(--text-light)" }}>Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
