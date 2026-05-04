"use client";
import Link from "next/link";
import { Database, Globe, Bot, Server, Cable, Cpu, ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/lib/services-data";

const pillarMeta: Record<string, { icon: typeof Database; color: string }> = {
  "erp":               { icon: Database, color: "#d4af37" },
  "web-ecommerce":     { icon: Globe,    color: "#e9d27a" },
  "ai-automation":     { icon: Bot,      color: "#f3e6b0" },
  "it-infrastructure": { icon: Server,   color: "#a8862a" },
  "fiber-cabling":     { icon: Cable,    color: "#56b8ff" },
  "it-peripherals":    { icon: Cpu,      color: "#dec05a" },
};

const MAX_SERVICES_PER_PILLAR = 6;

const pillars = serviceCategories
  .filter(cat => !cat.excludeFromNav)
  .map(cat => {
    const meta = pillarMeta[cat.slug] ?? { icon: Database, color: "#d4af37" };
    return {
      icon: meta.icon,
      color: meta.color,
      name: cat.name,
      href: `/services/${cat.slug}`,
      services: cat.services.slice(0, MAX_SERVICES_PER_PILLAR).map(s => ({
        name: s.name,
        href: `/services/${cat.slug}/${s.slug}`,
      })),
    };
  });

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="region"
      aria-label="Services mega menu"
      style={{
        position: "fixed",
        top: 84,
        left: 0,
        right: 0,
        background: "rgba(5, 8, 22, 0.92)",
        backdropFilter: "blur(28px) saturate(160%)",
        borderBottom: "1px solid rgba(212,175,55,0.22)",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        zIndex: 8999,
        padding: "3rem clamp(1.5rem, 5vw, 4rem) 2.5rem",
        animation: "megaFadeIn 0.35s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Top gold rule */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--gold-400), transparent)",
        }}
      />

      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "2rem" }}>
          {pillars.map(pillar => (
            <div key={pillar.name}>
              {/* Category header link */}
              <Link
                href={pillar.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  textDecoration: "none",
                  marginBottom: "1.25rem",
                }}
              >
                <span
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    background: `linear-gradient(135deg, ${pillar.color}18, ${pillar.color}06)`,
                    border: `1px solid ${pillar.color}38`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: `0 0 16px ${pillar.color}22`,
                  }}
                >
                  <pillar.icon size={16} style={{ color: pillar.color }} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    color: "var(--text-primary)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {pillar.name}
                </span>
              </Link>

              {/* Service links */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {pillar.services.map(svc => (
                  <li key={svc.href}>
                    <Link
                      href={svc.href}
                      onClick={onClose}
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--text-secondary)",
                        textDecoration: "none",
                        transition: "color 0.25s ease, padding-left 0.25s ease",
                        display: "block",
                        padding: "0.2rem 0",
                        lineHeight: 1.55,
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = "var(--gold-300)";
                        e.currentTarget.style.paddingLeft = "0.375rem";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = "var(--text-secondary)";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      {svc.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            marginTop: "2.5rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid rgba(212,175,55,0.15)",
            display: "flex",
            gap: "1.25rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-tertiary)",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Quick Access
          </span>
          {[
            { label: "All Services", href: "/services" },
            { label: "Book Consultation", href: "/book-consultation" },
            { label: "Case Studies", href: "/case-studies" },
            { label: "Contact", href: "/contact" },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                color: "var(--gold-300)",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.25s ease",
                fontFamily: "var(--font-syne), sans-serif",
                letterSpacing: "-0.005em",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "var(--gold-200)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "var(--gold-300)";
              }}
            >
              {l.label} <ArrowUpRight size={12} />
            </Link>
          ))}

          {/* Tagline right */}
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold-400)",
                boxShadow: "0 0 8px var(--gold-400)",
                animation: "megaDot 2.4s ease infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              UAE Certified · Enterprise-Class
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes megaDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.4); }
        }
        @media (max-width: 1200px) {
          div[aria-label="Services mega menu"] > div > div:first-child {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
