import { useState } from "react";
import Navbar from "../components/Navbar";

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [category, setCategory] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const categories = ["Food Quality", "Wait Time", "Cleanliness", "Staff", "Pricing"];

  const submitFeedback = () => {
    if (!feedback.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback("");
      setRating(0);
      setCategory("");
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="cb-page cb-fade-in">
        <h1 className="cb-section-title">Share Feedback</h1>
        <p className="cb-section-sub">Help us improve your canteen experience.</p>

        <div style={{ maxWidth: 560 }}>
          {submitted ? (
            <div className="cb-card" style={{ textAlign: "center", padding: "60px 32px" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🙏</div>
              <h2 style={{ fontSize: 22, marginBottom: 8 }}>Thank You!</h2>
              <p style={{ color: "var(--text-light)" }}>Your feedback has been submitted successfully.</p>
            </div>
          ) : (
            <div className="cb-card" style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Star Rating */}
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 12, color: "var(--heading)" }}>
                  Overall Rating
                </label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1,2,3,4,5].map(star => (
                    <button
                      key={star}
                      style={{
                        fontSize: 36, background: "none", border: "none",
                        cursor: "pointer", transition: "transform 0.1s",
                        transform: (hovered || rating) >= star ? "scale(1.15)" : "scale(1)",
                        filter: (hovered || rating) >= star ? "none" : "grayscale(1) opacity(0.4)",
                      }}
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(star)}
                    >⭐</button>
                  ))}
                </div>
                {rating > 0 && (
                  <p style={{ fontSize: 13, color: "var(--accent)", marginTop: 6, fontWeight: 500 }}>
                    {["", "Poor", "Fair", "Good", "Very Good", "Excellent!"][rating]}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 10, color: "var(--heading)" }}>
                  Category
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {categories.map(c => (
                    <button
                      key={c}
                      className="cb-btn"
                      style={{
                        padding: "7px 14px", fontSize: 13,
                        background: category === c ? "var(--accent)" : "var(--bg)",
                        color: category === c ? "white" : "var(--text)",
                        border: category === c ? "none" : "1px solid var(--border)",
                      }}
                      onClick={() => setCategory(c)}
                    >{c}</button>
                  ))}
                </div>
              </div>

              {/* Text */}
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: 8, color: "var(--heading)" }}>
                  Your Comments
                </label>
                <textarea
                  className="cb-input"
                  rows={5}
                  placeholder="Tell us what you think — what was great, what could be better..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  style={{ resize: "vertical" }}
                />
              </div>

              <button
                className="cb-btn cb-btn-primary"
                style={{ width: "100%", padding: 14, fontSize: 15, opacity: feedback.trim() ? 1 : 0.5 }}
                onClick={submitFeedback}
                disabled={!feedback.trim()}
              >
                Submit Feedback →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedbackPage;
