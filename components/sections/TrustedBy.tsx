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
        padding: "0.75rem 1.125rem",
        borderRadius: "0.875rem",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        whiteSpace: "nowrap",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.3s",
        cursor: "default",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${color}35`;
        el.style.boxShadow = `0 4px 20px ${color}12`;
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--card-border)";
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
  { value: "150+",     label: "Active Clients" },
  { value: "12+",      label: "Industries" },
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
        padding: "5rem 0 4.5rem",
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle dot texture */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(37,99,235,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Header */}
      <div style={{
        textAlign: "center", marginBottom: "3rem",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        position: "relative", zIndex: 1,
      }}>
        <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Trusted by Industry Leaders</p>
        <h2 style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 700, fontSize: "clamp(1.375rem, 3vw, 2rem)",
          color: "var(--text-primary)", marginBottom: "0.875rem", lineHeight: 1.25,
        }}>
          Powering the UAE &amp; GCC&apos;s Most{" "}
          <span className="gradient-text">Respected Organisations</span>
        </h2>
        <p style={{
          fontSize: "0.9375rem", color: "var(--text-secondary)",
          maxWidth: "520px", margin: "0 auto 2rem", lineHeight: 1.7,
        }}>
          From Fortune 500 multinationals to fast-scaling UAE startups — leading organisations
          across the region trust Quvex Technologies to power their most critical systems.
        </p>

        {/* Mini stats */}
        <div style={{ display: "inline-flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          {miniStats.map(s => (
            <div key={s.label} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "0.625rem 1.25rem", borderRadius: "0.625rem",
              background: "var(--card-bg)", border: "1px solid var(--card-border)",
              boxShadow: "var(--shadow-sm)",
            }}>
              <div className="stat-number" style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--accent-primary)", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
      <div style={{ textAlign: "center", marginTop: "2.75rem", position: "relative", zIndex: 1 }}>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
          Join 150+ UAE and GCC organisations already working with Quvex Technologies
        </p>
      </div>
    </section>
  );
}
