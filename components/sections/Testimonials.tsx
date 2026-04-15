"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Quvex transformed our entire operations in under 6 months. The Odoo implementation was flawless — from data migration to user training. We went from spreadsheets to a fully integrated ERP overnight. Our finance team now closes monthly accounts in 3 days instead of 3 weeks.",
    name: "Mohammed Al Rashidi",
    title: "CFO",
    company: "Al Rashidi Group",
    industry: "Real Estate",
    stars: 5,
  },
  {
    quote: "Our Shopify Plus store now does what we always wanted — seamless Arabic/English, real-time Odoo inventory sync, Tabby BNPL, and Aramex shipping automation. Revenue is up 35% and we haven't had a single inventory sync error since launch. The team's technical depth is unmatched.",
    name: "Layla Hussain",
    title: "CEO",
    company: "Desert Bloom Fashion",
    industry: "Retail & eCommerce",
    stars: 5,
  },
  {
    quote: "We interviewed 7 IT companies in Dubai before choosing Quvex. The difference was immediate — they actually understood our business before proposing solutions. Our cybersecurity posture has improved dramatically and the 24/7 NOC team gives us genuine peace of mind.",
    name: "Ahmed Khalil",
    title: "IT Director",
    company: "Emirates Healthcare Group",
    industry: "Healthcare",
    stars: 5,
  },
  {
    quote: "The AI chatbot Quvex built handles 70% of our customer inquiries automatically. Integration with our CRM was seamless and the analytics dashboard gives us insights we never had before. ROI was achieved in under 4 months.",
    name: "Sara Al Mansoori",
    title: "Head of Digital",
    company: "Noor Finance",
    industry: "Finance",
    stars: 5,
  },
  {
    quote: "From brand identity to website to Google Ads to social media — Quvex manages all our digital presence. Our online leads have increased 4x and cost per lead dropped by 60% since we partnered with them. They feel like an extension of our in-house team.",
    name: "Tariq Mohammed",
    title: "Managing Director",
    company: "Pearl Properties",
    industry: "Real Estate",
    stars: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[current];

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="section-padding"
      style={{ background: "var(--bg-tertiary)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="section-container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Client Testimonials</p>
          <h2 id="testimonials-heading" className="headline-section">
            Trusted by{" "}
            <span className="gradient-text">150+ Businesses</span>
          </h2>
        </div>

        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          {/* Stars */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
            {[...Array(t.stars)].map((_, i) => (
              <Star key={i} size={18} fill="#c9a44c" stroke="none" />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1875rem)",
              color: "var(--text-primary)",
              lineHeight: 1.75,
              marginBottom: "2.5rem",
              fontStyle: "italic",
              transition: "opacity 0.3s",
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          {/* Author */}
          <div style={{ marginBottom: "2.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 600,
                fontSize: "1rem",
                color: "var(--text-primary)",
              }}
            >
              {t.name}
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              {t.title}, {t.company}
            </div>
            <span
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                padding: "0.2rem 0.75rem",
                borderRadius: "100px",
                background: "rgba(0,212,255,0.1)",
                fontSize: "0.75rem",
                color: "var(--accent-primary)",
                fontWeight: 500,
              }}
            >
              {t.industry}
            </span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            >
              <ChevronLeft size={16} />
            </button>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? "var(--accent-primary)" : "rgba(0,0,0,0.08)",
                    border: "none",
                    transition: "width 0.3s, background 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--bg-tertiary)", border: "1px solid var(--border)", color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s" }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
