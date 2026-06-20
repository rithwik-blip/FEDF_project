import { useState } from "react";
import Navbar from "../components/Navbar";

const foods = [
  { id: 1, name: "Veg Burger", price: 60, category: "veg", emoji: "🍔", desc: "Crispy patty with fresh veggies" },
  { id: 2, name: "Margherita Pizza", price: 120, category: "veg", emoji: "🍕", desc: "Classic tomato & mozzarella" },
  { id: 3, name: "Chicken Roll", price: 90, category: "nonveg", emoji: "🌯", desc: "Spicy grilled chicken wrap" },
  { id: 4, name: "Paneer Wrap", price: 75, category: "veg", emoji: "🫔", desc: "Soft paneer with mint chutney" },
  { id: 5, name: "Egg Sandwich", price: 50, category: "nonveg", emoji: "🥪", desc: "Fluffy eggs on toasted bread" },
  { id: 6, name: "Fresh Lime Soda", price: 30, category: "veg", emoji: "🥤", desc: "Chilled and refreshing" },
];

function MenuPage() {
  const [filter, setFilter] = useState("all");
  const [added, setAdded] = useState({});

  const filteredFood = filter === "all" ? foods : foods.filter(f => f.category === filter);

  const handleAdd = (id) => {
    setAdded(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [id]: false })), 1500);
  };

  const filters = [
    { key: "all", label: "All Items", emoji: "🍽️" },
    { key: "veg", label: "Veg", emoji: "🌿" },
    { key: "nonveg", label: "Non-Veg", emoji: "🍗" },
  ];

  return (
    <>
      <Navbar />
      <div className="cb-page-wide cb-fade-in">
        <h1 className="cb-section-title">Today's Menu</h1>
        <p className="cb-section-sub">Fresh meals prepared daily by the canteen.</p>

        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {filters.map(f => (
            <button
              key={f.key}
              className="cb-btn"
              style={{
                background: filter === f.key ? "var(--accent)" : "var(--surface)",
                color: filter === f.key ? "white" : "var(--text)",
                border: filter === f.key ? "none" : "1px solid var(--border)",
                padding: "9px 18px",
              }}
              onClick={() => setFilter(f.key)}
            >
              {f.emoji} {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}>
          {filteredFood.map(food => (
            <div key={food.id} className="cb-card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Food emoji banner */}
              <div style={{
                height: 80,
                background: food.category === "veg" ? "var(--green-light)" : "var(--red-light)",
                borderRadius: "var(--radius-sm)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 44,
              }}>
                {food.emoji}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <h3 style={{ fontSize: 17, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, marginBottom: 4 }}>
                    {food.name}
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--text-light)" }}>{food.desc}</p>
                </div>
                <span className={`cb-badge ${food.category === "veg" ? "cb-badge-veg" : "cb-badge-nonveg"}`}>
                  {food.category === "veg" ? "🌿 Veg" : "🍗 Non-veg"}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                <span style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", fontFamily: "'Playfair Display', serif" }}>
                  ₹{food.price}
                </span>
                <button
                  className="cb-btn cb-btn-primary"
                  style={{ padding: "8px 16px", fontSize: 14, background: added[food.id] ? "var(--green)" : undefined }}
                  onClick={() => handleAdd(food.id)}
                >
                  {added[food.id] ? "✓ Added!" : "+ Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MenuPage;
