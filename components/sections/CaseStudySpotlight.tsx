"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const cases = [
  {
    industry: "Real Estate",
    client: "Leading UAE Developer",
    title: "Odoo ERP Across 12 Companies",
    challenge: "Fragmented data, manual month-end close taking 3 weeks.",
    result: "Month-end close: 21 days → 3 days. 100% data visibility.",
    metric: "7×",
    metricLabel: "Faster Close",
    color: "#00d4ff",
    href: "/case-studies/real-estate-odoo-erp",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=700&q=80&auto=format&fit=crop",
  },
  {
    industry: "Retail & eCommerce",
    client: "GCC Fashion Brand",
    title: "Headless Shopify Plus + Odoo",
    challenge: "40+ lost orders per day due to inventory sync failures.",
    result: "Zero sync errors. 35% CVR increase. AED 2.4M extra revenue in 90 days.",
    metric: "35%",
    metricLabel: "CVR Lift",
    color: "#7b2fff",
    href: "/case-studies/retail-shopify-odoo",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop",
  },
  {
    industry: "Healthcare",
    client: "Dubai Hospital Group",
    title: "AI Patient Management & BI",
    challenge: "Paper-based records, zero clinic KPI visibility.",
    result: "100% digital records. 40% reduction in patient wait times.",
    metric: "40%",
    metricLabel: "Less Wait Time",
    color: "#00e68a",
    href: "/case-studies/healthcare-ai-transformation",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80&auto=format&fit=crop",
  },
];

export default function CaseStudySpotlight() {
  const { ref, isVisible } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      aria-labelledby="cases-heading"
      className="section-padding"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div>
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Featured Work</p>
            <h2 id="cases-heading" className="headline-section">
              Results That{" "}
              <span className="gradient-text">Speak for Themselves</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", textDecoration: "none", fontSize: "0.9375rem", fontWeight: 500, borderBottom: "1px solid rgba(0,212,255,0.3)", paddingBottom: "2px" }}
          >
            All Case Studies <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
          {cases.map((c, i) => (
            <Link
              key={c.title}
              href={c.href}
              className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
              style={{
                transitionDelay: `${i * 100}ms`,
                display: "flex",
                flexDirection: "column",
                borderRadius: "1.25rem",
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                overflow: "hidden",
                textDecoration: "none",
                transition: "border-color 0.35s, transform 0.35s, box-shadow 0.35s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${c.color}35`;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 24px 64px ${c.color}12`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 33vw"
                />
                {/* Gradient overlay */}
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 40%, rgba(7,7,10,0.95) 100%)` }} />
                {/* Industry tag */}
                <span
                  style={{
                    position: "absolute",
                    top: 12,
                    left: 12,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "100px",
                    background: `${c.color}20`,
                    border: `1px solid ${c.color}40`,
                    color: c.color,
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {c.industry}
                </span>
              </div>

              {/* Top accent line */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${c.color}, transparent)` }} />

              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 600,
                    fontSize: "1rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.35,
                    marginBottom: "1rem",
                  }}
                >
                  {c.title}
                </h3>

                <div style={{ marginBottom: "0.875rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Challenge</p>
                  <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{c.challenge}</p>
                </div>

                <div style={{ marginBottom: "1.25rem", flex: 1 }}>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginBottom: "0.2rem", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Outcome</p>
                  <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{c.result}</p>
                </div>

                {/* Key metric */}
                <div
                  style={{
                    padding: "0.875rem 1rem",
                    borderRadius: "0.75rem",
                    background: `${c.color}08`,
                    border: `1px solid ${c.color}20`,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                  }}
                >
                  <TrendingUp size={18} style={{ color: c.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="stat-number" style={{ fontSize: "1.375rem", fontWeight: 700, color: c.color, lineHeight: 1 }}>{c.metric}</div>
                    <div style={{ fontSize: "0.6875rem", color: "var(--text-tertiary)" }}>{c.metricLabel}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: c.color, fontWeight: 500 }}>
                    Read <ArrowUpRight size={13} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-labelledby="cases-heading"] > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
