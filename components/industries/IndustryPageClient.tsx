"use client";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import type { Service, ServiceCategory } from "@/lib/services-data";

interface IndustryData {
  name: string;
  icon: string;
  desc: string;
  challenges: string[];
  solutions: string[];
  color: string;
}

interface Props {
  slug: string;
  ind: IndustryData;
  relatedServices: (Service & { categorySlug: string })[];
}

export default function IndustryPageClient({ slug, ind, relatedServices }: Props) {
  return (
    <>
      <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "2rem" }}>
            {[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: ind.name, current: true }].map((c, i, arr) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                {c.current ? <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{c.label}</span> : <Link href={c.href!} style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", textDecoration: "none" }}>{c.label}</Link>}
                {i < arr.length - 1 && <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />}
              </span>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <span style={{ fontSize: "3rem" }}>{ind.icon}</span>
            <span style={{ padding: "0.25rem 0.875rem", borderRadius: "100px", background: `${ind.color}15`, color: ind.color, fontSize: "0.75rem", fontWeight: 600 }}>Industry Solutions</span>
          </div>

          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>{ind.name}</h1>
          <p style={{ fontSize: "1.0625rem", color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: "640px", marginBottom: "2rem" }}>{ind.desc}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/book-consultation" className="btn-primary">Get Industry-Specific Consultation</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
            <div>
              <p className="label-tag" style={{ marginBottom: "1rem" }}>Industry Challenges</p>
              <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>What Keeps You Up at Night</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {ind.challenges.map(c => (
                  <li key={c} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "rgba(255,77,106,0.05)", border: "1px solid rgba(255,77,106,0.15)" }}>
                    <span style={{ color: "#ff4d6a", fontSize: "1rem", flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-tag" style={{ marginBottom: "1rem" }}>Our Solutions</p>
              <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>How We Solve Them</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                {ind.solutions.map(s => (
                  <li key={s} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "1rem 1.25rem", borderRadius: "0.75rem", background: `${ind.color}08`, border: `1px solid ${ind.color}20` }}>
                    <span style={{ color: ind.color, fontSize: "1rem", flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="section-padding" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Relevant Services</p>
            <h2 className="headline-section" style={{ marginBottom: "2.5rem" }}>Services Built for {ind.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
              {relatedServices.map(svc => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.categorySlug}/${svc.slug}`}
                  style={{ display: "flex", flexDirection: "column", padding: "1.5rem", borderRadius: "0.75rem", background: "var(--card-bg)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s, transform 0.2s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${svc.color}30`; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
                >
                  <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{svc.name}</h3>
                  <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, flex: 1 }}>{svc.tagline}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "1rem", fontSize: "0.8125rem", color: svc.color, fontWeight: 500 }}>
                    Learn More <ArrowUpRight size={13} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner />

      <style>{`
        @media (max-width: 900px) {
          section > div > div[style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          section > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
