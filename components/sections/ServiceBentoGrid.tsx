"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Database, Globe, Bot, Server, Cable, Cpu, ArrowUpRight, type LucideIcon } from "lucide-react";
import { useInView } from "@/hooks/useInView";

type Pillar = {
  icon: LucideIcon;
  name: string;
  tagline: string;
  href: string;
  gridArea: string;
};

const pillars: Pillar[] = [
  {
    icon: Database,
    name: "Enterprise ERP",
    tagline: "Sovereign-grade ERP transformation. Odoo, SAP, Microsoft Dynamics — implemented with precision, governed with mastery.",
    href: "/services/erp",
    gridArea: "1 / 1 / 2 / 3",
  },
  {
    icon: Globe,
    name: "Web & eCommerce",
    tagline: "Couture digital experiences. Headless commerce, conversion-engineered platforms.",
    href: "/services/web-ecommerce",
    gridArea: "1 / 3 / 2 / 5",
  },
  {
    icon: Cable,
    name: "Fiber Cabling",
    tagline: "Single-mode and multi-mode fiber, structured cabling, certified by aKross-licensed engineers across the UAE.",
    href: "/services/fiber-cabling",
    gridArea: "1 / 5 / 2 / 7",
  },
  {
    icon: Bot,
    name: "AI & Automation",
    tagline: "Generative AI, autonomous agents, RPA, BI — intelligence woven into every workflow.",
    href: "/services/ai-automation",
    gridArea: "2 / 1 / 3 / 3",
  },
  {
    icon: Server,
    name: "Cloud & IT Infrastructure",
    tagline: "Sovereign cloud, zero-trust networks, 24/7 managed services — operational continuity, guaranteed.",
    href: "/services/it-infrastructure",
    gridArea: "2 / 3 / 3 / 5",
  },
  {
    icon: Cpu,
    name: "IT Peripherals & Hardware",
    tagline: "CCTV, business laptops, network switches, hardware configuration — turnkey IT setup for offices and retail.",
    href: "/services/it-peripherals",
    gridArea: "2 / 5 / 3 / 7",
  },
];

function ServiceCard({ pillar, index }: { pillar: Pillar; index: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const px = (x / r.width) * 100;
      const py = (y / r.height) * 100;
      const nx = (x / r.width - 0.5) * 2;
      const ny = (y / r.height - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${px}%`);
        el.style.setProperty("--my", `${py}%`);
        el.style.setProperty("--rx", `${(-ny * 4).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(nx * 4).toFixed(2)}deg`);
        el.style.setProperty("--lift", "1");
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--lift", "0");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const Icon = pillar.icon;

  return (
    <Link
      ref={ref}
      href={pillar.href}
      className="service-card service-card-lux"
      style={{
        gridArea: pillar.gridArea,
        ["--card-delay" as string]: `${index * 90}ms`,
      } as React.CSSProperties}
    >
      <span aria-hidden="true" className="svc-spotlight" />
      <span aria-hidden="true" className="svc-ring" />

      <div className="svc-body">
        <div className="svc-icon">
          <Icon size={22} strokeWidth={1.5} />
          <span aria-hidden="true" className="svc-icon-glow" />
        </div>

        <h3 className="svc-title">{pillar.name}</h3>

        <p className="svc-tagline">{pillar.tagline}</p>

        <div className="svc-cta">
          <span>Discover</span>
          <span className="svc-cta-arrow">
            <ArrowUpRight size={12} />
          </span>
        </div>
      </div>

      <div aria-hidden="true" className="svc-corner" />
    </Link>
  );
}

export default function ServiceBentoGrid() {
  const { ref, isVisible } = useInView<HTMLElement>();
  const { ref: gridRef, isVisible: gridInView } = useInView<HTMLDivElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse, rgba(212,175,55,0.06), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>The aKross Practice</p>
            <h2 id="services-heading" className="headline-section" style={{ maxWidth: "20ch" }}>
              Six pillars of{" "}
              <span className="gold-text" style={{ fontStyle: "italic" }}>enterprise mastery.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="link-gold"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              border: "none",
              paddingBottom: 0,
            }}
          >
            View Full Practice <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className={`bento-grid svc-bento ${gridInView ? "in-view" : ""}`}
        >
          {pillars.map((pillar, i) => (
            <ServiceCard key={pillar.name} pillar={pillar} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        /* ── Card chrome ─────────────────────────────────── */
        .service-card-lux {
          --mx: 50%;
          --my: 50%;
          --rx: 0deg;
          --ry: 0deg;
          --lift: 0;
          padding: 2.25rem;
          min-height: 240px;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transform-style: preserve-3d;
          transform:
            perspective(900px)
            rotateX(var(--rx))
            rotateY(var(--ry))
            translateY(calc(var(--lift) * -6px))
            translateZ(0);
          transition:
            transform 0.55s cubic-bezier(.22,1,.36,1),
            border-color 0.4s ease,
            box-shadow 0.5s ease;
          opacity: 0;
          will-change: transform;
        }
        .svc-bento.in-view .service-card-lux {
          animation: svcReveal 0.95s cubic-bezier(.22,1,.36,1) forwards;
          animation-delay: var(--card-delay, 0ms);
        }
        @keyframes svcReveal {
          0%   { opacity: 0; transform: perspective(900px) translateY(36px) rotateX(0) rotateY(0); }
          100% { opacity: 1; transform: perspective(900px) translateY(0) rotateX(var(--rx)) rotateY(var(--ry)); }
        }

        /* ── Cursor-following gold spotlight ─────────────── */
        .svc-spotlight {
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(
            420px circle at var(--mx) var(--my),
            rgba(243,230,176,0.22),
            rgba(212,175,55,0.10) 28%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 0;
        }
        .service-card-lux:hover .svc-spotlight { opacity: 1; }

        /* ── Animated gold ring on hover ─────────────────── */
        .svc-ring {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: conic-gradient(
            from var(--ring-start, 0deg),
            transparent 0deg,
            rgba(243,230,176,0.55) 80deg,
            rgba(212,175,55,0.0) 180deg,
            rgba(212,175,55,0.55) 280deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
          z-index: 0;
          animation: svcRing 7s linear infinite;
        }
        .service-card-lux:hover .svc-ring { opacity: 0.8; }
        @keyframes svcRing {
          to { --ring-start: 360deg; }
        }
        @property --ring-start {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }

        /* ── Card hover elevation (in addition to tilt lift) ── */
        .service-card-lux:hover {
          border-color: rgba(212,175,55,0.55) !important;
          box-shadow:
            0 30px 70px -30px rgba(0,0,0,0.65),
            0 0 0 1px rgba(212,175,55,0.18),
            0 0 36px rgba(212,175,55,0.12) !important;
        }

        /* ── Content layer above effects ─────────────────── */
        .svc-body {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* ── Icon ────────────────────────────────────────── */
        .svc-icon {
          position: relative;
          width: 52px;
          height: 52px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(212,175,55,0.16), rgba(212,175,55,0.04));
          border: 1px solid rgba(212,175,55,0.32);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--gold-300);
          transition:
            background 0.5s cubic-bezier(.22,1,.36,1),
            border-color 0.4s ease,
            transform 0.6s cubic-bezier(.22,1,.36,1),
            box-shadow 0.5s ease;
          transform: translateZ(28px);
        }
        .service-card-lux:hover .svc-icon {
          background: linear-gradient(135deg, rgba(212,175,55,0.32), rgba(212,175,55,0.10));
          border-color: rgba(212,175,55,0.6);
          transform: translateZ(28px) rotate(-6deg) scale(1.06);
          box-shadow: 0 10px 30px -10px rgba(212,175,55,0.5);
        }
        .svc-icon-glow {
          position: absolute;
          inset: -8px;
          border-radius: 14px;
          background: radial-gradient(circle, rgba(212,175,55,0.45), transparent 65%);
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.45s ease;
          pointer-events: none;
        }
        .service-card-lux:hover .svc-icon-glow { opacity: 1; }

        /* ── Title + tagline ─────────────────────────────── */
        .svc-title {
          font-family: var(--font-cormorant), serif;
          font-weight: 500;
          font-size: 1.5rem;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.01em;
          transform: translateZ(18px);
        }
        .svc-tagline {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.7;
          flex: 1;
          font-weight: 300;
          transform: translateZ(8px);
        }

        /* ── CTA "Discover" with arrow slide ─────────────── */
        .svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.5rem;
          font-size: 0.6875rem;
          color: var(--gold-300);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-family: var(--font-syne), sans-serif;
          transform: translateZ(20px);
        }
        .svc-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(212,175,55,0.10);
          border: 1px solid rgba(212,175,55,0.28);
          transition:
            transform 0.5s cubic-bezier(.22,1,.36,1),
            background 0.4s ease,
            border-color 0.4s ease;
        }
        .service-card-lux:hover .svc-cta-arrow {
          transform: translate(4px, -4px);
          background: rgba(212,175,55,0.22);
          border-color: rgba(212,175,55,0.55);
        }

        /* ── Top-right corner accent ─────────────────────── */
        .svc-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 96px;
          height: 96px;
          background: radial-gradient(circle at top right, rgba(212,175,55,0.20), transparent 70%);
          pointer-events: none;
          opacity: 0.85;
          transition: opacity 0.4s ease, transform 0.6s ease;
        }
        .service-card-lux:hover .svc-corner {
          opacity: 1;
          transform: scale(1.15);
        }

        /* ── Reduced motion ──────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .service-card-lux {
            transform: none !important;
            animation: none !important;
            opacity: 1 !important;
          }
          .service-card-lux:hover .svc-icon {
            transform: none !important;
          }
          .svc-ring { display: none; }
        }

        /* ── Mobile: drop tilt + ring (no pointer) ───────── */
        @media (hover: none), (max-width: 768px) {
          .service-card-lux {
            transform: none !important;
          }
          .svc-bento.in-view .service-card-lux {
            animation: svcRevealMobile 0.7s cubic-bezier(.22,1,.36,1) forwards;
            animation-delay: var(--card-delay, 0ms);
          }
          @keyframes svcRevealMobile {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .svc-ring { display: none; }
        }

        @media (max-width: 768px) {
          .bento-grid > a { grid-area: auto !important; }
        }
      `}</style>
    </section>
  );
}
