"use client";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";
import PageStarBackdrop from "@/components/sections/PageStarBackdrop";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const cases = [
  { industry: "Real Estate", slug: "real-estate-odoo-erp", title: "Multi-Company Odoo ERP for UAE Property Developer", challenge: "12 subsidiaries running on Excel and 3 different systems. Zero consolidated reporting.", result: "Month-end close: 21 days → 3 days. 100% data visibility. AED 200K/year saved in manual effort.", metric: "7x", metricLabel: "Faster Month-End Close", color: "#00d4ff", tags: ["Odoo ERP", "Multi-Company", "Real Estate"] },
  { industry: "Retail", slug: "retail-shopify-odoo", title: "Headless Shopify Plus + Odoo Inventory Sync", challenge: "40+ lost orders per day due to inventory sync failures. Arabic/English bilingual not working.", result: "Zero sync errors. 35% CVR increase. AED 2.4M additional revenue in 90 days. Full Arabic RTL.", metric: "35%", metricLabel: "Conversion Rate Increase", color: "#7b2fff", tags: ["Shopify Plus", "Odoo", "Headless Commerce"] },
  { industry: "Healthcare", slug: "healthcare-ai-transformation", title: "AI Patient Management & Real-Time BI Dashboard", challenge: "Paper-based records, manual appointment booking, zero insight into clinic performance.", result: "100% digital records. 40% reduction in patient wait times. Real-time KPI dashboards for 8 clinics.", metric: "40%", metricLabel: "Less Patient Wait Time", color: "#00e68a", tags: ["AI", "Business Intelligence", "Healthcare"] },
  { industry: "Logistics", slug: "logistics-fleet-management", title: "Custom Fleet & Delivery Management Platform", challenge: "100-vehicle fleet managed by phone calls and WhatsApp. Zero route optimization or delivery tracking.", result: "Full real-time fleet visibility. 28% fuel cost reduction. Customer delivery tracking portal.", metric: "28%", metricLabel: "Fuel Cost Reduction", color: "#c9a44c", tags: ["Custom Software", "IoT", "Logistics"] },
  { industry: "Finance", slug: "finance-ai-chatbot", title: "AI Customer Service Agent for Financial Institution", challenge: "200+ daily inbound queries overwhelming 8-person support team. 4-hour average response time.", result: "70% queries handled autonomously by AI. Response time: 4 hours → 30 seconds. NPS score +22 points.", metric: "70%", metricLabel: "Queries Automated", color: "#0066ff", tags: ["AI Chatbot", "NLP", "Finance"] },
  { industry: "F&B", slug: "restaurant-pos-integration", title: "Multi-Branch POS + Odoo ERP Integration for Restaurant Chain", challenge: "15 branches running on 3 different POS systems. No centralized sales reporting or inventory.", result: "Single dashboard for all 15 branches. Real-time inventory alerts. 22% reduction in food waste.", metric: "22%", metricLabel: "Food Waste Reduction", color: "#ff4d6a", tags: ["Odoo", "POS Integration", "F&B"] },
];

export default function CaseStudiesPage() {
  return (
    <>
      <PageStarBackdrop />
      <div className="cosmic-page">
        <section className="page-hero" style={{ paddingTop: "clamp(5.5rem,10vw,7.5rem)", paddingBottom: "clamp(2.5rem,4vw,3rem)", borderBottom: "1px solid var(--border)" }}>
          <div className="section-container" style={{ textAlign: "center" }}>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>Proven Results</p>
            <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
              Results That <span className="gradient-text">Speak for Themselves</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
              Real projects. Real clients. Real numbers. No case study on this page is hypothetical or embellished.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="section-container">
            <div className="cases-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {cases.map(c => (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  style={{ display: "flex", flexDirection: "column", borderRadius: "1rem", background: "var(--card-bg)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "border-color 0.3s, transform 0.3s", backdropFilter: "blur(12px)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${c.color}35`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <div style={{ height: 4, background: `linear-gradient(90deg, ${c.color}, transparent)` }} />
                  <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ display: "inline-block", marginBottom: "1rem", padding: "0.25rem 0.75rem", borderRadius: "100px", background: `${c.color}15`, color: c.color, fontSize: "0.75rem", fontWeight: 600, alignSelf: "flex-start" }}>{c.industry}</span>
                    <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.0625rem", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: "0.875rem" }}>{c.title}</h2>
                    <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}><strong style={{ color: "var(--text-tertiary)", fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}>CHALLENGE</strong>{c.challenge}</p>
                    <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1.25rem", flex: 1 }}><strong style={{ color: "var(--text-tertiary)", fontSize: "0.75rem", display: "block", marginBottom: "0.25rem" }}>RESULT</strong>{c.result}</p>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
                      {c.tags.map(tag => <span key={tag} style={{ padding: "0.2rem 0.625rem", borderRadius: "0.3rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{tag}</span>)}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", padding: "0.875rem", borderRadius: "0.75rem", background: `${c.color}08`, border: `1px solid ${c.color}20` }}>
                      <TrendingUp size={18} style={{ color: c.color }} />
                      <div>
                        <div className="stat-number" style={{ fontSize: "1.25rem", fontWeight: 700, color: c.color }}>{c.metric}</div>
                        <div style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{c.metricLabel}</div>
                      </div>
                      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--accent-primary)", fontWeight: 500 }}>Read <ArrowUpRight size={13} /></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </div>

      <style>{`
        @media (max-width: 1024px) { .cases-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; } }
        @media (max-width: 640px) {
          .cases-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .page-hero { padding-top: clamp(5rem, 18vw, 7rem) !important; padding-bottom: 2rem !important; }
          .cases-grid > a > div:last-child { padding: 1.25rem !important; }
        }
      `}</style>
    </>
  );
}
