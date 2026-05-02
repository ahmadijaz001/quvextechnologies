"use client";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const industries = [
  {
    name: "Real Estate",
    tagline: "Property · Brokerage · Developers",
    href: "/industries/real-estate",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Healthcare",
    tagline: "Hospitals · Clinics · Pharma",
    href: "/industries/healthcare",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Retail & eCommerce",
    tagline: "Boutiques · D2C · Omnichannel",
    href: "/industries/retail",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Hospitality",
    tagline: "Hotels · Restaurants · F&B",
    href: "/industries/hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Government",
    tagline: "Federal · Smart Cities",
    href: "/industries/government",
    image: "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Legal & Professional",
    tagline: "Law Firms · Advisory · Audit",
    href: "/industries/legal",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Education",
    tagline: "Universities · K-12 · EdTech",
    href: "/industries/education",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Oil & Gas",
    tagline: "Upstream · Downstream · Energy",
    href: "/industries/oil-gas",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Logistics",
    tagline: "Freight · Last-Mile · Warehousing",
    href: "/industries/logistics",
    image: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Finance & Banking",
    tagline: "Banks · Wealth · Fintech",
    href: "/industries/finance",
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Construction",
    tagline: "Contractors · Engineering · Projects",
    href: "/industries/construction",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    name: "Manufacturing",
    tagline: "Industrial · Smart Factory · IoT",
    href: "/industries/manufacturing",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=85",
  },
];

export default function IndustriesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" });
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", overflow: "hidden", position: "relative" }}
    >
      {/* Subtle ambient gold mesh */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 20% 30%, rgba(212,175,55,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 35% at 80% 70%, rgba(42,77,153,0.10) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>Industries We Serve</p>
            <h2
              id="industries-heading"
              className="headline-section"
              style={{ marginBottom: "1.25rem" }}
            >
              Solutions Engineered for{" "}
              <span className="gradient-text">Every Sector</span>
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                lineHeight: 1.7,
                maxWidth: 560,
                fontWeight: 300,
              }}
            >
              Twelve industries. One philosophy: deep specialisation, sovereign-grade execution,
              and outcomes measured against the standards of the institutions we serve.
            </p>
          </div>

          <div style={{ display: "flex", gap: "0.875rem" }}>
            <button
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(10,17,41,0.55)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "var(--gold-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(212,175,55,0.15)";
                e.currentTarget.style.borderColor = "var(--gold-400)";
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,55,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10,17,41,0.55)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <ChevronLeft size={22} strokeWidth={1.6} />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "rgba(10,17,41,0.55)",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "var(--gold-200)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                transition: "all 0.35s cubic-bezier(.22,1,.36,1)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(212,175,55,0.15)";
                e.currentTarget.style.borderColor = "var(--gold-400)";
                e.currentTarget.style.transform = "scale(1.08)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(212,175,55,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10,17,41,0.55)";
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <ChevronRight size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="industries-scroll"
        style={{
          display: "flex",
          gap: "1.75rem",
          overflowX: "auto",
          paddingLeft: "clamp(1.5rem, 5vw, calc((100vw - 1400px) / 2 + 4rem))",
          paddingRight: "clamp(1.5rem, 5vw, 4rem)",
          paddingBottom: "2rem",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          position: "relative",
          zIndex: 1,
        }}
        tabIndex={0}
        role="region"
        aria-label="Industries carousel"
      >
        {industries.map((industry, idx) => (
          <Link
            key={industry.name}
            href={industry.href}
            className="industry-card"
            style={{
              flexShrink: 0,
              width: 380,
              height: 480,
              borderRadius: "1.25rem",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 20px 60px rgba(2,4,12,0.5), 0 0 0 1px rgba(212,175,55,0.08)",
              transition: "transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.6s cubic-bezier(.22,1,.36,1), border-color 0.4s ease",
              scrollSnapAlign: "start",
              cursor: "pointer",
              display: "block",
              animationDelay: `${idx * 80}ms`,
            }}
          >
            {/* Photo */}
            <div
              className="industry-image"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("${industry.image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 1.2s cubic-bezier(.22,1,.36,1), filter 0.6s ease",
                filter: "saturate(1.05) brightness(0.85)",
              }}
            />

            {/* Bottom dark gradient for text legibility */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(2,4,12,0.05) 0%, rgba(2,4,12,0.15) 40%, rgba(2,4,12,0.85) 78%, rgba(2,4,12,0.96) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Top gold rule */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                padding: "2rem 1.875rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--gold-300)",
                  fontFamily: "var(--font-syne), sans-serif",
                }}
              >
                {industry.tagline}
              </span>

              <h3
                style={{
                  fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
                  fontWeight: 500,
                  fontSize: "2rem",
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                {industry.name}
              </h3>

              <div
                className="industry-cta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold-200)",
                  fontFamily: "var(--font-syne), sans-serif",
                  marginTop: "0.5rem",
                  paddingTop: "0.875rem",
                  borderTop: "1px solid rgba(212,175,55,0.25)",
                  width: "fit-content",
                  transition: "color 0.3s ease, gap 0.3s ease",
                }}
              >
                Explore Practice
                <ArrowUpRight size={14} strokeWidth={1.8} />
              </div>
            </div>

            {/* Top right corner badge */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(5,8,22,0.55)",
                border: "1px solid rgba(212,175,55,0.4)",
                backdropFilter: "blur(12px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--gold-300)",
                transition: "all 0.4s ease",
              }}
            >
              <ArrowUpRight size={16} strokeWidth={1.8} />
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        div[aria-label="Industries carousel"]::-webkit-scrollbar { display: none; }

        .industry-card:hover {
          transform: translateY(-12px) !important;
          border-color: rgba(212,175,55,0.55) !important;
          box-shadow: 0 32px 80px rgba(2,4,12,0.65), 0 0 40px rgba(212,175,55,0.25), 0 0 0 1px rgba(212,175,55,0.4) !important;
        }
        .industry-card:hover .industry-image {
          transform: scale(1.08);
          filter: saturate(1.15) brightness(0.95);
        }
        .industry-card:hover .industry-cta {
          color: var(--gold-100);
          gap: 0.875rem;
        }

        @media (max-width: 768px) {
          .industries-scroll > a { width: 320px !important; height: 420px !important; }
        }
      `}</style>
    </section>
  );
}
