"use client";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";
import { MapPin, Clock, ArrowUpRight } from "lucide-react";

const openings = [
  { title: "Senior Odoo Developer", dept: "ERP Practice", type: "Full-time", location: "Dubai, UAE", skills: ["Python", "Odoo 17/18", "PostgreSQL", "REST APIs"] },
  { title: "React / Next.js Frontend Engineer", dept: "Web Development", type: "Full-time", location: "Dubai, UAE (Hybrid)", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Cybersecurity Engineer", dept: "IT Infrastructure", type: "Full-time", location: "Dubai, UAE", skills: ["Penetration Testing", "SIEM", "Fortinet", "ISO 27001"] },
  { title: "AI/ML Engineer", dept: "AI & Automation", type: "Full-time", location: "Dubai, UAE (Hybrid)", skills: ["Python", "LangChain", "OpenAI API", "Machine Learning"] },
  { title: "Digital Marketing Specialist (Arabic)", dept: "Digital Marketing", type: "Full-time", location: "Dubai, UAE", skills: ["Google Ads", "Meta Ads", "SEO", "Arabic Content"] },
  { title: "Pre-Sales Consultant — ERP", dept: "Business Development", type: "Full-time", location: "Dubai, UAE", skills: ["ERP Knowledge", "Client Presentations", "Proposal Writing", "Arabic/English"] },
];

const benefits = [
  { icon: "🏥", title: "Premium Healthcare", desc: "Full family medical coverage including dental and vision." },
  { icon: "📚", title: "Learning Budget", desc: "AED 5,000/year for certifications, courses, and conferences." },
  { icon: "🏖️", title: "30 Days Annual Leave", desc: "Plus UAE public holidays and flexible working arrangements." },
  { icon: "🌍", title: "Remote Flexibility", desc: "Hybrid and remote options for eligible roles." },
  { icon: "📈", title: "Performance Bonuses", desc: "Quarterly performance bonuses tied to individual and company results." },
  { icon: "🚀", title: "Career Growth", desc: "Structured career paths with annual reviews and promotion cycles." },
];

export default function CareersPage() {
  return (
    <>
      <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Join Our Team</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Build the Future of UAE <span className="gradient-text">Technology</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
            We&apos;re a team of 50+ technology professionals who believe great work culture and ambitious results aren&apos;t opposites. Join us.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding" style={{ background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container">
          <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Why Quvex?</p>
          <h2 className="headline-section" style={{ marginBottom: "2.5rem" }}>Benefits & <span className="gradient-text">Culture</span></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
            {benefits.map(b => (
              <div key={b.title} className="glass-card" style={{ padding: "1.75rem" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "1rem" }}>{b.icon}</span>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{b.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container">
          <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Open Positions</p>
          <h2 className="headline-section" style={{ marginBottom: "2.5rem" }}>Current <span className="gradient-text">Openings</span></h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {openings.map(job => (
              <Link
                key={job.title}
                href={`/careers/${job.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.5rem 2rem",
                  borderRadius: "0.75rem",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.25)"; (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)" }}>{job.title}</h3>
                    <span style={{ padding: "0.2rem 0.625rem", borderRadius: "100px", background: "rgba(0,212,255,0.1)", color: "var(--accent-primary)", fontSize: "0.6875rem", fontWeight: 600 }}>{job.dept}</span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--text-tertiary)" }}><MapPin size={12} /> {job.location}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--text-tertiary)" }}><Clock size={12} /> {job.type}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {job.skills.map(s => <span key={s} style={{ padding: "0.2rem 0.625rem", borderRadius: "0.3rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{s}</span>)}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", color: "var(--accent-primary)", fontWeight: 500, flexShrink: 0 }}>
                  Apply <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem", padding: "2rem", borderRadius: "1rem", background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", textAlign: "center" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>Don&apos;t see a role that fits? We&apos;re always looking for exceptional talent.</p>
            <Link href="/contact" className="btn-outline">Send Us Your CV</Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { section > div > div[style*="repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { section > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
