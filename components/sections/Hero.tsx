"use client";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowUpRight, Calendar, ChevronLeft, ChevronRight,
  Database, Bot, ShieldCheck, Cloud, Star, Sparkles,
  CheckCircle2, Globe, Cpu, Server, Boxes, Smartphone, Network,
} from "lucide-react";

const Hero3DSlider = dynamic(() => import("./Hero3DSlider"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        background:
          "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(212,175,55,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }}
    />
  ),
});

/* ══════════════════════════════════════════
   COUNT-UP HOOK
══════════════════════════════════════════ */
function useCountUp(target: number, duration = 2200, delay = 0, decimals = 0) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    let startTime: number | null = null;
    const timer = setTimeout(() => {
      const run = (ts: number) => {
        if (!startTime) startTime = ts;
        const p = Math.min((ts - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = eased * target;
        setCount(decimals > 0 ? parseFloat(cur.toFixed(decimals)) : Math.floor(cur));
        if (p < 1) rafRef.current = requestAnimationFrame(run);
        else setCount(target);
      };
      rafRef.current = requestAnimationFrame(run);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(rafRef.current); };
  }, [target, duration, delay, decimals]);
  return count;
}

function StatItem({ num, suffix, label, delay, special }: {
  num: number; suffix: string; label: string; delay: number; special?: string;
}) {
  const decimals = suffix === "%" && num % 1 !== 0 ? 1 : 0;
  const count = useCountUp(special ? 0 : num, 2200, delay, decimals);
  return (
    <div style={{ animation: `heroSlideUp 1s cubic-bezier(.22,1,.36,1) ${(delay / 1000).toFixed(2)}s both` }}>
      <div
        style={{
          fontFamily: "var(--font-playfair), var(--font-cormorant), serif",
          fontSize: "clamp(1.875rem, 2.6vw, 2.375rem)",
          fontWeight: 500,
          background: "linear-gradient(180deg, #f3e6b0 0%, #d4af37 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {special ?? `${decimals > 0 ? count.toFixed(1) : count}${suffix}`}
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          color: "rgba(245,241,230,0.7)",
          marginTop: "0.375rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          fontFamily: "var(--font-syne), sans-serif",
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LIVE ACTIVITY TICKER
══════════════════════════════════════════ */
const activities = [
  { action: "ERP transformation deployed",   client: "Emaar Properties",  Icon: Database },
  { action: "Sovereign cloud migration live", client: "ADNOC Group",       Icon: Cloud },
  { action: "Zero-trust security activated",  client: "Emirates NBD",      Icon: ShieldCheck },
  { action: "AI orchestration online",        client: "DP World",          Icon: Bot },
  { action: "Executive onboarding scheduled", client: "Aldar Properties",  Icon: Globe },
  { action: "Intelligent automation live",    client: "Majid Al Futtaim",  Icon: Cpu },
  { action: "Strategic advisory delivered",   client: "Mubadala",          Icon: CheckCircle2 },
];

function LiveActivityTicker() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % activities.length);
        setVisible(true);
      }, 500);
    }, 4200);
    return () => clearInterval(cycle);
  }, []);

  const a = activities[idx];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.875rem",
        padding: "0.75rem 1.125rem",
        borderRadius: "100px",
        background: "rgba(5,8,22,0.6)",
        border: "1px solid rgba(212,175,55,0.25)",
        backdropFilter: "blur(20px) saturate(160%)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        minWidth: 280,
        maxWidth: 360,
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: "var(--gold-400)",
          flexShrink: 0,
          boxShadow: "0 0 10px var(--gold-400)",
          animation: "heroPulse 2.4s ease infinite",
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            fontFamily: "var(--font-syne), sans-serif",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            letterSpacing: "-0.005em",
          }}
        >
          {a.action}
        </div>
        <div
          style={{
            fontSize: "0.625rem",
            color: "var(--gold-300)",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: "0.18rem",
            fontFamily: "var(--font-syne), sans-serif",
          }}
        >
          {a.client}
        </div>
      </div>
      <a.Icon size={14} color="var(--gold-300)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   GOLD PARTICLES — ambient cinematic
══════════════════════════════════════════ */
function GoldParticles({ count = 24 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: Math.random() * 2.4 + 1,
        duration: Math.random() * 14 + 12,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.5 + 0.25,
      })),
    [count]
  );

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "var(--gold-300)",
            boxShadow: "0 0 8px var(--gold-400), 0 0 14px rgba(212,175,55,0.4)",
            opacity: p.opacity,
            animation: `particleRiseLuxe ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════ */
const slides = [
  { label: "IT Infrastructure",  caption: "Software, hardware and networking — engineered, deployed and managed end-to-end" },
  { label: "ERP Implementation", caption: "Odoo and Oracle implementations tailored for UAE business" },
  { label: "Digital Services",   caption: "Website, mobile app and network design built to scale" },
];

const stats = [
  { num: 200,  suffix: "+",  label: "Enterprise Clients" },
  { num: 650,  suffix: "+",  label: "Engagements" },
  { num: 14,   suffix: "+",  label: "Industry Verticals" },
  { num: 99.9, suffix: "%",  label: "Uptime SLA" },
];

const featureCards = [
  { icon: Server,     title: "IT Infrastructure", metric: "Software · Hardware",    pos: { top: "8%",   left: "50%", transform: "translateX(-50%)" }, floatAnim: "heroFloat1", enterDelay: "0.9s" },
  { icon: Boxes,      title: "ERP Implementation",metric: "Odoo · Oracle · Custom", pos: { top: "50%",  right: "0%", transform: "translateY(-50%)" }, floatAnim: "heroFloat2", enterDelay: "1.1s" },
  { icon: Smartphone, title: "Web & App Design",  metric: "Responsive · Native",    pos: { bottom: "8%",left: "50%", transform: "translateX(-50%)" }, floatAnim: "heroFloat3", enterDelay: "1.3s" },
  { icon: Network,    title: "Networking & Cloud",metric: "Multi-Cloud · Connected",pos: { top: "50%",  left: "0%",  transform: "translateY(-50%)" }, floatAnim: "heroFloat4", enterDelay: "1.5s" },
];

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      aria-label="Hero — aKross Information Technology — Premier UAE Enterprise IT Consultancy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100svh",
        height: "100svh",
        overflow: "hidden",
        background: "var(--bg-midnight)",
      }}
    >
      {/* ── SKY → GALAXY base gradient ──
            top: deep cyan/navy "sky"
            mid: twilight purple
            bottom: black galaxy with star noise (existing GoldParticles) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(63,107,168,0.45) 0%, transparent 60%)," +
            "radial-gradient(ellipse 70% 60% at 30% 90%, rgba(80,40,140,0.35) 0%, transparent 65%)," +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(20,30,80,0.45) 0%, transparent 60%)," +
            "linear-gradient(180deg, #0a1638 0%, #08102a 30%, #050816 65%, #02040c 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header-shielding gradient — keeps gold logo readable over sky */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          background: "linear-gradient(to bottom, rgba(2,4,12,0.55) 0%, rgba(2,4,12,0.20) 60%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />

      {/* ── 3D scene slider — service-matched, swipes with same controls ── */}
      <Hero3DSlider current={current} />

      {/* Soft side overlay — keeps headline readable on the left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(2,4,12,0.65) 0%, rgba(5,8,22,0.25) 45%, rgba(10,17,41,0.05) 100%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Bottom fade into the galaxy floor */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "32%",
          background: "linear-gradient(to top, rgba(2,4,12,0.85), transparent)",
          pointerEvents: "none",
          zIndex: 2,
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
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
          zIndex: 3,
        }}
      />

      {/* ── Animated ornamental grid ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(rgba(212,175,55,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "gridDrift 28s linear infinite",
          opacity: 0.6,
        }}
      />

      {/* ── Light wave sweep ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(110deg, transparent 0%, rgba(212,175,55,0.06) 48%, rgba(212,175,55,0.12) 50%, rgba(212,175,55,0.06) 52%, transparent 100%)",
          animation: "lightWaveSweep 12s ease-in-out infinite",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* ── Floating gold particles ── */}
      <GoldParticles count={28} />

      {/* ── Two-column layout ── */}
      <div
        className="hero-grid"
        style={{
          position: "relative",
          zIndex: 4,
          display: "flex",
          alignItems: "flex-start",
          padding: "clamp(6rem, 11vh, 8rem) clamp(1.5rem, 5vw, 5rem) clamp(2rem, 4vh, 3rem)",
          gap: "clamp(1.5rem, 3vw, 3rem)",
          height: "100%",
        }}
      >
        {/* ════ LEFT COLUMN ════ */}
        <div
          style={{
            flex: "0 0 auto",
            width: "48%",
            maxWidth: 680,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Eyebrow badge */}
          <div style={{ animation: "heroSlideLeft 0.9s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.625rem",
                marginBottom: "1.25rem",
                padding: "0.5rem 1.125rem",
                borderRadius: "100px",
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(5,8,22,0.6)",
                backdropFilter: "blur(16px)",
                width: "fit-content",
                boxShadow: "0 0 24px rgba(212,175,55,0.18)",
              }}
            >
              <Sparkles size={13} style={{ color: "var(--gold-300)" }} />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--gold-200)",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne), sans-serif",
                }}
              >
                UAE&apos;s Premier Enterprise IT Consultancy
              </span>
            </div>
          </div>

          {/* Headline — luxury serif */}
          <div style={{ animation: "heroSlideUp 1.1s cubic-bezier(.22,1,.36,1) 0.3s both" }}>
            <h1
              style={{
                fontFamily: "var(--font-playfair), var(--font-cormorant), serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 5.2vw, 4.75rem)",
                lineHeight: 1.04,
                color: "var(--text-primary)",
                marginBottom: "1.125rem",
                letterSpacing: "-0.025em",
              }}
            >
              Engineering the{" "}
              <span
                style={{
                  fontStyle: "italic",
                  background:
                    "linear-gradient(90deg, #f3e6b0, #d4af37, #e9d27a, #d4af37, #f3e6b0)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "heroShimmer 8s linear infinite",
                  display: "inline",
                }}
              >
                sovereign digital
              </span>{" "}
              future of the UAE.
            </h1>
          </div>

          {/* Gold rule under headline */}
          <div
            style={{
              animation: "heroSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.5s both",
              width: 56,
              height: 1,
              background:
                "linear-gradient(90deg, var(--gold-400), transparent)",
              marginBottom: "1.125rem",
            }}
          />

          {/* Paragraph */}
          <div style={{ animation: "heroSlideUp 1s cubic-bezier(.22,1,.36,1) 0.6s both" }}>
            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.1875rem)",
                color: "rgba(245,241,230,0.86)",
                lineHeight: 1.6,
                marginBottom: "1.625rem",
                maxWidth: 560,
                fontWeight: 300,
                letterSpacing: "0.005em",
              }}
            >
              An elite advisory delivering enterprise transformation, sovereign cloud,
              zero-trust security and intelligent automation — for the institutions that
              shape the GCC&apos;s digital era.
            </p>
          </div>

          {/* Live activity ticker */}
          <div
            className="hero-ticker-wrap"
            style={{
              animation: "heroSlideUp 0.9s cubic-bezier(.22,1,.36,1) 0.75s both",
              marginBottom: "1.5rem",
            }}
          >
            <LiveActivityTicker />
          </div>

          {/* CTAs */}
          <div style={{ animation: "heroSlideUp 1s cubic-bezier(.22,1,.36,1) 0.9s both" }}>
            <div
              style={{
                display: "flex",
                gap: "0.875rem",
                flexWrap: "wrap",
                marginBottom: "1.625rem",
              }}
            >
              <Link
                href="/book-consultation"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "1rem 2.125rem",
                  borderRadius: "6px",
                  background:
                    "linear-gradient(135deg, #d4af37 0%, #f3e6b0 50%, #c9a44c 100%)",
                  backgroundSize: "200% 200%",
                  color: "#050816",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 700,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  boxShadow:
                    "0 10px 40px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,255,255,0.45)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, background-position 0.6s ease",
                  border: "1px solid rgba(212,175,55,0.6)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 14px 48px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.5)";
                  e.currentTarget.style.backgroundPosition = "100% 50%";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(212,175,55,0.4), inset 0 1px 0 rgba(255,255,255,0.4)";
                  e.currentTarget.style.backgroundPosition = "0% 50%";
                }}
              >
                <Calendar size={16} />
                Book Strategic Consultation
              </Link>

              <Link
                href="/services"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.625rem",
                  padding: "1rem 2.125rem",
                  borderRadius: "6px",
                  background: "rgba(245,241,230,0.04)",
                  border: "1px solid rgba(212,175,55,0.4)",
                  color: "var(--gold-200)",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  backdropFilter: "blur(12px)",
                  transition: "background 0.3s ease, border-color 0.3s ease, color 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(212,175,55,0.1)";
                  e.currentTarget.style.borderColor = "var(--gold-400)";
                  e.currentTarget.style.color = "var(--gold-100)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(245,241,230,0.04)";
                  e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)";
                  e.currentTarget.style.color = "var(--gold-200)";
                }}
              >
                Explore Services <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ animation: "heroSlideUp 1s cubic-bezier(.22,1,.36,1) 1.05s both" }}>
            <div
              style={{
                display: "flex",
                gap: "1rem 2rem",
                flexWrap: "wrap",
                paddingTop: "1.125rem",
                borderTop: "1px solid rgba(212,175,55,0.2)",
                maxWidth: 540,
              }}
            >
              {stats.map((s, i) => (
                <StatItem
                  key={s.label}
                  num={s.num}
                  suffix={s.suffix}
                  label={s.label}
                  delay={1200 + i * 150}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN — Compact horizontal 3-pillar showcase ════ */}
        <div
          className="hero-right-panel"
          style={{
            flex: 1,
            position: "relative",
            minHeight: "min(60vh, 540px)",
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.25rem",
            padding: "0 0.5rem",
          }}
        >
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: 360,
              width: "100%",
              animation: "heroFadeIn 0.9s 0.6s both",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.875rem",
                borderRadius: "100px",
                background: "rgba(5,8,22,0.78)",
                border: "1px solid rgba(212,175,55,0.45)",
                backdropFilter: "blur(12px)",
                marginBottom: "0.5rem",
                boxShadow: "0 0 18px rgba(212,175,55,0.18)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--gold-300)",
                  boxShadow: "0 0 10px var(--gold-300)",
                  animation: "heroPulse 2.4s ease infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne), sans-serif",
                  color: "var(--gold-200)",
                }}
              >
                Our Services
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                margin: 0,
                textShadow: "0 2px 24px rgba(2,4,12,0.85), 0 0 48px rgba(2,4,12,0.6)",
              }}
            >
              What We <span style={{ background: "linear-gradient(90deg, #f3e6b0 0%, #d4af37 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Do</span>
            </h2>
          </div>

          {/* Horizontal 3-card row */}
          <div className="hero-svc-row">
            {[
              { icon: Server,     title: "IT Infrastructure",  caption: "Software · Hardware · Networking", href: "#services", float: "heroSvcFloat1" },
              { icon: Boxes,      title: "ERP Implementation", caption: "Odoo · Oracle · Custom",            href: "#services", float: "heroSvcFloat2" },
              { icon: Smartphone, title: "Digital Services",   caption: "Web · App · UX Design",             href: "#services", float: "heroSvcFloat3" },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="hero-svc-floater"
                  style={{
                    animation: `heroFadeIn 0.9s ${0.8 + i * 0.15}s both, ${p.float} ${5 + i * 0.6}s ease-in-out ${i * 0.4 + 1.5}s infinite`,
                  }}
                >
                  <Link href={p.href} className="hero-svc-card">
                    <div className="hero-svc-icon">
                      <Icon size={22} color="var(--gold-100)" strokeWidth={1.6} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: "var(--font-syne), sans-serif",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          color: "var(--text-primary)",
                          letterSpacing: "-0.005em",
                          lineHeight: 1.25,
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          color: "rgba(245,241,230,0.7)",
                          fontFamily: "var(--font-syne), sans-serif",
                          letterSpacing: "0.02em",
                          marginTop: "0.18rem",
                          lineHeight: 1.45,
                        }}
                      >
                        {p.caption}
                      </div>
                    </div>
                    <ArrowUpRight size={14} color="var(--gold-300)" className="hero-svc-arrow" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Trust strip — rating + active engagements */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.875rem",
              padding: "0.625rem 1rem",
              borderRadius: "100px",
              background: "rgba(5,8,22,0.78)",
              border: "1px solid rgba(212,175,55,0.32)",
              backdropFilter: "blur(16px)",
              alignSelf: "flex-end",
              animation: "heroFadeIn 0.9s 1.4s both",
              boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <Star size={13} color="#d4af37" fill="#d4af37" />
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--gold-100)",
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                }}
              >
                4.9
              </span>
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "rgba(245,241,230,0.65)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-syne), sans-serif",
                }}
              >
                Executive
              </span>
            </div>
            <div style={{ width: 1, height: 16, background: "rgba(212,175,55,0.3)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--gold-400)",
                  display: "block",
                  animation: "heroPulse 2.4s ease infinite",
                  flexShrink: 0,
                  boxShadow: "0 0 8px var(--gold-400)",
                }}
              />
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-syne), sans-serif",
                  letterSpacing: "0.04em",
                }}
              >
                18 Active Engagements
              </span>
            </div>
          </div>
        </div>

        {/* ── Legacy luxury orb cluster removed; kept commented marker ── */}
        <div style={{ display: "none" }}>
          {/* SVG connection lines */}
          <svg
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
              overflow: "visible",
            }}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="goldLine" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(212,175,55,0.45)" />
                <stop offset="100%" stopColor="rgba(212,175,55,0.05)" />
              </linearGradient>
            </defs>
            <line x1="50%" y1="50%" x2="50%" y2="6%"   stroke="url(#goldLine)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="url(#goldLine)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="50%" y1="50%" x2="50%" y2="94%"  stroke="url(#goldLine)" strokeWidth="1" strokeDasharray="4 8" />
            <line x1="50%" y1="50%" x2="0%" y2="50%"   stroke="url(#goldLine)" strokeWidth="1" strokeDasharray="4 8" />
          </svg>

          {/* Ambient gold glow */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,175,55,0.25) 0%, rgba(212,175,55,0.1) 40%, transparent 70%)",
              filter: "blur(40px)",
              animation: "heroGlow 5s ease-in-out infinite, heroFadeIn 1.4s 0.4s both",
            }}
          />

          {/* Outermost ring */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px dashed rgba(212,175,55,0.18)",
              animation: "heroRing1 28s linear infinite, heroFadeIn 1.4s 0.5s both",
            }}
          />

          {/* Outer ring */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.22)",
              animation: "heroRing2 22s linear infinite, heroFadeIn 1.4s 0.6s both",
            }}
          />

          {/* Inner ring */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.3)",
              animation: "heroRing1 16s linear infinite reverse, heroFadeIn 1.4s 0.7s both",
            }}
          />

          {/* Central luxury orb */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              width: 116,
              height: 116,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 30% 30%, #f3e6b0 0%, #d4af37 35%, #a8862a 75%, #050816 100%)",
              border: "1px solid rgba(212,175,55,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 60px rgba(212,175,55,0.55), 0 0 120px rgba(212,175,55,0.25), inset 0 2px 8px rgba(255,255,255,0.5), inset 0 -8px 24px rgba(5,8,22,0.7)",
              animation: "heroOrbPulse 4s ease-in-out infinite, heroScaleIn 1s cubic-bezier(.22,1,.36,1) 0.5s both",
            }}
          >
            <Sparkles size={36} color="#050816" strokeWidth={1.5} />
          </div>

          {/* Feature cards orbiting the orb */}
          {featureCards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                style={{
                  position: "absolute",
                  ...card.pos,
                  zIndex: 6,
                  animation: `heroFadeIn 0.9s cubic-bezier(.22,1,.36,1) ${card.enterDelay} both`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0.875rem 1.125rem",
                    borderRadius: "0.625rem",
                    background: "rgba(5,8,22,0.78)",
                    border: "1px solid rgba(212,175,55,0.28)",
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.04)",
                    whiteSpace: "nowrap",
                    animation: `${card.floatAnim} 6s ease-in-out infinite`,
                    minWidth: 200,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "8px",
                      background:
                        "linear-gradient(135deg, rgba(212,175,55,0.18), rgba(212,175,55,0.06))",
                      border: "1px solid rgba(212,175,55,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      boxShadow: "0 0 16px rgba(212,175,55,0.18)",
                    }}
                  >
                    <Icon size={17} color="var(--gold-300)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "var(--font-syne), sans-serif",
                        fontWeight: 700,
                        fontSize: "0.8125rem",
                        color: "var(--text-primary)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontSize: "0.625rem",
                        color: "var(--gold-300)",
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        marginTop: "0.18rem",
                        fontFamily: "var(--font-syne), sans-serif",
                      }}
                    >
                      {card.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Rating badge */}
          <div
            style={{
              position: "absolute",
              top: "2%",
              right: "4%",
              zIndex: 7,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "100px",
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.4)",
              backdropFilter: "blur(16px)",
              animation: "heroFloat2 7s ease-in-out infinite, heroFadeIn 0.9s 1.7s both",
              boxShadow: "0 0 24px rgba(212,175,55,0.2)",
            }}
          >
            <Star size={12} color="#d4af37" fill="#d4af37" />
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--gold-200)",
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
              }}
            >
              4.9
            </span>
            <span
              style={{
                fontSize: "0.625rem",
                color: "rgba(245,241,230,0.55)",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontFamily: "var(--font-syne), sans-serif",
              }}
            >
              Executive Rating
            </span>
          </div>

          {/* Active engagements badge */}
          <div
            style={{
              position: "absolute",
              bottom: "4%",
              right: "4%",
              zIndex: 7,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.625rem 1rem",
              borderRadius: "100px",
              background: "rgba(5,8,22,0.78)",
              border: "1px solid rgba(212,175,55,0.28)",
              backdropFilter: "blur(16px)",
              animation: "heroFloat4 8s ease-in-out infinite, heroFadeIn 0.9s 1.9s both",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "var(--gold-400)",
                display: "block",
                animation: "heroPulse 2.4s ease infinite",
                flexShrink: 0,
                boxShadow: "0 0 8px var(--gold-400)",
              }}
            />
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                fontFamily: "var(--font-syne), sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              18 Active Engagements
            </span>
          </div>
        </div>
      </div>

      {/* ── Carousel Controls ── */}
      <button
        onClick={prev}
        aria-label="Previous scene"
        style={{
          position: "absolute",
          left: "clamp(1rem, 3vw, 2.5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 8,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(5,8,22,0.6)",
          border: "1px solid rgba(212,175,55,0.3)",
          color: "var(--gold-200)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(212,175,55,0.15)";
          e.currentTarget.style.borderColor = "var(--gold-400)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(5,8,22,0.6)";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
        }}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={next}
        aria-label="Next scene"
        style={{
          position: "absolute",
          right: "clamp(1rem, 3vw, 2.5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 8,
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "rgba(5,8,22,0.6)",
          border: "1px solid rgba(212,175,55,0.3)",
          color: "var(--gold-200)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(12px)",
          transition: "background 0.3s ease, border-color 0.3s ease",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(212,175,55,0.15)";
          e.currentTarget.style.borderColor = "var(--gold-400)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "rgba(5,8,22,0.6)";
          e.currentTarget.style.borderColor = "rgba(212,175,55,0.3)";
        }}
      >
        <ChevronRight size={20} />
      </button>

      {/* Scene label + dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "1.75rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.875rem",
        }}
      >
        <div
          key={`scene-${current}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.2rem",
            animation: "heroSlideUp 0.7s cubic-bezier(.22,1,.36,1) both",
          }}
        >
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontFamily: "var(--font-syne), sans-serif",
              background: "linear-gradient(90deg, #f3e6b0, #d4af37)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {slides[current].label}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "rgba(245,241,230,0.65)",
              letterSpacing: "0.04em",
              fontStyle: "italic",
              fontFamily: "var(--font-cormorant), var(--font-playfair), serif",
            }}
          >
            {slides[current].caption}
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to scene ${i + 1}: ${slides[i].label}`}
              className="hero-galaxy-dot"
              data-active={i === current}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                background:
                  i === current
                    ? "radial-gradient(circle, #fffbea 0%, #f3e6b0 25%, #d4af37 60%, transparent 100%)"
                    : "radial-gradient(circle, rgba(245,241,230,0.85) 0%, rgba(212,175,55,0.45) 55%, transparent 100%)",
                boxShadow:
                  i === current
                    ? "0 0 18px rgba(243,230,176,0.95), 0 0 36px rgba(212,175,55,0.6), 0 0 64px rgba(212,175,55,0.32)"
                    : "0 0 10px rgba(212,175,55,0.45), 0 0 22px rgba(212,175,55,0.18)",
                transform: i === current ? "scale(1.4)" : "scale(1)",
                transition: "transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "clamp(1.5rem, 3vw, 3rem)",
          zIndex: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.625rem",
          opacity: 0.6,
        }}
      >
        <span
          style={{
            fontSize: "0.5625rem",
            letterSpacing: "0.32em",
            color: "var(--gold-300)",
            textTransform: "uppercase",
            writingMode: "vertical-rl",
            fontFamily: "var(--font-syne), sans-serif",
            fontWeight: 500,
          }}
        >
          Discover
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, var(--gold-400), transparent)",
          }}
        />
      </div>

      <style>{`
        /* ── Entrance ── */
        @keyframes heroSlideUp   { from { opacity:0; transform:translateY(48px); }  to { opacity:1; transform:translateY(0); } }
        @keyframes heroSlideLeft { from { opacity:0; transform:translateX(-48px); } to { opacity:1; transform:translateX(0); } }
        @keyframes heroFadeIn    { from { opacity:0; }                              to { opacity:1; } }
        @keyframes heroScaleIn   { from { opacity:0; transform:scale(0.6); }        to { opacity:1; transform:scale(1); } }

        /* ── Headline gold shimmer ── */
        @keyframes heroShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }

        /* ── Dot-grid drift ── */
        @keyframes gridDrift {
          0%   { background-position: 0px 0px; }
          100% { background-position: 60px 60px; }
        }

        /* ── Light wave sweep ── */
        @keyframes lightWaveSweep {
          0%, 100% { transform: translateX(-50%) skewX(-12deg); opacity: 0; }
          40%      { opacity: 0.55; }
          60%      { opacity: 0.55; }
          100%     { transform: translateX(50%) skewX(-12deg); opacity: 0; }
        }

        /* ── Particle rise ── */
        @keyframes particleRiseLuxe {
          0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0; }
          10%  { opacity: 1; }
          50%  { transform: translateY(-50vh) translateX(20px) scale(0.9); }
          90%  { opacity: 0.6; }
          100% { transform: translateY(-100vh) translateX(-10px) scale(0.4); opacity: 0; }
        }

        /* ── Orb & rings ── */
        @keyframes heroPulse   { 0%,100%{opacity:.5;transform:scale(1);}  50%{opacity:1;transform:scale(1.5);} }
        @keyframes heroGlow    { 0%,100%{opacity:.55;transform:scale(1);}  50%{opacity:1;transform:scale(1.18);} }
        @keyframes heroOrbPulse {
          0%,100% {
            box-shadow: 0 0 60px rgba(212,175,55,0.45), 0 0 120px rgba(212,175,55,0.2),
                        inset 0 2px 8px rgba(255,255,255,0.5), inset 0 -8px 24px rgba(5,8,22,0.7);
          }
          50% {
            box-shadow: 0 0 100px rgba(212,175,55,0.7), 0 0 180px rgba(212,175,55,0.35),
                        inset 0 2px 10px rgba(255,255,255,0.6), inset 0 -8px 24px rgba(5,8,22,0.7);
          }
        }
        @keyframes heroRing1 { from{transform:rotate(0deg);}   to{transform:rotate(360deg);} }
        @keyframes heroRing2 { from{transform:rotate(0deg);}   to{transform:rotate(-360deg);} }

        /* ── Card floats ── */
        @keyframes heroFloat1 { 0%,100%{transform:translateX(-50%) translateY(0);}    50%{transform:translateX(-50%) translateY(-10px);} }
        @keyframes heroFloat2 { 0%,100%{transform:translateY(-50%) translateX(0);}    50%{transform:translateY(-50%) translateX(-9px);} }
        @keyframes heroFloat3 { 0%,100%{transform:translateX(-50%) translateY(0);}    50%{transform:translateX(-50%) translateY(10px);} }
        @keyframes heroFloat4 { 0%,100%{transform:translateY(-50%) translateX(0);}    50%{transform:translateY(-50%) translateX(9px);} }

        /* ── Hero service-pillar cards (right column) ── */
        .hero-svc-row {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.75rem;
          max-width: 360px;
          width: 100%;
          margin-left: auto;
        }
        .hero-svc-floater {
          display: block;
          width: 100%;
          will-change: transform;
        }
        .hero-svc-card {
          width: 100%;
          flex-direction: row !important;
          align-items: center !important;
          gap: 0.95rem;
          padding: 0.85rem 1rem !important;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          padding: 1.1rem 1rem 1.25rem;
          border-radius: 0.875rem;
          background: linear-gradient(160deg, rgba(10,17,41,0.78) 0%, rgba(5,8,22,0.65) 100%);
          border: 1px solid rgba(212,175,55,0.22);
          backdrop-filter: blur(12px) saturate(140%);
          -webkit-backdrop-filter: blur(12px) saturate(140%);
          text-decoration: none;
          overflow: hidden;
          transition: border-color 0.35s ease, transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease;
          box-shadow: 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
          will-change: transform;
        }
        /* Diagonal shimmer sweep that cycles across each card every 6s,
           offset per-card with animation-delay so attention rotates between them */
        .hero-svc-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(120deg, transparent 30%, rgba(243,230,176,0.16) 50%, transparent 70%);
          background-size: 250% 100%;
          animation: heroSvcShimmer 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }
        .hero-svc-row > .hero-svc-floater:nth-child(2) .hero-svc-card::before { animation-delay: 2s; }
        .hero-svc-row > .hero-svc-floater:nth-child(3) .hero-svc-card::before { animation-delay: 4s; }
        .hero-svc-card > * { position: relative; z-index: 2; }
        .hero-svc-icon {
          width: 44px;
          height: 44px;
          border-radius: 0.625rem;
          background: linear-gradient(135deg, rgba(212,175,55,0.28) 0%, rgba(212,175,55,0.06) 100%);
          border: 1px solid rgba(212,175,55,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 22px rgba(212,175,55,0.22), inset 0 0 12px rgba(212,175,55,0.08);
          animation: heroSvcIconPulse 3.6s ease-in-out infinite;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .hero-svc-row > .hero-svc-floater:nth-child(2) .hero-svc-icon { animation-delay: 1.2s; }
        .hero-svc-row > .hero-svc-floater:nth-child(3) .hero-svc-icon { animation-delay: 2.4s; }
        .hero-svc-arrow {
          flex-shrink: 0;
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
        .hero-svc-card:hover {
          border-color: rgba(212,175,55,0.7);
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 44px rgba(0,0,0,0.5), 0 0 28px rgba(212,175,55,0.22), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .hero-svc-card:hover .hero-svc-icon {
          transform: rotate(360deg) scale(1.08);
        }
        .hero-svc-card:hover .hero-svc-arrow {
          opacity: 1;
          transform: translate(2px, -2px);
        }
        @keyframes heroSvcShimmer {
          0%   { background-position: 200% 0; }
          50%  { background-position: -200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes heroSvcIconPulse {
          0%, 100% { box-shadow: 0 0 22px rgba(212,175,55,0.22), inset 0 0 12px rgba(212,175,55,0.08); }
          50%      { box-shadow: 0 0 38px rgba(212,175,55,0.5),  inset 0 0 18px rgba(212,175,55,0.18); }
        }
        @keyframes heroSvcFloat1 { 0%,100% { transform: translateY(0); }     50% { transform: translateY(-6px); } }
        @keyframes heroSvcFloat2 { 0%,100% { transform: translateY(0); }     50% { transform: translateY(-8px); } }
        @keyframes heroSvcFloat3 { 0%,100% { transform: translateY(0); }     50% { transform: translateY(-5px); } }

        /* ── Galaxy dot indicators ── */
        @keyframes starTwinkle {
          0%,100% { box-shadow: 0 0 18px rgba(243,230,176,0.95), 0 0 36px rgba(212,175,55,0.6),  0 0 64px rgba(212,175,55,0.32); }
          50%     { box-shadow: 0 0 26px rgba(243,230,176,1.0),  0 0 52px rgba(212,175,55,0.78), 0 0 84px rgba(212,175,55,0.45); }
        }
        @keyframes starSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        .hero-galaxy-dot[data-active="true"] {
          animation: starTwinkle 2.4s ease-in-out infinite;
        }
        .hero-galaxy-dot[data-active="true"]::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 38px;
          height: 38px;
          transform: translate(-50%, -50%);
          background:
            linear-gradient(0deg,   transparent 47%, rgba(243,230,176,0.85) 50%, transparent 53%),
            linear-gradient(90deg,  transparent 47%, rgba(243,230,176,0.85) 50%, transparent 53%);
          mask-image: radial-gradient(circle, #000 30%, transparent 65%);
          -webkit-mask-image: radial-gradient(circle, #000 30%, transparent 65%);
          opacity: 0.7;
          pointer-events: none;
          animation: starSpin 18s linear infinite;
        }
        .hero-galaxy-dot[data-active="false"]::after {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          width: 22px;
          height: 22px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%);
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-section { height: auto !important; min-height: 100svh !important; }
          .hero-right-panel { display: none !important; }
          .hero-grid > div:first-child { width: 100% !important; max-width: 100% !important; }
          section[aria-label*="Hero"] button[aria-label="Previous scene"],
          section[aria-label*="Hero"] button[aria-label="Next scene"] { display: none !important; }
        }

        /* ── Mid viewports — drop ticker to fit ── */
        @media (max-height: 900px) {
          .hero-ticker-wrap { display: none !important; }
          .hero-grid { padding-top: clamp(5.5rem, 10vh, 7rem) !important; }
        }

        /* ── Short viewports — also tighten margins ── */
        @media (max-height: 760px) {
          .hero-grid { padding-top: clamp(5rem, 8vh, 6rem) !important; padding-bottom: 1.5rem !important; }
        }

        /* ── Very short viewports — allow scroll ── */
        @media (max-height: 640px) {
          .hero-section { height: auto !important; min-height: 100svh !important; }
        }
      `}</style>
    </section>
  );
}
