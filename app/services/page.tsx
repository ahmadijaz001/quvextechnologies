"use client";
import Link from "next/link";
import { serviceCategories } from "@/lib/services-data";
import CTABanner from "@/components/sections/CTABanner";
import { ArrowUpRight } from "lucide-react";

export default function ServicesHub() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: "clamp(6rem, 12vw, 9rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Everything You Need</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Comprehensive Technology{" "}
            <span className="gradient-text">Solutions</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "600px", margin: "0 auto" }}>
            50+ individual services across 6 technology pillars. Click any service to see full details — features, process, technologies, and pricing guidance.
          </p>
        </div>
      </section>

      {/* All categories */}
      {serviceCategories.map(category => (
        <section
          key={category.slug}
          id={category.slug}
          className="section-padding"
          style={{ background: category.services.indexOf(category.services[0]) % 2 === 0 ? "var(--bg-primary)" : "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}
        >
          <div className="section-container">
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    color: "var(--text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {category.name}
                </h2>
                <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", maxWidth: "520px" }}>
                  {category.description}
                </p>
              </div>
              <Link
                href={`/services/${category.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${category.color}30`,
                  color: category.color,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `${category.color}10`)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View All {category.shortName} Services <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Service cards — compact list view */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.875rem" }}>
              {category.services.map(service => (
                <Link
                  key={service.slug}
                  href={`/services/${category.slug}/${service.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${category.color}30`; (e.currentTarget as HTMLElement).style.background = `${category.color}05`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.background = "var(--card-bg)"; }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>{service.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{service.tagline}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
    </>
  );
}
