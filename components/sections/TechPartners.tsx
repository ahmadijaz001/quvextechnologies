"use client";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

/* ─── Partner data ────────────────────────────────────────────────────────
   `slug` matches simpleicons.org for most brands. Some enterprise vendors
   (AWS, Azure, Google Cloud, ServiceNow, Adobe Commerce) were removed from
   simpleicons due to trademark policies — for those we use direct Wikimedia
   URLs which are stable and freely licensed. */
type Partner = {
  name: string;
  slug?: string;          // simpleicons slug (used unless logoUrl is set)
  logoUrl?: string;       // explicit override for brands missing from simpleicons
  tier: string;
  description: string;
  fallback?: string;      // 1–3 letter mark shown if the image fails to load
};

const partners: Partner[] = [
  { name: "Odoo",                slug: "odoo",       tier: "Gold Partner",        description: "ERP & Business Apps", fallback: "Odoo" },
  { name: "Shopify Plus",        slug: "shopify",    tier: "Partner",             description: "eCommerce Platform", fallback: "S+" },
  {
    name: "Amazon Web Services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
    tier: "Select Tier Partner",
    description: "Cloud Infrastructure",
    fallback: "AWS",
  },
  {
    name: "Microsoft Azure",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg",
    tier: "Partner",
    description: "Cloud & Productivity",
    fallback: "Azure",
  },
  {
    name: "Google Cloud",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
    tier: "Partner",
    description: "Cloud & AI Platform",
    fallback: "GC",
  },
  { name: "Meta Business",       slug: "meta",       tier: "Business Partner",    description: "Digital Advertising", fallback: "Meta" },
  { name: "WordPress",           slug: "wordpress",  tier: "Agency Partner",      description: "CMS & Web Platform", fallback: "WP" },
  { name: "Cisco",               slug: "cisco",      tier: "Premier Partner",     description: "Networking & Security", fallback: "Cisco" },
  { name: "Fortinet",            slug: "fortinet",   tier: "Partner",             description: "Cybersecurity", fallback: "Fortinet" },
  { name: "HubSpot",             slug: "hubspot",    tier: "Solutions Partner",   description: "CRM & Marketing", fallback: "HS" },
  { name: "Zoho",                slug: "zoho",       tier: "Premium Partner",     description: "Business Suite", fallback: "Zoho" },
  { name: "VMware",              slug: "vmware",     tier: "Partner",             description: "Virtualization", fallback: "VM" },
  { name: "Dell Technologies",   slug: "dell",       tier: "Partner",             description: "Hardware & Cloud", fallback: "Dell" },
  {
    name: "HPE",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HPE_logo.svg",
    tier: "Partner",
    description: "Servers & Storage",
    fallback: "HPE",
  },
  {
    name: "ServiceNow",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/ServiceNow_logo.svg",
    tier: "Partner",
    description: "ITSM Platform",
    fallback: "Now",
  },
  {
    name: "Adobe Commerce",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/Magento_Logo.svg",
    tier: "Partner",
    description: "Magento Platform",
    fallback: "Adobe",
  },
  { name: "Google Ads",          slug: "googleads",  tier: "Premier Partner",     description: "Search & Display", fallback: "Ads" },
];

function PartnerCard({ p }: { p: Partner }) {
  const [errored, setErrored] = useState(false);
  const url = p.logoUrl ?? (p.slug ? `https://cdn.simpleicons.org/${p.slug}` : "");
  const showFallback = errored || !url;

  return (
    <article className="partner-card" aria-label={`${p.name} — ${p.tier}`}>
      <div className="partner-logo-wrap">
        {showFallback ? (
          <span className="partner-logo-fallback" aria-hidden="true">
            {p.fallback ?? p.name.slice(0, 3)}
          </span>
        ) : (
          <img
            className="partner-logo"
            src={url}
            alt={`${p.name} logo`}
            loading="lazy"
            width={48}
            height={48}
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <div className="partner-name">{p.name}</div>
      <div className="partner-desc">{p.description}</div>
      <div className="partner-tier">
        <span className="partner-tier-dot" />
        {p.tier}
      </div>
    </article>
  );
}

export default function TechPartners() {
  const { ref, isVisible } = useInView<HTMLElement>();
  const loop = [...partners, ...partners]; // duplicate so the marquee loops seamlessly

  return (
    <section
      ref={ref}
      aria-labelledby="partners-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", overflow: "hidden", position: "relative" }}
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

        {/* Stat pill */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ textAlign: "center", marginBottom: "3rem", transitionDelay: "0.1s" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "0.75rem 1.75rem",
              borderRadius: "100px",
              background: "rgba(10,17,41,0.55)",
              border: "1px solid rgba(212,175,55,0.28)",
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
            }}
          >
            {[
              { value: "18+",  label: "Technology Partners" },
              { value: "Gold", label: "Odoo Partner Tier" },
              { value: "5",    label: "Cloud Certifications" },
            ].map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "center", gap: i > 0 ? "1.5rem" : 0 }}>
                {i > 0 && <div style={{ width: 1, height: 24, background: "rgba(212,175,55,0.25)" }} />}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: "1.125rem", fontStyle: "italic", fontWeight: 600, color: "var(--gold-100)", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: "0.625rem", color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.18em", marginTop: "0.18rem", fontFamily: "var(--font-syne), sans-serif", fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous marquee — pauses on hover */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ transitionDelay: "0.2s" }}
        >
          <div className="partner-marquee marquee-fade-edges">
            <div className="partner-track">
              {loop.map((p, i) => (
                <PartnerCard key={`${p.slug}-${i}`} p={p} />
              ))}
            </div>
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
        .partner-marquee {
          overflow: hidden;
          padding: 1rem 0 1.25rem;
        }
        .partner-track {
          display: flex;
          gap: 1rem;
          width: max-content;
          animation: partnerMarquee 60s linear infinite;
          will-change: transform;
        }
        .partner-track:hover { animation-play-state: paused; }
        @keyframes partnerMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .partner-card {
          flex-shrink: 0;
          width: 220px;
          padding: 1.5rem 1.25rem 1.4rem;
          border-radius: 1rem;
          background:
            linear-gradient(160deg, rgba(243,230,176,0.32) 0%, rgba(212,175,55,0.22) 50%, rgba(168,134,42,0.18) 100%);
          border: 1px solid rgba(243,230,176,0.55);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          text-align: center;
          transition: border-color 0.5s ease, transform 0.5s cubic-bezier(.22,1,.36,1), box-shadow 0.5s ease, background 0.5s ease;
          box-shadow: 0 10px 32px rgba(0,0,0,0.4), 0 0 22px rgba(212,175,55,0.18), inset 0 1px 0 rgba(255,251,234,0.18);
          position: relative;
          overflow: hidden;
        }
        .partner-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 35%, rgba(255,251,234,0.32) 50%, transparent 65%);
          background-size: 250% 100%;
          animation: partnerShimmer 5.5s ease-in-out infinite;
          pointer-events: none;
        }
        .partner-card:nth-child(3n)::before  { animation-delay: 1.4s; }
        .partner-card:nth-child(3n+1)::before{ animation-delay: 2.8s; }
        .partner-card:hover {
          border-color: rgba(255,251,234,0.85);
          transform: translateY(-8px) scale(1.03);
          box-shadow: 0 20px 56px rgba(0,0,0,0.5), 0 0 36px rgba(243,230,176,0.5), inset 0 1px 0 rgba(255,251,234,0.3);
          background:
            linear-gradient(160deg, rgba(243,230,176,0.45) 0%, rgba(212,175,55,0.32) 50%, rgba(168,134,42,0.28) 100%);
        }

        .partner-logo-wrap {
          width: 64px;
          height: 64px;
          margin: 0 auto 0.95rem;
          border-radius: 0.875rem;
          /* Cream/ivory tile so each brand's official colour stays vibrant */
          background: linear-gradient(135deg, #fffdf3 0%, #faf2d8 100%);
          border: 1px solid rgba(168,134,42,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(168,134,42,0.32), inset 0 1px 0 rgba(255,255,255,0.7);
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.5s ease;
          animation: partnerLogoFloat 4.5s ease-in-out infinite;
        }
        .partner-card:nth-child(2n) .partner-logo-wrap { animation-delay: 0.6s; }
        .partner-card:nth-child(3n) .partner-logo-wrap { animation-delay: 1.2s; }
        .partner-card:hover .partner-logo-wrap {
          transform: scale(1.12) rotate(6deg);
          box-shadow: 0 6px 22px rgba(168,134,42,0.5), inset 0 1px 0 rgba(255,255,255,0.85);
        }
        .partner-logo {
          max-width: 44px;
          max-height: 38px;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .partner-card:hover .partner-logo {
          transform: scale(1.08);
        }
        .partner-logo-fallback {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: 0.875rem;
          color: #6b4d0a;
          letter-spacing: 0.02em;
          text-shadow: 0 1px 0 rgba(255,255,255,0.5);
          padding: 0 0.25rem;
          text-align: center;
          line-height: 1;
        }
        .partner-card:hover .partner-logo-fallback {
          color: #4a3505;
        }

        .partner-name {
          font-family: var(--font-syne), sans-serif;
          font-weight: 700;
          font-size: 0.875rem;
          color: #fffbea;
          letter-spacing: -0.005em;
          line-height: 1.25;
          margin-bottom: 0.3rem;
          text-shadow: 0 1px 12px rgba(2,4,12,0.55);
        }
        .partner-desc {
          font-size: 0.6875rem;
          color: rgba(255,251,234,0.78);
          letter-spacing: 0.04em;
          margin-bottom: 0.75rem;
          font-family: var(--font-syne), sans-serif;
          text-shadow: 0 1px 8px rgba(2,4,12,0.5);
        }
        .partner-tier {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.22rem 0.6rem;
          border-radius: 100px;
          background: rgba(2,4,12,0.55);
          border: 1px solid rgba(255,251,234,0.4);
          font-size: 0.5625rem;
          font-weight: 700;
          color: #fffbea;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: var(--font-syne), sans-serif;
          backdrop-filter: blur(6px);
        }
        .partner-tier-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fffbea;
          box-shadow: 0 0 6px #fffbea;
          animation: heroPulse 2.4s ease infinite;
        }

        @keyframes partnerShimmer {
          0%   { background-position: 200% 0; }
          50%  { background-position: -200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes partnerLogoFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .partner-track,
          .partner-card::before,
          .partner-logo-wrap { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
