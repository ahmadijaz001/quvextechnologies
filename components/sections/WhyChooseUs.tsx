"use client";
import { Shield, Globe2, Cpu, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import Image from "next/image";

const usps = [
  {
    icon: Globe2,
    title: "One Trusted Authority",
    desc: "ERP, cloud, cybersecurity, AI, infrastructure — orchestrated under a single executive command. No vendor sprawl. No fragmented accountability.",
  },
  {
    icon: Shield,
    title: "UAE Sovereign Compliance",
    desc: "FTA VAT, WPS payroll, MOHRE, PDPL data residency — we operate natively within the UAE&apos;s regulatory architecture.",
  },
  {
    icon: Cpu,
    title: "AI-First Engineering",
    desc: "Generative intelligence, autonomous agents, predictive analytics — embedded into every solution, not retrofitted.",
  },
  {
    icon: Clock,
    title: "24/7 Concierge Operations",
    desc: "Proactive monitoring, incident response, executive reporting — our NOC operates round-the-clock so you operate without surprise.",
  },
];

const certBadges = [
  "Odoo Gold Partner",
  "AWS Advanced Partner",
  "Google Cloud Partner",
  "ISO 27001 Certified",
  "Microsoft Solutions Partner",
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      style={{
        background: "linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)",
        borderTop: "1px solid rgba(212,175,55,0.18)",
        borderBottom: "1px solid rgba(212,175,55,0.18)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 720,
        }}
      >
        {/* ── Left: Cinematic image panel ── */}
        <div
          className={`reveal reveal-left ${isVisible ? "in-view" : ""}`}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 540,
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200&q=85&auto=format&fit=crop"
            alt="Dubai cinematic skyline — aKross enterprise IT consultancy"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="50vw"
          />
          {/* Cinematic overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(2,4,12,0.92) 0%, rgba(5,8,22,0.6) 60%, rgba(212,175,55,0.08) 100%)",
            }}
          />
          {/* Right edge gold rule */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 1,
              height: "100%",
              background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.4), transparent)",
            }}
          />

          {/* Content over image */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              padding: "clamp(3rem,5vw,5rem)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <p className="label-tag" style={{ marginBottom: "1rem" }}>The aKross Difference</p>
            <h2 id="why-heading" className="headline-section" style={{ marginBottom: "1.75rem", maxWidth: "16ch" }}>
              Not just IT.{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>An institution.</span>
            </h2>
            <p
              style={{
                color: "rgba(245,241,230,0.78)",
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                maxWidth: "480px",
                marginBottom: "2.25rem",
                fontWeight: 300,
              }}
            >
              aKross was founded on a singular conviction — that UAE&apos;s leading institutions
              deserve technology counsel of European discipline, American velocity, and Emirati
              sensibility. We deliver all three, simultaneously.
            </p>

            {/* Cert badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.625rem" }}>
              {certBadges.map(cert => (
                <span
                  key={cert}
                  style={{
                    padding: "0.4rem 0.875rem",
                    borderRadius: "100px",
                    border: "1px solid rgba(212,175,55,0.45)",
                    background: "rgba(212,175,55,0.06)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--gold-200)",
                    letterSpacing: "0.06em",
                    backdropFilter: "blur(12px)",
                    fontFamily: "var(--font-syne), sans-serif",
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: USP grid ── */}
        <div
          className={`reveal reveal-right ${isVisible ? "in-view" : ""}`}
          style={{
            padding: "clamp(3rem,5vw,5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.04), transparent 70%)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {usps.map((usp, i) => (
              <div
                key={usp.title}
                className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  padding: "2rem",
                  borderRadius: "12px",
                  background: "rgba(10,17,41,0.5)",
                  border: "1px solid rgba(212,175,55,0.18)",
                  backdropFilter: "blur(16px)",
                  transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = "rgba(212,175,55,0.5)";
                  el.style.boxShadow = "0 20px 50px rgba(212,175,55,0.18)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(212,175,55,0.18)";
                  el.style.boxShadow = "none";
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: 100,
                    height: 100,
                    background: "radial-gradient(circle at top right, rgba(212,175,55,0.12), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.05))",
                    border: "1px solid rgba(212,175,55,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    boxShadow: "0 0 16px rgba(212,175,55,0.16)",
                  }}
                >
                  <usp.icon size={20} strokeWidth={1.5} style={{ color: "var(--gold-300)" }} />
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-cormorant), serif",
                    fontWeight: 500,
                    fontSize: "1.375rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.625rem",
                    lineHeight: 1.25,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {usp.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                    fontWeight: 300,
                  }}
                  dangerouslySetInnerHTML={{ __html: usp.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-labelledby="why-heading"] > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
