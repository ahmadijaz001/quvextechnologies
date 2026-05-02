"use client";
import Link from "next/link";
import { Database, Globe, Megaphone, Bot, Server, Smartphone, ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const pillars = [
  {
    icon: Database,
    name: "Enterprise ERP",
    tagline: "Sovereign-grade ERP transformation. Odoo, SAP, Microsoft Dynamics — implemented with precision, governed with mastery.",
    href: "/services/erp",
    gridArea: "1 / 1 / 2 / 3",
  },
  {
    icon: Globe,
    name: "Web & eCommerce",
    tagline: "Couture digital experiences. Headless commerce, conversion-engineered platforms.",
    href: "/services/web-ecommerce",
    gridArea: "1 / 3 / 2 / 5",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing",
    tagline: "Strategic growth orchestration — SEO, paid media, brand storytelling.",
    href: "/services/digital-marketing",
    gridArea: "1 / 5 / 2 / 7",
  },
  {
    icon: Bot,
    name: "AI & Automation",
    tagline: "Generative AI, autonomous agents, RPA, BI — intelligence woven into every workflow.",
    href: "/services/ai-automation",
    gridArea: "2 / 1 / 3 / 3",
  },
  {
    icon: Server,
    name: "Cloud & IT Infrastructure",
    tagline: "Sovereign cloud, zero-trust networks, 24/7 managed services — operational continuity, guaranteed.",
    href: "/services/it-infrastructure",
    gridArea: "2 / 3 / 3 / 5",
  },
  {
    icon: Smartphone,
    name: "Mobile Applications",
    tagline: "Native iOS, Android, React Native, Flutter — apps engineered for executive audiences.",
    href: "/services/mobile-apps",
    gridArea: "2 / 5 / 3 / 7",
  },
];

export default function ServiceBentoGrid() {
  const { ref, isVisible } = useInView<HTMLElement>();
  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>The aKross Practice</p>
            <h2 id="services-heading" className="headline-section" style={{ maxWidth: "20ch" }}>
              Six pillars of{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>enterprise mastery.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="link-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              border: "none",
              paddingBottom: 0,
            }}
          >
            View Full Practice <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {pillars.map(pillar => (
            <Link
              key={pillar.name}
              href={pillar.href}
              className="service-card"
              style={{
                gridArea: pillar.gridArea,
                display: "flex",
                flexDirection: "column",
                padding: "2.25rem",
                textDecoration: "none",
                minHeight: 240,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Icon */}
              <div
                className="pillar-icon"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.04))",
                  border: "1px solid rgba(212,175,55,0.32)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  transition: "background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  color: "var(--gold-300)",
                }}
              >
                <pillar.icon size={22} strokeWidth={1.5} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.75rem",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {pillar.name}
              </h3>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.7,
                  flex: 1,
                  fontWeight: 300,
                }}
              >
                {pillar.tagline}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1.5rem",
                  fontSize: "0.6875rem",
                  color: "var(--gold-300)",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne), sans-serif",
                }}
              >
                Discover <ArrowUpRight size={12} />
              </div>

              {/* Top right gold corner accent */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  background: "radial-gradient(circle at top right, rgba(212,175,55,0.18), transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-grid > a { grid-area: auto !important; }
        }
      `}</style>
    </section>
  );
}
