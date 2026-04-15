import Link from "next/link";
import { Calendar, Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      aria-label="Call to action — book a consultation"
      style={{
        background: "linear-gradient(135deg, #00d4ff08 0%, #0066ff06 50%, #7b2fff08 100%)",
        borderTop: "1px solid rgba(0,212,255,0.12)",
        borderBottom: "1px solid rgba(0,212,255,0.12)",
        padding: "clamp(4rem, 8vw, 7rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <p className="label-tag" style={{ marginBottom: "1.25rem" }}>
          Start Your Transformation Today
        </p>

        <h2
          className="headline-section"
          style={{ marginBottom: "1.25rem", maxWidth: "20ch", margin: "0 auto 1.25rem" }}
        >
          Ready to Transform{" "}
          <span className="gradient-text">Your Business?</span>
        </h2>

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.0625rem",
            lineHeight: 1.7,
            maxWidth: "520px",
            margin: "0 auto 2.5rem",
          }}
        >
          Book a free 30-minute consultation with our technology experts.
          No sales pitch — just honest advice on what you actually need.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/book-consultation" className="btn-primary" style={{ gap: "0.5rem", padding: "1rem 2rem" }}>
            <Calendar size={18} />
            Schedule Free Consultation
          </Link>
          <Link href="tel:+97100000000" className="btn-outline" style={{ gap: "0.5rem", padding: "1rem 2rem" }}>
            <Phone size={18} />
            Call Us: +971-XX-XXX-XXXX
          </Link>
        </div>

        {/* Trust signals */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--bg-tertiary)",
          }}
        >
          {[
            "No commitment required",
            "Response within 2 hours",
            "150+ clients across the UAE",
            "14+ years combined expertise",
          ].map(point => (
            <div key={point} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="7" fill="rgba(0,212,255,0.15)" />
                <path d="M4 7l2 2 4-4" stroke="#00d4ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
