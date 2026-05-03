import Link from "next/link";
import { Calendar, Phone, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section
      aria-label="Call to action — book a strategic consultation with aKross"
      style={{
        background:
          "linear-gradient(135deg, var(--bg-midnight) 0%, var(--bg-primary) 50%, var(--bg-midnight) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.22)",
        borderBottom: "1px solid rgba(212,175,55,0.22)",
        padding: "clamp(5rem, 10vw, 9rem) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cinematic gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200,
          height: 700,
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(212,175,55,0.14) 0%, transparent 65%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle gold particle texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(212,175,55,0.1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Top & bottom gold rules */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "60%",
          height: 1,
          background: "linear-gradient(90deg, transparent, var(--gold-400), transparent)",
        }}
      />

      <div
        className="section-container"
        style={{ position: "relative", zIndex: 1, textAlign: "center" }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1.75rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "100px",
            border: "1px solid rgba(212,175,55,0.4)",
            background: "rgba(5,8,22,0.55)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 24px rgba(212,175,55,0.18)",
          }}
        >
          <Sparkles size={11} style={{ color: "var(--gold-300)" }} />
          <span
            style={{
              fontSize: "0.625rem",
              fontWeight: 600,
              color: "var(--gold-200)",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syne), sans-serif",
            }}
          >
            Begin the Transformation
          </span>
        </div>

        <h2
          className="headline-section"
          style={{
            marginBottom: "1.5rem",
            maxWidth: "22ch",
            margin: "0 auto 1.5rem",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          }}
        >
          Engineer a future{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>
            without compromise.
          </span>
        </h2>

        <div
          aria-hidden="true"
          style={{
            width: 64,
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--gold-400), transparent)",
            margin: "0 auto 2rem",
          }}
        />

        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.125rem",
            lineHeight: 1.8,
            maxWidth: "620px",
            margin: "0 auto 3rem",
            fontWeight: 300,
          }}
        >
          Schedule a confidential 45-minute strategic consultation with the aKross executive
          counsel — a thoughtful, non-commercial conversation about your enterprise&apos;s next
          decade.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/book-consultation"
            className="btn-primary"
            style={{ gap: "0.625rem" }}
          >
            <Calendar size={16} />
            Reserve a Consultation
          </Link>
          <Link
            href="tel:+971559300437"
            className="btn-outline"
            style={{ gap: "0.625rem" }}
          >
            <Phone size={16} />
            +971 55 930 0437
          </Link>
        </div>

        {/* Trust signals */}
        <div
          style={{
            display: "flex",
            gap: "2.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "4rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid rgba(212,175,55,0.18)",
          }}
        >
          {[
            "Confidential consultation",
            "Executive response within 2 hours",
            "200+ enterprise clients",
            "Sovereign data residency",
          ].map(point => (
            <div
              key={point}
              style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="7" fill="rgba(212,175,55,0.18)" />
                <path
                  d="M4 7l2 2 4-4"
                  stroke="#d4af37"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.02em",
                }}
              >
                {point}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
