"use client";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";
import PageStarBackdrop from "@/components/sections/PageStarBackdrop";
import { ArrowUpRight } from "lucide-react";


const industries = [
  { name: "Real Estate & Property", slug: "real-estate", icon: "🏗️", desc: "Property management software, CRM integration, Odoo ERP for developers, portals, and VAT compliance.", color: "#00d4ff" },
  { name: "Healthcare", slug: "healthcare", icon: "🏥", desc: "Patient management systems, clinic software, compliance with HAAD/DHA, medical billing, and AI diagnostics.", color: "#00e68a" },
  { name: "Retail & eCommerce", slug: "retail", icon: "🛍️", desc: "Shopify Plus, WooCommerce, POS integration, inventory sync, BNPL (Tabby/Tamara), and UAE payment gateways.", color: "#7b2fff" },
  { name: "F&B & Hospitality", slug: "hospitality", icon: "🍽️", desc: "Restaurant management, POS systems, online ordering, delivery integration, and loyalty programs.", color: "#c9a44c" },
  { name: "Government & Public Sector", slug: "government", icon: "🏛️", desc: "Digital transformation, e-government portals, compliance, document management, and citizen services.", color: "#0066ff" },
  { name: "Legal & Professional Services", slug: "legal", icon: "⚖️", desc: "Case management software, billing, document automation, client portals, and compliance tracking.", color: "#ff4d6a" },
  { name: "Education & Training", slug: "education", icon: "🎓", desc: "LMS platforms, student management, online learning, admissions systems, and HR for academic institutions.", color: "#00d4ff" },
  { name: "Oil & Gas", slug: "oil-gas", icon: "⚡", desc: "Asset management, field operations, HSE compliance, procurement systems, and industrial IoT.", color: "#c9a44c" },
  { name: "Logistics & Supply Chain", slug: "logistics", icon: "🚚", desc: "Fleet management, warehouse management, last-mile delivery integration, and supply chain visibility.", color: "#00e68a" },
  { name: "Finance & Banking", slug: "finance", icon: "🏦", desc: "Core banking systems, fintech integrations, compliance (CBUAE), digital wallets, and AI fraud detection.", color: "#0066ff" },
  { name: "Construction", slug: "construction", icon: "🏗️", desc: "Project management, procurement, subcontractor management, cost control, and field reporting.", color: "#7b2fff" },
  { name: "Manufacturing", slug: "manufacturing", icon: "🏭", desc: "MRP/MES systems, BOM management, quality control, maintenance scheduling, and supply chain.", color: "#ff4d6a" },
];

export default function IndustriesPage() {
  return (
    <>
      <PageStarBackdrop />
      <div className="cosmic-page">
        <section className="page-hero" style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
          <div className="section-container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>Industry Expertise</p>
            <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
              Solutions Built for <span className="gradient-text">Every Sector</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "600px", margin: "0 auto" }}>
              12 industries. 150+ clients. Deep domain expertise that goes beyond technology into understanding your business context, regulations, and competitive landscape.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="industries-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {industries.map(ind => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "2rem",
                    borderRadius: "1rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "border-color 0.3s, transform 0.3s",
                    backdropFilter: "blur(12px)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${ind.color}35`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <span style={{ fontSize: "2.5rem", marginBottom: "1.25rem" }} role="img">{ind.icon}</span>
                  <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.0625rem", color: "var(--text-primary)", marginBottom: "0.625rem" }}>{ind.name}</h2>
                  <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1 }}>{ind.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginTop: "1.25rem", fontSize: "0.8125rem", color: ind.color, fontWeight: 500 }}>
                    See Solutions <ArrowUpRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </div>

      <style>{`
        @media (max-width: 1024px) { .industries-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) {
          .industries-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .industries-grid > a { padding: 1.5rem !important; }
          .page-hero { padding-top: clamp(5rem, 18vw, 7rem) !important; padding-bottom: 2.5rem !important; }
        }
      `}</style>
    </>
  );
}
