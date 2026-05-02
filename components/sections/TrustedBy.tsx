"use client";

/* ─── Brand data ─────────────────────────────────────────────────────────── */
// shape: "circle" | "rounded" | "square"
// style: "initials" | "wordmark" | "letter"
const brands = [
  { name: "Emirates Group",     sector: "Aviation",           initials: "EG",  color: "#c9a44c", bg: "#1a1200", shape: "rounded" },
  { name: "Emaar Properties",   sector: "Real Estate",        initials: "EM",  color: "#00c4ff", bg: "#001a22", shape: "circle"  },
  { name: "DAMAC Properties",   sector: "Real Estate",        initials: "DC",  color: "#e8c97a", bg: "#1a1500", shape: "rounded" },
  { name: "Etisalat (e&)",      sector: "Telecom",            initials: "e&",  color: "#00d97e", bg: "#001a0e", shape: "circle"  },
  { name: "du Telecom",         sector: "Telecom",            initials: "du",  color: "#7ecbff", bg: "#00101a", shape: "rounded" },
  { name: "Noon.com",           sector: "eCommerce",          initials: "N",   color: "#ffdd00", bg: "#1a1600", shape: "circle"  },
  { name: "Carrefour UAE",      sector: "Retail",             initials: "CF",  color: "#2563eb", bg: "#00082a", shape: "rounded" },
  { name: "RAK Bank",           sector: "Banking",            initials: "RB",  color: "#ef4444", bg: "#1a0000", shape: "circle"  },
  { name: "Emirates NBD",       sector: "Banking",            initials: "EN",  color: "#f59e0b", bg: "#1a0f00", shape: "rounded" },
  { name: "ENOC",               sector: "Energy",             initials: "EN",  color: "#22c55e", bg: "#001a05", shape: "square"  },
  { name: "DP World",           sector: "Logistics",          initials: "DP",  color: "#3b82f6", bg: "#00082a", shape: "circle"  },
  { name: "Majid Al Futtaim",   sector: "Retail & Lifestyle", initials: "MF",  color: "#a855f7", bg: "#0e001a", shape: "rounded" },
  { name: "Aldar Properties",   sector: "Real Estate",        initials: "AD",  color: "#06b6d4", bg: "#001215", shape: "circle"  },
  { name: "DEWA",               sector: "Utilities",          initials: "DW",  color: "#10b981", bg: "#001209", shape: "rounded" },
  { name: "Meraas",             sector: "Lifestyle",          initials: "MR",  color: "#f97316", bg: "#1a0800", shape: "circle"  },
  { name: "Nakheel",            sector: "Real Estate",        initials: "NK",  color: "#0ea5e9", bg: "#001015", shape: "rounded" },
  { name: "RTA Dubai",          sector: "Government",         initials: "RT",  color: "#6366f1", bg: "#06001a", shape: "square"  },
  { name: "Dubai South",        sector: "Real Estate",        initials: "DS",  color: "#14b8a6", bg: "#001210", shape: "circle"  },
  { name: "ADNOC Group",        sector: "Energy",             initials: "AD",  color: "#eab308", bg: "#181200", shape: "rounded" },
  { name: "Al Futtaim Group",   sector: "Conglomerate",       initials: "AF",  color: "#ec4899", bg: "#1a0010", shape: "circle"  },
  { name: "Chalhoub Group",     sector: "Luxury Retail",      initials: "CG",  color: "#d4af37", bg: "#181100", shape: "rounded" },
  { name: "Azizi Developments", sector: "Real Estate",        initials: "AZ",  color: "#38bdf8", bg: "#001018", shape: "circle"  },
] as const;

/* ─── SVG Logo Mark ──────────────────────────────────────────────────────── */
function LogoMark({ initials, color, bg, shape }: {
  initials: string;
  color: string;
  bg: string;
  shape: "circle" | "rounded" | "square";
}) {
  const size = 44;
  const r = shape === "circle" ? size / 2 : shape === "rounded" ? 10 : 4;
  const fs = initials.length === 1 ? 17 : initials.length === 2 ? 14 : 11;

  return (
    <svg
      width={size} height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={`lg-${initials}-${color.slice(1)}`} x1="0" y1="0" x2={size} y2={size} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect
        x="1" y="1" width={size - 2} height={size - 2}
        rx={r} ry={r}
        fill={bg}
        stroke={color}
        strokeOpacity="0.3"
        strokeWidth="1"
      />

      {/* Gradient overlay */}
      <rect
        x="1" y="1" width={size - 2} height={size - 2}
        rx={r} ry={r}
        fill={`url(#lg-${initials}-${color.slice(1)})`}
      />

      {/* Accent line top */}
      <rect
        x={r} y="1" width={size - r * 2} height="2"
        rx="1"
        fill={color}
        fillOpacity="0.6"
      />

      {/* Initials */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fill={color}
        fontSize={fs}
        fontWeight="800"
        fontFamily="'Syne', system-ui, sans-serif"
        letterSpacing="0.04em"
      >
        {initials}
      </text>
    </svg>
  );
}

/* ─── Brand Card ─────────────────────────────────────────────────────────── */
function BrandCard({ name, sector, initials, color, bg, shape }: typeof brands[number]) {
  return (
    <div
      style={{
        flexShrink: 0,
        margin: "0 0.5rem",
        padding: "0.875rem 1.25rem",
        borderRadius: "10px",
        background: "rgba(10,17,41,0.55)",
        border: "1px solid rgba(212,175,55,0.18)",
        backdropFilter: "blur(14px)",
        display: "flex",
        alignItems: "center",
        gap: "0.875rem",
        whiteSpace: "nowrap",
        transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.55)";
        el.style.boxShadow = "0 8px 32px rgba(212,175,55,0.18)";
        el.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(212,175,55,0.18)";
        el.style.boxShadow = "none";
        el.style.transform = "translateY(0)";
      }}
    >
      <LogoMark initials={initials} color={color} bg={bg} shape={shape} />

      <div>
        <div style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 700, fontSize: "0.875rem",
          color: "var(--text-primary)",
          letterSpacing: "0.01em", lineHeight: 1.2,
        }}>
          {name}
        </div>
        <div style={{
          fontSize: "0.625rem", color, fontWeight: 600,
          letterSpacing: "0.07em", textTransform: "uppercase", marginTop: "0.2rem",
        }}>
          {sector}
        </div>
      </div>
    </div>
  );
}

/* ─── Mini stats ─────────────────────────────────────────────────────────── */
const miniStats = [
  { value: "200+",     label: "Active Clients" },
  { value: "14+",      label: "Industries" },
  { value: "GCC-Wide", label: "Regional Presence" },
  { value: "98%",      label: "Client Retention" },
];

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function TrustedBy() {
  const doubled  = [...brands, ...brands];
  const reversed = [...doubled].reverse();

  return (
    <section
      aria-label="Trusted by industry leaders across UAE and GCC"
      style={{
        padding: "6rem 0 5rem",
        background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.15)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(212,175,55,0.06) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: "3.5rem",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        position: "relative", zIndex: 1,
      }}>
        <p className="label-tag" style={{ marginBottom: "1rem" }}>Trusted by Visionaries</p>
        <h2 className="headline-section" style={{ marginBottom: "1rem" }}>
          Engineering with the UAE&apos;s most{" "}
          <span className="gold-text" style={{ fontStyle: "italic" }}>respected institutions.</span>
        </h2>
        <p style={{
          fontSize: "1rem", color: "var(--text-secondary)",
          maxWidth: "620px", margin: "0 auto 2.25rem", lineHeight: 1.7,
        }}>
          From Fortune-class multinationals to sovereign entities — the GCC&apos;s most discerning
          organisations entrust aKross with their most strategic technology.
        </p>

        {/* Mini stats */}
        <div style={{ display: "inline-flex", gap: "0.875rem", flexWrap: "wrap", justifyContent: "center" }}>
          {miniStats.map(s => (
            <div key={s.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "0.875rem 1.5rem", borderRadius: "10px",
              background: "rgba(10,17,41,0.5)", border: "1px solid rgba(212,175,55,0.22)",
              backdropFilter: "blur(12px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}>
              <div className="stat-number" style={{ fontSize: "1.5rem", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.625rem", color: "var(--text-tertiary)", marginTop: "0.375rem", textTransform: "uppercase", letterSpacing: "0.18em", fontFamily: "var(--font-syne), sans-serif", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee rows */}
      <div style={{ position: "relative" }}>
        <div className="marquee-fade-edges" style={{ overflow: "hidden", marginBottom: "0.875rem" }}>
          <div className="marquee-left" style={{ display: "flex", width: "max-content" }}>
            {doubled.map((b, i) => <BrandCard key={`r1-${i}`} {...b} />)}
          </div>
        </div>
        <div className="marquee-fade-edges" style={{ overflow: "hidden" }}>
          <div className="marquee-right" style={{ display: "flex", width: "max-content" }}>
            {reversed.map((b, i) => <BrandCard key={`r2-${i}`} {...b} />)}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: "center", marginTop: "3rem", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", letterSpacing: "0.04em" }}>
          Join 200+ UAE and GCC institutions trusting <span style={{ color: "var(--gold-300)", fontWeight: 600 }}>aKross</span> with their digital sovereignty.
        </p>
      </div>
    </section>
  );
}
