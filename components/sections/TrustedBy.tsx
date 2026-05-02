"use client";

/* ─── Brand list ─────────────────────────────────────────────────────────── */
const brands = [
  "Emirates Group",
  "Emaar Properties",
  "DAMAC Properties",
  "Etisalat e&",
  "du Telecom",
  "Noon",
  "Carrefour UAE",
  "RAK Bank",
  "Emirates NBD",
  "ENOC",
  "DP World",
  "Majid Al Futtaim",
  "Aldar Properties",
  "DEWA",
  "Meraas",
  "Nakheel",
  "RTA Dubai",
  "Dubai South",
  "ADNOC Group",
  "Al Futtaim Group",
  "Chalhoub Group",
  "Azizi Developments",
];

/* ─── Mini stats ─────────────────────────────────────────────────────────── */
const miniStats = [
  { value: "200+",     label: "Active Clients" },
  { value: "14+",      label: "Industries" },
  { value: "GCC-Wide", label: "Regional Presence" },
  { value: "98%",      label: "Client Retention" },
];

/* ─── Wordmark — clean typography, no fake logos ─────────────────────────── */
function Wordmark({ name }: { name: string }) {
  return (
    <span
      className="trusted-wordmark"
      style={{
        fontFamily: "var(--font-syne), sans-serif",
        fontSize: "1.125rem",
        fontWeight: 500,
        color: "rgba(245, 241, 230, 0.62)",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
        padding: "0 2.25rem",
        position: "relative",
        transition: "color 0.5s ease, text-shadow 0.5s ease",
      }}
    >
      {name}
    </span>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function TrustedBy() {
  // Duplicate the list once so the marquee can loop seamlessly
  const loop = [...brands, ...brands];

  return (
    <section
      aria-label="Trusted by industry leaders across UAE and GCC"
      style={{
        padding: "5.5rem 0 4.5rem",
        background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.10)",
        borderBottom: "1px solid rgba(212,175,55,0.10)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p className="label-tag" style={{ marginBottom: "1rem" }}>Trusted by Visionaries</p>
        <h2 className="headline-section" style={{ marginBottom: "1rem" }}>
          Engineering with the UAE&apos;s most{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>respected institutions.</span>
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            maxWidth: "620px",
            margin: "0 auto 2.25rem",
            lineHeight: 1.7,
          }}
        >
          From Fortune-class multinationals to sovereign entities — the GCC&apos;s most discerning
          organisations entrust aKross with their most strategic technology.
        </p>

        {/* Mini stats */}
        <div style={{ display: "inline-flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
          {miniStats.map(s => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.875rem 1.5rem",
                borderRadius: "10px",
                background: "rgba(10,17,41,0.5)",
                border: "1px solid rgba(212,175,55,0.22)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              }}
            >
              <div className="stat-number" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.625rem",
                  color: "var(--text-tertiary)",
                  marginTop: "0.375rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 500,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Single editorial marquee — pure typography wordmarks with vertical separators */}
      <div className="marquee-fade-edges" style={{ overflow: "hidden", padding: "1.25rem 0" }}>
        <div
          className="marquee-left"
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
            animationDuration: "60s",
          }}
        >
          {loop.map((name, i) => (
            <span key={`b-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
              <Wordmark name={name} />
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 1,
                  height: 18,
                  background: "rgba(212,175,55,0.22)",
                  margin: "0 0.25rem",
                }}
              />
            </span>
          ))}
        </div>
      </div>

      {/* Hover lift — gives wordmarks a subtle premium response */}
      <style>{`
        .trusted-wordmark:hover {
          color: var(--gold-100) !important;
          text-shadow: 0 0 22px rgba(212,175,55,0.45);
        }
      `}</style>

      {/* Bottom note */}
      <div style={{ textAlign: "center", marginTop: "2.25rem", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", letterSpacing: "0.04em" }}>
          Join 200+ UAE and GCC institutions trusting{" "}
          <span style={{ color: "var(--gold-300)", fontWeight: 600 }}>aKross</span>{" "}
          with their digital sovereignty.
        </p>
      </div>
    </section>
  );
}
