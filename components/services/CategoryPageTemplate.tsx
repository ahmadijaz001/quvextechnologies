"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import ServiceGrid from "./ServiceGrid";
import CTABanner from "@/components/sections/CTABanner";
import type { ServiceCategory } from "@/lib/services-data";

const Service3DBackdrop = dynamic(() => import("./Service3DBackdrop"), { ssr: false });
const Service3DIcon = dynamic(() => import("./Service3DIcon"), { ssr: false });

interface CategoryPageTemplateProps {
  category: ServiceCategory;
}

const categoryFAQs: Record<string, { q: string; a: string }[]> = {
  erp: [
    { q: "How long does an Odoo ERP implementation take?", a: "A typical Odoo implementation for a UAE SME (50-200 employees) takes 8-16 weeks from kick-off to go-live, depending on complexity, number of modules, and data migration requirements. Enterprise implementations with custom development may take 4-6 months." },
    { q: "Do you support Arabic (RTL) in Odoo?", a: "Yes. Arabic is a core language in Odoo and we handle full Arabic localization including RTL interface, Arabic invoice/report templates, Arabic chart of accounts, and Arabic-English bilingual documents." },
    { q: "Can you migrate data from our existing system (QuickBooks, Tally, SAP)?", a: "Absolutely. We handle data migration from virtually any system including QuickBooks, Tally, SAP, Oracle, Microsoft Dynamics, Sage, and custom legacy systems using our proven ETL (Extract, Transform, Load) methodology." },
    { q: "Is Odoo UAE VAT compliant?", a: "Yes. Odoo 18 is fully UAE FTA-compliant out of the box, including VAT calculations, tax groups, VAT reports, and electronic VAT filing. We also handle FTA registration requirements and tax compliance audits." },
    { q: "What post-implementation support do you offer?", a: "We offer SLA-backed managed support packages including: Standard (next business day), Professional (4-hour response), and Enterprise (1-hour response with dedicated account manager). All packages include proactive system monitoring." },
  ],
  "web-ecommerce": [
    { q: "How long does a custom website take to build?", a: "A standard corporate website takes 6-10 weeks. A full eCommerce store with custom features typically takes 10-16 weeks. Headless commerce projects may take 16-24 weeks depending on integrations and complexity." },
    { q: "Do you support Arabic RTL websites?", a: "Yes. All our websites support full Arabic RTL layout with proper bidirectional text rendering, RTL-aware UI components, Arabic typography, and seamless language switching." },
    { q: "What CMS do you recommend for UAE businesses?", a: "For marketing-driven sites: WordPress or Sanity CMS. For eCommerce: Shopify Plus or WooCommerce for SMEs, Magento/Adobe Commerce for enterprise. For complex portals: Strapi or custom headless CMS. We recommend based on your specific needs." },
    { q: "Do you provide ongoing website maintenance?", a: "Yes. We offer monthly maintenance packages covering security updates, performance monitoring, content updates, analytics reporting, and technical support." },
  ],
  "digital-marketing": [
    { q: "How quickly can I see results from Google Ads?", a: "Google Ads campaigns can generate leads within the first 48-72 hours of going live. However, true optimization takes 30-60 days as we gather enough data to refine targeting, bids, and ad copy for maximum ROI." },
    { q: "Do you manage Arabic social media content?", a: "Yes. We have a bilingual creative team that produces content in both Arabic and English, tailored for UAE and GCC audiences on Instagram, TikTok, Snapchat, LinkedIn, and Facebook." },
    { q: "What is your minimum monthly budget for Google Ads?", a: "We recommend a minimum ad spend of AED 5,000/month to get meaningful data and results. Management fees are separate. For highly competitive industries (real estate, healthcare), we recommend AED 15,000+ monthly ad spend." },
    { q: "Do you offer performance-based pricing?", a: "For established businesses with sufficient data history, we can discuss performance-based models for specific channels. We're always aligned with your growth objectives." },
  ],
  "ai-automation": [
    { q: "What AI tools/platforms do you work with?", a: "We work across the full AI stack: OpenAI GPT-4o, Anthropic Claude, Google Gemini, Mistral, and open-source models (Llama, Qwen). For automation: Make.com, n8n, Zapier, Microsoft Power Automate, UiPath, and Automation Anywhere." },
    { q: "Is our data safe when you implement AI solutions?", a: "Data security is paramount. We follow UAE data residency requirements and PDPL compliance. AI solutions can be deployed on-premise, in your private cloud (Azure/AWS), or with secure API calls that don't store your data." },
    { q: "How long does an AI chatbot implementation take?", a: "A basic FAQ chatbot can be live in 2-3 weeks. A sophisticated AI agent with CRM integration, product knowledge base, and multi-channel deployment (website, WhatsApp, Instagram) takes 6-10 weeks." },
    { q: "What ROI can I expect from AI automation?", a: "ROI varies widely by use case. Chatbots typically achieve cost reduction of 40-70% on handled queries. RPA projects typically pay back in 6-18 months. AI analytics projects show ROI through better decision-making rather than direct cost savings." },
  ],
  "it-infrastructure": [
    { q: "Do you offer 24/7 managed IT support in UAE?", a: "Yes. Our NOC (Network Operations Center) provides 24/7/365 monitoring and support from our Dubai operations center. We offer tiered SLA packages with response times from 1 hour to next business day." },
    { q: "Can you help with cloud migration from on-premise?", a: "Absolutely. We handle full cloud migration assessments, planning, and execution for AWS, Azure, and Google Cloud. We assess your current environment, right-size cloud resources, and handle the migration with minimal downtime." },
    { q: "What cybersecurity compliance do you help with?", a: "We help UAE businesses comply with NESA (National Electronic Security Authority), UAE PDPL (Personal Data Protection Law), PCI DSS, ISO 27001, and healthcare-specific HAAD/DHA requirements." },
    { q: "Do you supply hardware as well?", a: "Yes. We're an authorized reseller for Dell, HPE, Cisco, Fortinet, and other major vendors. We handle procurement, configuration, and deployment of servers, networking equipment, storage, and end-user devices." },
  ],
  "mobile-apps": [
    { q: "Should I build a native app or cross-platform?", a: "It depends on your requirements and budget. Native (Swift/Kotlin) gives the best performance and platform-specific features. React Native or Flutter gives 80-90% of native performance at 60-70% of native development cost. We recommend cross-platform for most business apps and native for complex, performance-critical apps." },
    { q: "How much does a mobile app cost in Dubai?", a: "A simple app (10-15 screens, basic features) starts from AED 40,000-80,000. A complex app with backend integrations, real-time features, and payment processing ranges from AED 120,000-300,000+. Enterprise apps are scoped individually." },
    { q: "Do you handle App Store and Google Play submission?", a: "Yes. We handle the full submission process including App Store Connect, Google Play Console, metadata, screenshots, ASO (App Store Optimization), and ongoing app updates and maintenance." },
    { q: "Can you integrate our existing backend/ERP with the mobile app?", a: "Yes. We specialize in integrating mobile apps with existing systems including Odoo, SAP, Dynamics, custom REST APIs, and third-party services. API integration is a core part of every app we build." },
  ],
};

export default function CategoryPageTemplate({ category }: CategoryPageTemplateProps) {
  const faqs = categoryFAQs[category.slug] || [];

  return (
    <>
      {/* Hero */}
      <section
        className="svc-hero"
        style={{
          paddingTop: "clamp(6rem, 12vw, 9rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
          ["--accent" as never]: category.color,
        }}
      >
        <Service3DBackdrop accentColor={category.color} density="low" scale={0.55} />

        <div aria-hidden="true" className="svc-hero-orb" style={{ top: "-20%", right: "-8%", width: "55vw", height: "55vw", maxWidth: 640, maxHeight: 640, background: `radial-gradient(circle, ${category.color}14 0%, transparent 65%)`, animationDuration: "10s" }} />
        <div aria-hidden="true" className="svc-hero-orb" style={{ bottom: "-30%", left: "-5%", width: "40vw", height: "40vw", maxWidth: 460, maxHeight: 460, background: "radial-gradient(circle, rgba(123,47,255,0.10) 0%, transparent 65%)", animationDuration: "12s", animationDelay: "1.4s" }} />

        <div className="section-container">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "2rem" }}>
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: category.name, href: `/services/${category.slug}`, current: true },
            ].map((crumb, i, arr) => (
              <span key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                {crumb.current ? (
                  <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", textDecoration: "none" }}>
                    {crumb.label}
                  </Link>
                )}
                {i < arr.length - 1 && <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />}
              </span>
            ))}
          </nav>

          <div className="cat-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "3rem", alignItems: "center" }}>
            <div>
              <p className="label-tag" style={{ marginBottom: "1rem" }}>Service Category</p>
              <h1
                className="headline-section"
                style={{ marginBottom: "1.25rem", maxWidth: "20ch" }}
              >
                {category.name}
              </h1>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "640px", marginBottom: "2rem" }}>
                {category.description}
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/book-consultation" className="btn-primary">
                  Book a Free Consultation
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="cat-hero-icon" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Service3DIcon category={category.slug} accentColor={category.color} size={220} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .cat-hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
            .cat-hero-icon { order: -1; }
            .cat-hero-icon > div { width: 160px !important; height: 160px !important; }
          }
        `}</style>
      </section>

      {/* Services grid */}
      <section
        aria-labelledby="services-list-heading"
        className="section-padding"
        style={{ background: "var(--bg-primary)" }}
      >
        <div className="section-container">
          <p className="label-tag" style={{ marginBottom: "0.75rem" }}>
            {category.services.length} Services Available
          </p>
          <h2
            id="services-list-heading"
            className="headline-section"
            style={{ marginBottom: "2.5rem" }}
          >
            Click Any Service to{" "}
            <span className="gradient-text">See Full Details</span>
          </h2>

          <ServiceGrid services={category.services} />
        </div>
      </section>

      {/* FAQ section */}
      {faqs.length > 0 && (
        <section
          aria-labelledby="faq-heading"
          className="section-padding"
          style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}
        >
          <div className="section-container" style={{ maxWidth: "820px" }}>
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>FAQ</p>
            <h2 id="faq-heading" className="headline-section" style={{ marginBottom: "2.5rem" }}>
              Common Questions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                  }}
                >
                  <summary
                    style={{
                      padding: "1.25rem 1.5rem",
                      cursor: "pointer",
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                      color: "var(--text-primary)",
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                    }}
                  >
                    {faq.q}
                    <ChevronRight size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                  </summary>
                  <div style={{ padding: "0 1.5rem 1.25rem" }}>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />
    </>
  );
}
