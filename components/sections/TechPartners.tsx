"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

// Each partner has a multi-character abbr rendered in a styled logomark
const partners = [
  { name: "Odoo",                abbr: "oo",   tier: "Gold Partner",        color: "#c9a44c",  description: "ERP & Business Apps" },
  { name: "Shopify Plus",        abbr: "S+",   tier: "Partner",             color: "#7b2fff",  description: "eCommerce Platform" },
  { name: "Amazon Web Services", abbr: "aws",  tier: "Select Tier Partner", color: "#00d4ff",  description: "Cloud Infrastructure" },
  { name: "Microsoft Azure",     abbr: "Az",   tier: "Partner",             color: "#0066ff",  description: "Cloud & Productivity" },
  { name: "Google Cloud",        abbr: "GC",   tier: "Partner",             color: "#00e68a",  description: "Cloud & AI Platform" },
  { name: "Meta Business",       abbr: "f",    tier: "Business Partner",    color: "#0066ff",  description: "Digital Advertising" },
  { name: "WordPress",           abbr: "W",    tier: "Agency Partner",      color: "#7b2fff",  description: "CMS & Web Platform" },
  { name: "Cisco",               abbr: "C!",   tier: "Premier Partner",     color: "#00d4ff",  description: "Networking & Security" },
  { name: "Fortinet",            abbr: "FT",   tier: "Partner",             color: "#ff4d6a",  description: "Cybersecurity" },
  { name: "HubSpot",             abbr: "Hs",   tier: "Solutions Partner",   color: "#c9a44c",  description: "CRM & Marketing" },
  { name: "Zoho",                abbr: "Z",    tier: "Premium Partner",     color: "#00e68a",  description: "Business Suite" },
  { name: "Palo Alto Networks",  abbr: "PA",   tier: "Partner",             color: "#ff4d6a",  description: "Next-Gen Security" },
  { name: "VMware",              abbr: "vm",   tier: "Partner",             color: "#00d4ff",  description: "Virtualization" },
  { name: "Dell Technologies",   abbr: "dell", tier: "Partner",             color: "#0066ff",  description: "Hardware & Cloud" },
  { name: "HPE",                 abbr: "HPE",  tier: "Partner",             color: "#00e68a",  description: "Servers & Storage" },
  { name: "ServiceNow",          abbr: "sn",   tier: "Partner",             color: "#c9a44c",  description: "ITSM Platform" },
  { name: "Magento / Adobe",     abbr: "M",    tier: "Partner",             color: "#ff4d6a",  description: "Commerce Platform" },
  { name: "Google Ads",          abbr: "G",    tier: "Premier Partner",     color: "#00e68a",  description: "Search & Display" },
];

const VISIBLE   = 5;
const TOTAL     = partners.length;
const MAX_SLIDE = TOTAL - VISIBLE;

export default function TechPartners() {
  const [slide,   setSlide]   = useState(0);
  const [paused,  setPaused]  = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const { ref: sectionRef, isVisible } = useInView<HTMLElement>();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setSlide(s => (s >= MAX_SLIDE ? 0 : s + 1)), []);
  const prev = useCallback(() => setSlide(s => (s <= 0 ? MAX_SLIDE : s - 1)), []);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, next]);

  const CARD_W = 100 / VISIBLE;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="partners-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", overflow: "hidden" }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ textAlign: "center", marginBottom: "3.5rem" }}
        >
          <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Technology Partnerships</p>
          <h2
            id="partners-heading"
            className="headline-section"
            style={{ marginBottom: "1rem" }}
          >
            Official Certifications,{" "}
            <span className="gradient-text">Enterprise-Grade Delivery</span>
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.75,
            }}
          >
            Certified partner status with the world&apos;s leading technology vendors — giving every client access to best-in-class tools, official support channels, and partner-exclusive pricing.
          </p>
        </div>

        {/* Partner count badge */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ textAlign: "center", marginBottom: "2.5rem", transitionDelay: "0.1s" }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem", padding: "0.75rem 1.75rem", borderRadius: "100px", background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "var(--shadow-sm)" }}>
            {[
              { value: "18+",  label: "Technology Partners" },
              { value: "Gold", label: "Odoo Partner Tier" },
              { value: "5",    label: "Cloud Certifications" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: i > 0 ? "1.5rem" : 0 }}>
                {i > 0 && <div style={{ width: 1, height: 24, background: "var(--card-border)" }} />}
                <div style={{ textAlign: "center" }}>
                  <div className="stat-number" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--accent-primary)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.625rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: "0.15rem" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ transitionDelay: "0.2s" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{ overflow: "hidden", borderRadius: "1rem" }}>
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${slide * CARD_W}%)` }}
            >
              {partners.map((p, i) => {
                const isHov = hovered === i;
                const fontSize = p.abbr.length > 3 ? "0.5rem" : p.abbr.length > 2 ? "0.625rem" : p.abbr.length > 1 ? "0.8125rem" : "1.125rem";

                return (
                  <div
                    key={p.name}
                    style={{ width: `${CARD_W}%`, flexShrink: 0, padding: "0 0.625rem", boxSizing: "border-box" }}
                  >
                    <div
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        padding: "1.75rem 1rem",
                        borderRadius: "1rem",
                        background: isHov ? `${p.color}08` : "var(--card-bg)",
                        border: `1px solid ${isHov ? `${p.color}35` : "var(--card-border)"}`,
                        textAlign: "center",
                        transition: "border-color 0.3s, background 0.3s, transform 0.3s, box-shadow 0.3s",
                        transform: isHov ? "translateY(-6px)" : "translateY(0)",
                        boxShadow: isHov ? `0 16px 48px ${p.color}20` : "var(--shadow-sm)",
                        cursor: "default",
                      }}
                    >
                      {/* Logo mark */}
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "0.875rem",
                          background: isHov
                            ? `linear-gradient(135deg, ${p.color}28, ${p.color}12)`
                            : "var(--bg-tertiary)",
                          border: `1px solid ${isHov ? `${p.color}40` : "var(--card-border)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 1rem",
                          transition: "all 0.3s",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        {/* Background glow when hovered */}
                        {isHov && (
                          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at center, ${p.color}20, transparent 70%)`, pointerEvents: "none" }} />
                        )}
                        <span
                          style={{
                            fontFamily: "var(--font-syne), sans-serif",
                            fontWeight: 900,
                            fontSize,
                            color: isHov ? p.color : "var(--text-secondary)",
                            letterSpacing: p.abbr.length > 2 ? "0.02em" : "0.05em",
                            transition: "color 0.3s",
                            position: "relative",
                            zIndex: 1,
                            textTransform: "lowercase" in p ? "none" : "none",
                          }}
                        >
                          {p.abbr}
                        </span>
                      </div>

                      <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "var(--text-primary)", lineHeight: 1.3, marginBottom: "0.25rem" }}>
                        {p.name}
                      </div>

                      <div style={{ fontSize: "0.625rem", color: "var(--text-tertiary)", marginBottom: "0.625rem", letterSpacing: "0.02em" }}>
                        {p.description}
                      </div>

                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", padding: "0.2rem 0.5rem", borderRadius: "100px", background: `${p.color}12`, border: `1px solid ${p.color}22` }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.color }} />
                        <span style={{ fontSize: "0.5625rem", color: p.color, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                          {p.tier}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.25rem", marginTop: "2rem" }}>
            <button
              onClick={prev}
              aria-label="Previous partners"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(37,99,235,0.08)";
                el.style.borderColor = "rgba(37,99,235,0.3)";
                el.style.color = "var(--accent-primary)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = "var(--card-bg)";
                el.style.borderColor = "var(--card-border)";
                el.style.color = "var(--text-secondary)";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              {Array.from({ length: MAX_SLIDE + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  className={`carousel-dot ${slide === i ? "active" : ""}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next partners"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "var(--shadow-sm)",
                transition: "background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.background = "rgba(37,99,235,0.08)";
                el.style.borderColor = "rgba(37,99,235,0.3)";
                el.style.color = "var(--accent-primary)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.background = "var(--card-bg)";
                el.style.borderColor = "var(--card-border)";
                el.style.color = "var(--text-secondary)";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Bottom note */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ textAlign: "center", marginTop: "2.5rem", transitionDelay: "0.3s" }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", lineHeight: 1.7 }}>
            Partnership certifications verified as of 2025. Additional vendor relationships available upon request.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .carousel-track > div { width: ${100 / 4}% !important; } }
        @media (max-width: 768px)  { .carousel-track > div { width: ${100 / 3}% !important; } }
        @media (max-width: 480px)  { .carousel-track > div { width: 50% !important; } }
      `}</style>
    </section>
  );
}
