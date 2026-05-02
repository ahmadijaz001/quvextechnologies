import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | aKross Information Technology",
  description: "Answers to common questions about aKross Information Technology services, ERP implementation, pricing, timelines, and support.",
  alternates: { canonical: "https://akross.ae/faq" },
};

const categories = [
  {
    name: "General",
    color: "#00d4ff",
    faqs: [
      { q: "What makes aKross different from other IT companies in Dubai?", a: "Three things: depth, accountability, and UAE-first thinking. We don't just implement software — we understand your business, design solutions that fit your actual workflows (not generic templates), and stay accountable after go-live. We're also the only full-service IT partner in the UAE that combines ERP, cybersecurity, AI, web development, and digital marketing under one roof with genuine expertise in each." },
      { q: "What industries do you specialize in?", a: "We have deep expertise in 12 industries: Real Estate & Property, Healthcare, Retail & eCommerce, F&B & Hospitality, Government, Legal & Professional Services, Education, Oil & Gas, Logistics & Supply Chain, Finance & Banking, Construction, and Manufacturing." },
      { q: "Do you work with startups or only enterprises?", a: "Both. We've delivered projects for pre-revenue startups and for enterprises with 5,000+ employees. Our approach scales — we have streamlined packages for SMEs and structured programs for enterprise digital transformation." },
      { q: "Are your services available outside of Dubai / UAE?", a: "Yes. While our headquarters is in Dubai, we serve clients across Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, and Egypt. We also have clients in the UK and Europe who use us for UAE market expansion projects." },
    ],
  },
  {
    name: "ERP & Technology",
    color: "#7b2fff",
    faqs: [
      { q: "Which ERP platform do you recommend?", a: "It depends on your size, budget, and requirements. For SMEs (20–500 employees), we typically recommend Odoo 18 — it offers the best feature set per dirham in the market. For mid-market companies already in the Microsoft ecosystem, Dynamics 365 is often the right fit. For companies with parent-company mandates, we implement SAP Business One. We always recommend based on your actual needs, not our margins." },
      { q: "How long does an ERP implementation take?", a: "Typical timeframes: Odoo for SME (3-5 modules): 8-12 weeks. Full Odoo enterprise (10+ modules + custom dev): 16-24 weeks. SAP Business One: 12-20 weeks. Microsoft Dynamics 365: 16-26 weeks. Custom ERP: 6-12 months." },
      { q: "Do you guarantee that your implementations go live on time?", a: "We have a 94% on-time delivery rate across 500+ projects. The 6% that slip are almost always due to client-side delays (data readiness, change management, decision-making). We use a structured project methodology with milestone gates that make delays visible early, not at the end." },
    ],
  },
  {
    name: "Pricing & Engagement",
    color: "#c9a44c",
    faqs: [
      { q: "How do you price your services?", a: "We use a fixed-price model for well-scoped projects (most ERP, web, and app projects) and time-and-materials for ongoing managed services and support. We provide detailed proposals with clear scope, deliverables, and payment milestones. No surprise invoices." },
      { q: "What is your minimum project size?", a: "For implementation projects, our minimum is AED 20,000. For managed services (IT support, digital marketing), we offer monthly retainer packages starting from AED 3,000/month. We do not charge for consultations." },
      { q: "Do you require payment upfront?", a: "No. We use milestone-based payment schedules: typically 30% at kick-off, 40% at UAT/go-live, and 30% upon project completion and sign-off. For managed services, invoices are monthly in advance." },
    ],
  },
  {
    name: "Support & After-Sales",
    color: "#00e68a",
    faqs: [
      { q: "What support do you offer after project go-live?", a: "All projects include a 30-day hypercare period post-go-live where our team is on high alert for any issues. After that, we offer SLA-backed support packages: Standard (8 business hour response), Professional (4-hour response), and Enterprise (1-hour response with dedicated account manager). We also offer annual managed service contracts." },
      { q: "Do you offer 24/7 IT support?", a: "Yes, for our IT Infrastructure and Managed Services clients. Our NOC (Network Operations Center) operates 24/7/365 with proactive monitoring — we typically know about an issue before you do." },
      { q: "Can we switch to aKross if we had a bad experience with another IT company?", a: "Absolutely — this is actually a significant portion of our new clients. We specialize in rescuing failed or stalled implementations and taking over managed services from underperforming vendors. We'll do an honest assessment of where things stand before committing to fix it." },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Got Questions?</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto" }}>
            Everything you need to know before working with us. Can&apos;t find your answer?{" "}
            <a href="/contact" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Contact us directly</a>.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container" style={{ maxWidth: "860px" }}>
          {categories.map(cat => (
            <div key={cat.name} style={{ marginBottom: "3.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: cat.color, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: cat.color, display: "block" }} />
                {cat.name}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {cat.faqs.map(faq => (
                  <details
                    key={faq.q}
                    style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "0.75rem", overflow: "hidden" }}
                  >
                    <summary style={{ padding: "1.25rem 1.5rem", cursor: "pointer", fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", listStyle: "none", userSelect: "none" }}>
                      {faq.q}
                    </summary>
                    <div style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px solid var(--bg-tertiary)" }}>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.75, paddingTop: "1rem" }}>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
