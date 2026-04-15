"use client";
import Link from "next/link";
import { Database, Globe, Megaphone, Bot, Server, Smartphone, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: Database,
    name: "ERP & Business Solutions",
    href: "/services/erp",
    color: "#2563eb",
    services: ["Odoo ERP Implementation", "HCM & Payroll", "CRM & Marketing Automation", "SAP Business One", "Zoho Suite", "Microsoft Dynamics 365"],
  },
  {
    icon: Globe,
    name: "Web & eCommerce",
    href: "/services/web-ecommerce",
    color: "#7c3aed",
    services: ["Custom Website Design", "Shopify & Shopify Plus", "WordPress Development", "WooCommerce", "Headless Commerce", "UI/UX Design"],
  },
  {
    icon: Megaphone,
    name: "Digital Marketing",
    href: "/services/digital-marketing",
    color: "#d97706",
    services: ["SEO Services", "Google Ads / SEM", "Social Media Marketing", "Meta Advertising", "Content Marketing", "Brand Identity & Design"],
  },
  {
    icon: Bot,
    name: "AI, Automation & Data",
    href: "/services/ai-automation",
    color: "#059669",
    services: ["AI Consulting & Strategy", "Generative AI Solutions", "AI Chatbots", "RPA", "Business Intelligence", "Machine Learning"],
  },
  {
    icon: Server,
    name: "IT Infrastructure",
    href: "/services/it-infrastructure",
    color: "#0284c7",
    services: ["IT Consulting", "Cloud Solutions", "Cybersecurity", "Managed IT Services 24/7", "Networking Solutions", "Disaster Recovery"],
  },
  {
    icon: Smartphone,
    name: "Mobile App Development",
    href: "/services/mobile-apps",
    color: "#dc2626",
    services: ["iOS App Development", "Android Development", "React Native", "Flutter", "PWA", "Enterprise Mobile Solutions"],
  },
];

export default function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="region"
      aria-label="Services mega menu"
      style={{
        position: "fixed",
        top: 72,
        left: 0,
        right: 0,
        background: "#ffffff",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
        zIndex: 8999,
        padding: "2.5rem clamp(1.5rem, 5vw, 4rem) 2rem",
        animation: "megaFadeIn 0.2s ease",
      }}
    >
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.5rem" }}>
          {pillars.map(pillar => (
            <div key={pillar.name}>
              {/* Category header link */}
              <Link
                href={pillar.href}
                onClick={onClose}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "1rem" }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "0.625rem",
                    background: `${pillar.color}12`,
                    border: `1px solid ${pillar.color}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <pillar.icon size={16} style={{ color: pillar.color }} />
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 700,
                    fontSize: "0.8125rem",
                    color: "#0a0e1a",
                    lineHeight: 1.25,
                  }}
                >
                  {pillar.name}
                </span>
              </Link>

              {/* Service links */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                {pillar.services.map(svc => (
                  <li key={svc}>
                    <Link
                      href={`${pillar.href}/${svc.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}
                      onClick={onClose}
                      style={{
                        fontSize: "0.8125rem",
                        color: "#64748b",
                        textDecoration: "none",
                        transition: "color 0.15s",
                        display: "block",
                        padding: "0.15rem 0",
                        lineHeight: 1.5,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = pillar.color; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; }}
                    >
                      {svc}
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
            marginTop: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "#94a3b8", fontWeight: 500 }}>Quick links:</span>
          {[
            { label: "All Services",            href: "/services" },
            { label: "Book Free Consultation",  href: "/book-consultation" },
            { label: "Case Studies",            href: "/case-studies" },
            { label: "Contact Us",              href: "/contact" },
          ].map(l => (
            <Link
              key={l.label}
              href={l.href}
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.8125rem",
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: 600,
                transition: "color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "#7c3aed"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#2563eb"; }}
            >
              {l.label} <ArrowRight size={12} />
            </Link>
          ))}

          {/* Tagline right */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "megaDot 2s ease infinite" }} />
            <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 500 }}>
              UAE&apos;s #1 Certified Technology Partner
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes megaFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes megaDot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.3); }
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
