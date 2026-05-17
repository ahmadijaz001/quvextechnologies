"use client";
import Link from "next/link";
import CTABanner from "@/components/sections/CTABanner";
import PageStarBackdrop from "@/components/sections/PageStarBackdrop";
import { CheckCircle2 } from "lucide-react";

const timeline = [
  { year: "2018", title: "Founded in Dubai", desc: "aKross Information Technology established with a focus on Odoo ERP implementation for UAE SMEs." },
  { year: "2019", title: "Gold Odoo Partner", desc: "Achieved Gold Partner status with Odoo, the fastest path in our region's history." },
  { year: "2020", title: "Expanded to Full IT Services", desc: "Launched cybersecurity, cloud, and managed IT services divisions to meet client demand." },
  { year: "2021", title: "100 Clients Milestone", desc: "Crossed 100 active clients across UAE, Saudi Arabia, Qatar, and Kuwait." },
  { year: "2022", title: "Digital Marketing Division", desc: "Launched full-service digital marketing to offer complete digital transformation under one roof." },
  { year: "2023", title: "AI & Automation Practice", desc: "Launched dedicated AI/ML practice as the first UAE-based Odoo partner to integrate LLMs into ERP workflows." },
  { year: "2024", title: "AWS & Azure Partner", desc: "Achieved partner status with Amazon Web Services and Microsoft Azure." },
  { year: "2025", title: "Integrated IT & Digital Practice", desc: "Expanded service portfolio across ERP, cloud, AI, cybersecurity, and marketing — one accountable partner instead of five vendors." },
];

const team = [
  { name: "Ahmed Al Mansouri", title: "CEO & Co-Founder", specialty: "ERP Strategy & Business Development", linkedIn: "#" },
  { name: "Sarah Mitchell", title: "CTO & Co-Founder", specialty: "Cloud Architecture & AI Systems", linkedIn: "#" },
  { name: "Mohammed Al Rashdi", title: "Head of ERP Practice", specialty: "Odoo Implementation & Customization", linkedIn: "#" },
  { name: "Priya Sharma", title: "Head of Digital Marketing", specialty: "Performance Marketing & SEO", linkedIn: "#" },
  { name: "Omar Abdullah", title: "Head of Cybersecurity", specialty: "Network Security & Compliance", linkedIn: "#" },
  { name: "Jennifer Wu", title: "Lead UI/UX Designer", specialty: "Product Design & Design Systems", linkedIn: "#" },
];

const values = [
  { title: "Transparency First", desc: "We tell you what you need, not what you want to hear. Honest assessments, realistic timelines, no hidden costs." },
  { title: "Ownership Mentality", desc: "Your problem is our problem. We don't disappear after go-live — we stay accountable for outcomes, not just outputs." },
  { title: "Continuous Innovation", desc: "We invest 20% of our capacity into R&D so every client benefits from the latest technology without paying for experiments." },
  { title: "UAE-First Mindset", desc: "We're not a global template applied locally. Every solution is built with UAE regulations, culture, and business context in mind." },
];

const methodology = [
  { step: "Discover", desc: "Deep-dive workshops to understand your business, challenges, and objectives before proposing any solution." },
  { step: "Design", desc: "Architecture and solution design reviewed and signed off by both teams before a single line of code is written." },
  { step: "Develop", desc: "Agile delivery in 2-week sprints with weekly demos so you always see progress and can course-correct early." },
  { step: "Deploy", desc: "Structured go-live with parallel run, data validation, and zero-downtime deployment to production." },
  { step: "Support", desc: "Proactive 24/7 monitoring and tiered support SLAs — we catch issues before they become your problems." },
];

export default function AboutPage() {
  return (
    <>
      <PageStarBackdrop />
      <div className="cosmic-page">
        {/* Hero */}
        <section className="page-hero" style={{ paddingTop: "clamp(5.5rem,10vw,7.5rem)", paddingBottom: "clamp(2.5rem,4vw,3.5rem)", borderBottom: "1px solid var(--border)" }}>
          <div className="section-container" style={{ textAlign: "center" }}>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>Our Story</p>
            <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
              The Story Behind{" "}
              <span className="gradient-text">aKross Information Technology</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "660px", margin: "0 auto" }}>
              We built aKross because we experienced firsthand the gap between what businesses need and what most IT vendors deliver. Since 2018, we&apos;ve been closing that gap — one successful engagement at a time.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "4rem 0", borderBottom: "1px solid var(--border)" }}>
          <div className="section-container">
            <div className="about-stats" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1.5rem", textAlign: "center" }}>
              {[
                { value: "2018", label: "Founded" },
                { value: "150+", label: "Clients" },
                { value: "500+", label: "Projects" },
                { value: "12+", label: "Industries" },
                { value: "50+", label: "Team Members" },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="stat-number" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.25rem" }}>{stat.value}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission + Vision */}
        <section className="section-padding">
          <div className="section-container">
            <div className="about-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {[
                { title: "Mission", color: "#00d4ff", content: "To be the most trusted technology partner for businesses in the UAE and GCC — delivering solutions that work, relationships that last, and results that speak for themselves." },
                { title: "Vision", color: "#c9a44c", content: "A UAE where every business — from startup to enterprise — has access to world-class technology implementation, not just world-class sales pitches." },
                { title: "Values", color: "#7b2fff", content: "Transparency. Ownership. Innovation. UAE-first thinking. We don't just talk about these — they're baked into how we price, deliver, and support every project." },
              ].map(card => (
                <div key={card.title} className="glass-card" style={{ padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.5rem", color: card.color, marginBottom: "1rem" }}>{card.title}</div>
                  <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>{card.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Our Journey</p>
            <h2 className="headline-section" style={{ marginBottom: "3rem" }}>Built Year by <span className="gradient-text">Year</span></h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px" }}>
              {timeline.map((item, i) => (
                <div key={item.year} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.875rem", fontWeight: 700, color: "var(--accent-primary)", minWidth: "3.5rem", textAlign: "center" }}>{item.year}</div>
                    {i < timeline.length - 1 && <div style={{ width: 1, height: "2rem", background: "rgba(212,175,55,0.25)" }} />}
                  </div>
                  <div style={{ paddingBottom: "0.5rem" }}>
                    <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.375rem" }}>{item.title}</div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Methodology */}
        <section className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>How We Work</p>
            <h2 className="headline-section" style={{ marginBottom: "3rem" }}>Our Delivery <span className="gradient-text">Methodology</span></h2>

            <div className="about-5col" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem" }}>
              {methodology.map((m, i) => (
                <div
                  key={m.step}
                  className="glass-card"
                  style={{ padding: "1.75rem 1.5rem", position: "relative" }}
                >
                  <div style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.75rem", color: "var(--accent-primary)", marginBottom: "0.75rem", fontWeight: 700 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.625rem" }}>{m.step}</h3>
                  <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Our Values</p>
            <h2 className="headline-section" style={{ marginBottom: "3rem" }}>What We Stand <span className="gradient-text">For</span></h2>

            <div className="about-2col" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.5rem" }}>
              {values.map(v => (
                <div key={v.title} style={{ display: "flex", gap: "1rem", padding: "1.75rem", borderRadius: "1rem", background: "var(--card-bg)", border: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
                  <CheckCircle2 size={20} style={{ color: "var(--accent-primary)", flexShrink: 0, marginTop: "0.1rem" }} />
                  <div>
                    <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{v.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65 }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="section-padding" style={{ borderTop: "1px solid var(--border)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Leadership Team</p>
            <h2 className="headline-section" style={{ marginBottom: "3rem" }}>The People <span className="gradient-text">Behind the Results</span></h2>

            <div className="about-team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {team.map(member => (
                <div
                  key={member.name}
                  className="glass-card"
                  style={{ padding: "2rem", textAlign: "center", transition: "transform 0.3s" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {/* Avatar placeholder */}
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(123,47,255,0.12))", border: "2px solid rgba(212,175,55,0.25)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem", fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--accent-primary)" }}>
                    {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>{member.name}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>{member.title}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", marginBottom: "1.25rem" }}>{member.specialty}</div>
                  <Link href={member.linkedIn} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-secondary)", textDecoration: "none", padding: "0.375rem 0.875rem", borderRadius: "100px", border: "1px solid var(--border)", transition: "border-color 0.2s" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    LinkedIn
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .about-stats { grid-template-columns: repeat(3, 1fr) !important; }
          .about-3col, .about-team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-5col { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .about-stats, .about-3col, .about-5col, .about-2col, .about-team-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .page-hero { padding-top: clamp(5rem, 18vw, 7rem) !important; padding-bottom: 2rem !important; }
          section.section-padding { padding-top: clamp(2.5rem, 8vw, 4rem) !important; padding-bottom: clamp(2.5rem, 8vw, 4rem) !important; }
        }
      `}</style>
    </>
  );
}
