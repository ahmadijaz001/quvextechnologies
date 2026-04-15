"use client";
import { Shield, Globe2, Cpu, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

const usps = [
  { icon: Globe2,  title: "One Partner, Total Transformation", desc: "From ERP to cybersecurity, web to AI — full technology lifecycle under one roof. No vendor sprawl, no gaps.", color: "#00d4ff" },
  { icon: Shield,  title: "UAE-First Compliance",              desc: "FTA VAT, WPS payroll, MOHRE, PDPL data residency. We speak UAE regulations natively.", color: "#c9a44c" },
  { icon: Cpu,     title: "AI-Enhanced Everything",            desc: "AI is baked into every solution we build — smarter ERP, smarter marketing, smarter infrastructure.", color: "#7b2fff" },
  { icon: Clock,   title: "24/7 Managed Operations",           desc: "Proactive monitoring around the clock. Our NOC team watches your systems so you wake up to good news.", color: "#00e68a" },
];

const certBadges = ["Odoo Gold Partner", "AWS Partner", "Google Partner", "ISO 27001", "Microsoft Partner"];

export default function WhyChooseUs() {
  const { ref, isVisible } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      style={{
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 620,
        }}
      >
        {/* ── Left: Image panel ── */}
        <div
          className={`reveal reveal-left ${isVisible ? "in-view" : ""}`}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 480,
          }}
        >
          {/* Background image — Dubai skyline */}
          <Image
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80&auto=format&fit=crop"
            alt="Dubai skyline — Quvex Technologies serves UAE businesses"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
          {/* Dark overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,7,10,0.85) 0%, rgba(7,7,10,0.5) 60%, rgba(0,212,255,0.08) 100%)" }} />

          {/* Content over image */}
          <div style={{ position: "relative", zIndex: 1, padding: "clamp(2.5rem,5vw,4rem)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Why Quvex</p>
            <h2
              id="why-heading"
              className="headline-section"
              style={{ marginBottom: "1.5rem", maxWidth: "14ch" }}
            >
              Not Just Another{" "}
              <span className="gradient-text">IT Company.</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", lineHeight: 1.75, maxWidth: "440px", marginBottom: "2rem" }}>
              We built Quvex because we saw the gap between what businesses in the UAE need and what traditional IT vendors deliver. Deep expertise, honest advice, accountability that doesn&apos;t end at go-live.
            </p>

            {/* Cert badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {certBadges.map(cert => (
                <span
                  key={cert}
                  style={{
                    padding: "0.3rem 0.75rem",
                    borderRadius: "100px",
                    border: "1px solid rgba(201,164,76,0.4)",
                    background: "rgba(201,164,76,0.08)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--accent-secondary)",
                    letterSpacing: "0.04em",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: USP grid ── */}
        <div
          className={`reveal reveal-right ${isVisible ? "in-view" : ""}`}
          style={{
            padding: "clamp(2.5rem,5vw,4.5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {usps.map((usp, i) => (
              <div
                key={usp.title}
                className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
                style={{
                  transitionDelay: `${i * 80}ms`,
                  padding: "1.75rem",
                  borderRadius: "1rem",
                  background: `${usp.color}06`,
                  border: `1px solid ${usp.color}18`,
                  transition: "transform 0.3s, border-color 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = `${usp.color}40`;
                  el.style.boxShadow = `0 16px 40px ${usp.color}10`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = `${usp.color}18`;
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "0.75rem",
                    background: `${usp.color}15`,
                    border: `1px solid ${usp.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <usp.icon size={20} style={{ color: usp.color }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
                  {usp.title}
                </h3>
                <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                  {usp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-labelledby="why-heading"] > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
