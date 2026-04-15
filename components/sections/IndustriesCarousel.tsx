"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const industries = [
  { name: "Real Estate", icon: "🏗️", href: "/industries/real-estate", color: "#00d4ff" },
  { name: "Healthcare", icon: "🏥", href: "/industries/healthcare", color: "#00e68a" },
  { name: "Retail & eCommerce", icon: "🛍️", href: "/industries/retail", color: "#7b2fff" },
  { name: "F&B / Hospitality", icon: "🍽️", href: "/industries/hospitality", color: "#c9a44c" },
  { name: "Government", icon: "🏛️", href: "/industries/government", color: "#0066ff" },
  { name: "Legal", icon: "⚖️", href: "/industries/legal", color: "#ff4d6a" },
  { name: "Education", icon: "🎓", href: "/industries/education", color: "#00d4ff" },
  { name: "Oil & Gas", icon: "⚡", href: "/industries/oil-gas", color: "#c9a44c" },
  { name: "Logistics", icon: "🚚", href: "/industries/logistics", color: "#00e68a" },
  { name: "Finance & Banking", icon: "🏦", href: "/industries/finance", color: "#0066ff" },
  { name: "Construction", icon: "🏗️", href: "/industries/construction", color: "#7b2fff" },
  { name: "Manufacturing", icon: "🏭", href: "/industries/manufacturing", color: "#ff4d6a" },
];

export default function IndustriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", overflow: "hidden" }}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Industries We Serve</p>
            <h2 id="industries-heading" className="headline-section">
              Solutions Built for{" "}
              <span className="gradient-text">Every Sector</span>
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--bg-tertiary)",
                border: "1px solid var(--border)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable cards */}
      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, calc((100vw - 1400px) / 2 + 4rem))",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "1rem",
          scrollbarWidth: "none",
        }}
        tabIndex={0}
        role="region"
        aria-label="Industries carousel"
      >
        {industries.map(industry => (
          <Link
            key={industry.name}
            href={industry.href}
            style={{
              flexShrink: 0,
              width: 220,
              borderRadius: "1rem",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              padding: "1.75rem 1.5rem",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.875rem",
              transition: "border-color 0.3s, background 0.3s, transform 0.3s",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = `${industry.color}35`;
              el.style.background = `${industry.color}06`;
              el.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--border)";
              el.style.background = "var(--card-bg)";
              el.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "2rem" }} role="img" aria-hidden="true">{industry.icon}</span>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.5rem",
                  lineHeight: 1.3,
                }}
              >
                {industry.name}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--accent-primary)", fontWeight: 500 }}>
                See Solutions <ArrowUpRight size={13} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        div[aria-label="Industries carousel"]::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
