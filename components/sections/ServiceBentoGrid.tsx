"use client";
import Link from "next/link";
import { Database, Globe, Megaphone, Bot, Server, Smartphone, ArrowUpRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const pillars = [
  {
    icon: Database,
    name: "ERP & Business Solutions",
    tagline: "Odoo, SAP, Dynamics, Zoho — we implement and customize the world's best ERPs for UAE businesses.",
    href: "/services/erp",
    color: "#00d4ff",
    span: "col-span-2",
    gridArea: "1 / 1 / 2 / 3",
  },
  {
    icon: Globe,
    name: "Web & eCommerce Development",
    tagline: "Custom websites, Shopify Plus, headless commerce — built to convert.",
    href: "/services/web-ecommerce",
    color: "#7b2fff",
    span: "",
    gridArea: "1 / 3 / 2 / 5",
  },
  {
    icon: Megaphone,
    name: "Digital Marketing & Creative",
    tagline: "SEO, Google Ads, social media, branding — full-funnel growth.",
    href: "/services/digital-marketing",
    color: "#c9a44c",
    span: "",
    gridArea: "1 / 5 / 2 / 7",
  },
  {
    icon: Bot,
    name: "AI, Automation & Data",
    tagline: "Generative AI, chatbots, RPA, and BI — intelligence built into every workflow.",
    href: "/services/ai-automation",
    color: "#00e68a",
    span: "col-span-2",
    gridArea: "2 / 1 / 3 / 3",
  },
  {
    icon: Server,
    name: "IT Infrastructure & Managed Services",
    tagline: "Cloud, networking, cybersecurity, 24/7 managed IT — your ops, guaranteed.",
    href: "/services/it-infrastructure",
    color: "#0066ff",
    span: "col-span-2",
    gridArea: "2 / 3 / 3 / 5",
  },
  {
    icon: Smartphone,
    name: "Mobile App Development",
    tagline: "iOS, Android, React Native, Flutter — apps that users love.",
    href: "/services/mobile-apps",
    color: "#ff4d6a",
    span: "",
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
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className={`reveal reveal-up ${isVisible ? "in-view" : ""}`} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>What We Do</p>
            <h2 id="services-heading" className="headline-section" style={{ maxWidth: "18ch" }}>
              Six Pillars of Digital{" "}
              <span className="gradient-text">Transformation</span>
            </h2>
          </div>
          <Link
            href="/services"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "var(--accent-primary)",
              textDecoration: "none",
              fontSize: "0.9375rem",
              fontWeight: 500,
              borderBottom: "1px solid rgba(0,212,255,0.3)",
              paddingBottom: "2px",
              whiteSpace: "nowrap",
            }}
          >
            View All Services <ArrowUpRight size={16} />
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
                padding: "2rem",
                textDecoration: "none",
                minHeight: 200,
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${pillar.color}40`;
                el.style.boxShadow = `0 0 40px ${pillar.color}10`;
                el.style.background = `${pillar.color}05`;
                const icon = el.querySelector(".pillar-icon") as HTMLElement;
                if (icon) { icon.style.color = pillar.color; icon.style.background = `${pillar.color}20`; }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.boxShadow = "none";
                el.style.background = "var(--card-bg)";
                const icon = el.querySelector(".pillar-icon") as HTMLElement;
                if (icon) { icon.style.color = "var(--text-secondary)"; icon.style.background = "var(--border)"; }
              }}
            >
              {/* Icon */}
              <div
                className="pillar-icon"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "0.75rem",
                  background: "var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                  transition: "background 0.3s, color 0.3s",
                  color: "var(--text-secondary)",
                }}
              >
                <pillar.icon size={22} />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 600,
                  fontSize: "1.0625rem",
                  color: "var(--text-primary)",
                  marginBottom: "0.625rem",
                  lineHeight: 1.3,
                }}
              >
                {pillar.name}
              </h3>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.6,
                  flex: 1,
                }}
              >
                {pillar.tagline}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  marginTop: "1.25rem",
                  fontSize: "0.8125rem",
                  color: "var(--accent-primary)",
                  fontWeight: 500,
                }}
              >
                Explore <ArrowUpRight size={14} />
              </div>

              {/* Background glow dot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-30%",
                  right: "-10%",
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${pillar.color}08 0%, transparent 70%)`,
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
