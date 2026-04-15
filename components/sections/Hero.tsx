"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Calendar, ChevronLeft, ChevronRight,
  Database, Bot, ShieldCheck, Cloud, Star, Zap,
  CheckCircle2, Globe, Cpu,
} from "lucide-react";

/* ══════════════════════════════════════════
   COUNT-UP HOOK
══════════════════════════════════════════ */
function useCountUp(target: number, duration = 1600, delay = 0, decimals = 0) {
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

/* ══════════════════════════════════════════
   STAT ITEM
══════════════════════════════════════════ */
function StatItem({ num, suffix, label, delay, special }: {
  num: number; suffix: string; label: string; delay: number; special?: string;
}) {
  const decimals = suffix === "%" && num % 1 !== 0 ? 1 : 0;
  const count = useCountUp(special ? 0 : num, 1600, delay, decimals);
  return (
    <div style={{ animation: `heroSlideUp 0.6s cubic-bezier(.22,1,.36,1) ${(delay / 1000).toFixed(2)}s both` }}>
      <div style={{ fontFamily: "var(--font-syne), sans-serif", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
        {special ?? `${decimals > 0 ? count.toFixed(1) : count}${suffix}`}
      </div>
      <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.55)", marginTop: "0.2rem" }}>{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LIVE ACTIVITY TICKER
══════════════════════════════════════════ */
const activities = [
  { action: "ERP deployed successfully",   client: "Al Futtaim Group",  color: "#60a5fa", Icon: Database },
  { action: "AI automation went live",     client: "ENOC Energy",       color: "#a78bfa", Icon: Bot },
  { action: "Security audit completed",    client: "Emirates NBD",      color: "#34d399", Icon: ShieldCheck },
  { action: "Cloud migration finished",    client: "DP World",          color: "#fb923c", Icon: Cloud },
  { action: "New consultation booked",     client: "Aldar Properties",  color: "#60a5fa", Icon: Globe },
  { action: "AI chatbot launched",         client: "Noon.com",          color: "#a78bfa", Icon: Cpu },
  { action: "ERP go-live completed",       client: "Majid Al Futtaim",  color: "#34d399", Icon: CheckCircle2 },
];

function LiveActivityTicker() {
  const [idx, setIdx]       = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % activities.length);
        setVisible(true);
      }, 400);
    }, 3500);
    return () => clearInterval(cycle);
  }, []);

  const a = activities[idx];
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "0.625rem",
      padding: "0.5rem 0.875rem",
      borderRadius: "0.75rem",
      background: "rgba(4,10,28,0.7)",
      border: `1px solid ${a.color}28`,
      backdropFilter: "blur(14px)",
      transition: "opacity 0.35s ease, transform 0.35s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(6px)",
      minWidth: 260,
      maxWidth: 340,
    }}>
      {/* pulsing dot */}
      <span style={{
        width: 7, height: 7, borderRadius: "50%",
        background: a.color, flexShrink: 0,
        boxShadow: `0 0 8px ${a.color}`,
        animation: "heroPulse 2s ease infinite",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#ffffff", fontFamily: "var(--font-syne), sans-serif", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {a.action}
        </div>
        <div style={{ fontSize: "0.5625rem", color: a.color, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginTop: "0.1rem" }}>
          {a.client}
        </div>
      </div>
      <a.Icon size={14} color={a.color} strokeWidth={2} style={{ flexShrink: 0 }} />
    </div>
  );
}

/* ══════════════════════════════════════════
   DATA PULSE DOTS  (orb → cards)
══════════════════════════════════════════ */
const pulses = [
  { anim: "pulseUp",    color: "#60a5fa", shadow: "rgba(96,165,250,0.8)"  },
  { anim: "pulseRight", color: "#a78bfa", shadow: "rgba(167,139,250,0.8)" },
  { anim: "pulseDown",  color: "#34d399", shadow: "rgba(52,211,153,0.8)"  },
  { anim: "pulseLeft",  color: "#fb923c", shadow: "rgba(251,146,60,0.8)"  },
];

function DataPulses() {
  return (
    <>
      {pulses.map(p =>
        [0, 0.75, 1.5].map(d => (
          <div key={`${p.anim}-${d}`} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 6, height: 6,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 10px ${p.shadow}`,
            zIndex: 4,
            animation: `${p.anim} 2.25s linear ${d}s infinite`,
            pointerEvents: "none",
          }} />
        ))
      )}
    </>
  );
}

/* ══════════════════════════════════════════
   STATIC DATA
══════════════════════════════════════════ */
const slides = [
  { url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80", alt: "Modern enterprise office" },
  { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80", alt: "Dubai skyline" },
  { url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80", alt: "Enterprise data center" },
  { url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80", alt: "Global digital network" },
  { url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=80", alt: "Business team collaboration" },
];

const stats = [
  { num: 150,  suffix: "+",  label: "Clients Served" },
  { num: 500,  suffix: "+",  label: "Projects Delivered" },
  { num: 12,   suffix: "+",  label: "Industries" },
  { num: 99.9, suffix: "%",  label: "Uptime SLA" },
  { num: 0,    suffix: "",   label: "Support", special: "24/7" },
];

const featureCards = [
  { icon: Database,    title: "ERP Solutions",   metric: "50+ Implementations", color: "#60a5fa", glow: "rgba(96,165,250,0.22)",   pos: { top: "6%",    left: "50%",  transform: "translateX(-50%)" }, floatAnim: "heroFloat1", enterDelay: "0.5s" },
  { icon: Bot,         title: "AI & Automation", metric: "30% Avg. Cost Saved", color: "#a78bfa", glow: "rgba(167,139,250,0.22)",  pos: { top: "50%",   right: "0%", transform: "translateY(-50%)" }, floatAnim: "heroFloat2", enterDelay: "0.7s" },
  { icon: ShieldCheck, title: "Cybersecurity",   metric: "Zero Breach Record",  color: "#34d399", glow: "rgba(52,211,153,0.22)",   pos: { bottom: "6%", left: "50%",  transform: "translateX(-50%)" }, floatAnim: "heroFloat3", enterDelay: "0.9s" },
  { icon: Cloud,       title: "Cloud Infra",     metric: "AWS · Azure · GCP",   color: "#fb923c", glow: "rgba(251,146,60,0.22)",   pos: { top: "50%",   left: "0%",  transform: "translateY(-50%)" }, floatAnim: "heroFloat4", enterDelay: "1.1s" },
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
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section
      aria-label="Hero — Dubai's Premier Technology Partner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", height: "100vh", minHeight: 640, overflow: "hidden" }}
    >
      {/* ── Slides ── */}
      {slides.map((s, i) => (
        <div key={s.url} aria-hidden={i !== current} style={{
          position: "absolute", inset: 0,
          backgroundImage: `url("${s.url}")`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: i === current ? 1 : 0,
          transition: "opacity 1.2s ease", willChange: "opacity",
        }} />
      ))}

      {/* ── Overlays ── */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(4,10,28,0.92) 0%, rgba(4,10,28,0.68) 50%, rgba(4,10,28,0.30) 100%)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, rgba(4,10,28,0.75), transparent)", pointerEvents: "none" }} />

      {/* ── Animated dot-grid background ── */}
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(96,165,250,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        animation: "gridDrift 20s linear infinite",
      }} />

      {/* ── Two-column layout ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        display: "flex", alignItems: "center",
        padding: "0 clamp(1.5rem, 5vw, 4rem)", gap: "2rem",
      }}>

        {/* ════ LEFT COLUMN ════ */}
        <div style={{
          flex: "0 0 auto",
          width: "42%", maxWidth: 520, minWidth: 280,
          paddingTop: "clamp(5rem, 12vh, 7rem)",
          paddingBottom: "4rem",
          display: "flex", flexDirection: "column",
        }}>
          {/* Live badge */}
          <div style={{ animation: "heroSlideLeft 0.7s cubic-bezier(.22,1,.36,1) 0.1s both" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              marginBottom: "1.25rem", padding: "0.3rem 0.875rem",
              borderRadius: "100px",
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
              width: "fit-content",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563eb", display: "block", animation: "heroPulse 2s ease infinite", flexShrink: 0 }} />
              <span style={{ fontSize: "0.625rem", fontWeight: 600, color: "rgba(255,255,255,0.9)", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-syne), sans-serif" }}>
                Dubai&apos;s #1 IT &amp; ERP Solutions Partner
              </span>
            </div>
          </div>

          {/* Headline */}
          <div style={{ animation: "heroSlideUp 0.8s cubic-bezier(.22,1,.36,1) 0.25s both" }}>
            <h1 style={{
              fontFamily: "var(--font-syne), sans-serif", fontWeight: 800,
              fontSize: "clamp(1.875rem, 3.5vw, 2.875rem)",
              lineHeight: 1.12, color: "#ffffff",
              marginBottom: "1rem", letterSpacing: "-0.02em",
            }}>
              We Engineer{" "}
              <span style={{
                backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa, #e0c3fc, #a78bfa, #60a5fa)",
                backgroundSize: "250% auto",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                animation: "heroShimmer 4s linear 1.2s infinite",
                display: "inline",
              }}>
                Digital Excellence
              </span>
            </h1>
          </div>

          {/* Paragraph */}
          <div style={{ animation: "heroSlideUp 0.8s cubic-bezier(.22,1,.36,1) 0.45s both" }}>
            <p style={{
              fontSize: "clamp(0.875rem, 1.4vw, 1rem)",
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7, marginBottom: "1.5rem", maxWidth: 460,
            }}>
              End-to-end technology solutions — ERP, AI automation, cybersecurity, cloud infrastructure,
              and digital transformation. Trusted by{" "}
              <strong style={{ color: "#ffffff", fontWeight: 700 }}>150+ businesses</strong> across UAE and GCC.
            </p>
          </div>

          {/* Live activity ticker */}
          <div style={{ animation: "heroSlideUp 0.7s cubic-bezier(.22,1,.36,1) 0.55s both", marginBottom: "1.5rem" }}>
            <LiveActivityTicker />
          </div>

          {/* CTAs */}
          <div style={{ animation: "heroSlideUp 0.8s cubic-bezier(.22,1,.36,1) 0.65s both" }}>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.75rem" }}>
              <Link href="/services" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                color: "#ffffff", fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 700, fontSize: "0.875rem", textDecoration: "none",
                boxShadow: "0 4px 24px rgba(37,99,235,0.45)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,99,235,0.45)"; }}
              >
                Explore Services <ArrowRight size={15} />
              </Link>
              <Link href="/book-consultation" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                padding: "0.8125rem 1.75rem", borderRadius: "0.625rem",
                background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)",
                color: "#ffffff", fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 600, fontSize: "0.875rem", textDecoration: "none",
                backdropFilter: "blur(8px)", transition: "background 0.2s, border-color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              >
                <Calendar size={15} /> Free Consultation
              </Link>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ animation: "heroSlideUp 0.8s cubic-bezier(.22,1,.36,1) 0.8s both" }}>
            <div style={{
              display: "flex", gap: "0.875rem 1.5rem", flexWrap: "wrap",
              paddingTop: "1.25rem",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              maxWidth: 460,
            }}>
              {stats.map((s, i) => (
                <StatItem key={s.label} num={s.num} suffix={s.suffix} label={s.label} special={s.special} delay={950 + i * 120} />
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div className="hero-right-panel" style={{
          flex: 1, position: "relative",
          height: "70%", maxHeight: 480,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* SVG connection lines — orb to each card */}
          <svg
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none", overflow: "visible" }}
            preserveAspectRatio="none"
          >
            {/* Top */}
            <line x1="50%" y1="50%" x2="50%" y2="6%"   stroke="rgba(96,165,250,0.18)"  strokeWidth="1" strokeDasharray="5 8" />
            {/* Right */}
            <line x1="50%" y1="50%" x2="100%" y2="50%" stroke="rgba(167,139,250,0.18)" strokeWidth="1" strokeDasharray="5 8" />
            {/* Bottom */}
            <line x1="50%" y1="50%" x2="50%" y2="94%"  stroke="rgba(52,211,153,0.18)"  strokeWidth="1" strokeDasharray="5 8" />
            {/* Left */}
            <line x1="50%" y1="50%" x2="0%" y2="50%"   stroke="rgba(251,146,60,0.18)"  strokeWidth="1" strokeDasharray="5 8" />
          </svg>

          {/* Data pulse dots */}
          <DataPulses />

          {/* Ambient glow */}
          <div aria-hidden="true" style={{
            position: "absolute", width: 280, height: 280, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(124,58,237,0.12) 50%, transparent 75%)",
            filter: "blur(32px)",
            animation: "heroGlow 4s ease-in-out infinite, heroFadeIn 1s 0.3s both",
          }} />

          {/* Outer ring */}
          <div aria-hidden="true" style={{
            position: "absolute", width: 260, height: 260, borderRadius: "50%",
            border: "1px dashed rgba(96,165,250,0.2)",
            animation: "heroRing1 18s linear infinite, heroFadeIn 1s 0.4s both",
          }} />

          {/* Inner ring */}
          <div aria-hidden="true" style={{
            position: "absolute", width: 200, height: 200, borderRadius: "50%",
            border: "1px solid rgba(167,139,250,0.18)",
            animation: "heroRing2 12s linear infinite, heroFadeIn 1s 0.5s both",
          }} />

          {/* Central orb */}
          <div style={{
            position: "relative", zIndex: 5,
            width: 100, height: 100, borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(37,99,235,0.6) 0%, rgba(124,58,237,0.6) 100%)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 40px rgba(37,99,235,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
            animation: "heroOrbPulse 3s ease-in-out infinite, heroScaleIn 0.7s cubic-bezier(.22,1,.36,1) 0.3s both",
          }}>
            <Zap size={32} color="#ffffff" strokeWidth={1.5} />
          </div>

          {/* Feature cards */}
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} style={{
                position: "absolute", ...card.pos, zIndex: 6,
                animation: `heroFadeIn 0.6s cubic-bezier(.22,1,.36,1) ${card.enterDelay} both`,
              }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "0.625rem",
                  padding: "0.625rem 0.875rem", borderRadius: "0.875rem",
                  background: "rgba(4,10,28,0.7)", border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px ${card.glow}`,
                  whiteSpace: "nowrap",
                  animation: `${card.floatAnim} 5s ease-in-out infinite`,
                  minWidth: 170,
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "0.5rem",
                    background: `${card.color}18`, border: `1px solid ${card.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>
                    <Icon size={16} color={card.color} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "#ffffff", lineHeight: 1.2 }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize: "0.625rem", color: card.color, fontWeight: 600, letterSpacing: "0.04em", marginTop: "0.15rem" }}>
                      {card.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Rating badge */}
          <div style={{
            position: "absolute", top: "2%", right: "4%", zIndex: 7,
            display: "flex", alignItems: "center", gap: "0.375rem",
            padding: "0.375rem 0.75rem", borderRadius: "100px",
            background: "rgba(201,164,76,0.12)", border: "1px solid rgba(201,164,76,0.3)",
            backdropFilter: "blur(12px)",
            animation: "heroFloat2 6s ease-in-out infinite, heroFadeIn 0.6s 1.3s both",
          }}>
            <Star size={12} color="#c9a44c" fill="#c9a44c" />
            <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#c9a44c", fontFamily: "var(--font-syne), sans-serif" }}>4.9 / 5</span>
            <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.05em" }}>Client Rating</span>
          </div>

          {/* Live projects badge */}
          <div style={{
            position: "absolute", bottom: "4%", right: "4%", zIndex: 7,
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 0.875rem", borderRadius: "0.75rem",
            background: "rgba(4,10,28,0.75)", border: "1px solid rgba(52,211,153,0.2)",
            backdropFilter: "blur(12px)",
            animation: "heroFloat4 7s ease-in-out infinite, heroFadeIn 0.6s 1.5s both",
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "block", animation: "heroPulse 2s ease infinite", flexShrink: 0 }} />
            <span style={{ fontSize: "0.6875rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-syne), sans-serif" }}>
              12 Active Projects
            </span>
          </div>
        </div>
      </div>

      {/* ── Carousel Controls ── */}
      <button onClick={prev} aria-label="Previous image" style={{
        position: "absolute", left: "clamp(1rem, 3vw, 2.5rem)", top: "50%", transform: "translateY(-50%)",
        zIndex: 8, width: 44, height: 44, borderRadius: "50%",
        background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)",
        color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
      >
        <ChevronLeft size={20} />
      </button>

      <button onClick={next} aria-label="Next image" style={{
        position: "absolute", right: "clamp(1rem, 3vw, 2.5rem)", top: "50%", transform: "translateY(-50%)",
        zIndex: 8, width: 44, height: 44, borderRadius: "50%",
        background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.2)",
        color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", backdropFilter: "blur(8px)", transition: "background 0.2s",
      }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
      >
        <ChevronRight size={20} />
      </button>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: "1.75rem", left: "50%", transform: "translateX(-50%)",
        zIndex: 8, display: "flex", gap: "0.5rem", alignItems: "center",
      }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`} style={{
            width: i === current ? 24 : 7, height: 7, borderRadius: 4,
            background: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
            border: "none", cursor: "pointer", padding: 0,
            transition: "width 0.35s ease, background 0.35s ease",
          }} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "1.75rem", right: "clamp(1rem, 3vw, 2.5rem)",
        zIndex: 8, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: 0.45,
      }}>
        <span style={{ fontSize: "0.5625rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1.5, height: 32, background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)" }} />
      </div>

      <style>{`
        /* ── Entrance ── */
        @keyframes heroSlideUp   { from { opacity:0; transform:translateY(36px); }  to { opacity:1; transform:translateY(0); } }
        @keyframes heroSlideLeft { from { opacity:0; transform:translateX(-32px); } to { opacity:1; transform:translateX(0); } }
        @keyframes heroFadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes heroScaleIn   { from { opacity:0; transform:scale(0.6); } to { opacity:1; transform:scale(1); } }

        /* ── Headline shimmer ── */
        @keyframes heroShimmer {
          0%   { background-position: 0% center; }
          100% { background-position: 250% center; }
        }

        /* ── Dot-grid drift ── */
        @keyframes gridDrift {
          0%   { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }

        /* ── Orb & rings ── */
        @keyframes heroPulse   { 0%,100%{opacity:.5;transform:scale(1);}  50%{opacity:1;transform:scale(1.4);} }
        @keyframes heroGlow    { 0%,100%{opacity:.6;transform:scale(1);}  50%{opacity:1;transform:scale(1.15);} }
        @keyframes heroOrbPulse {
          0%,100% { box-shadow: 0 0 40px rgba(37,99,235,.35), inset 0 1px 0 rgba(255,255,255,.2); }
          50%      { box-shadow: 0 0 70px rgba(37,99,235,.6),  inset 0 1px 0 rgba(255,255,255,.2); }
        }
        @keyframes heroRing1 { from{transform:rotate(0deg);}   to{transform:rotate(360deg);} }
        @keyframes heroRing2 { from{transform:rotate(0deg);}   to{transform:rotate(-360deg);} }

        /* ── Card floats ── */
        @keyframes heroFloat1 { 0%,100%{transform:translateX(-50%) translateY(0);}    50%{transform:translateX(-50%) translateY(-9px);} }
        @keyframes heroFloat2 { 0%,100%{transform:translateY(-50%) translateX(0);}    50%{transform:translateY(-50%) translateX(-7px);} }
        @keyframes heroFloat3 { 0%,100%{transform:translateX(-50%) translateY(0);}    50%{transform:translateX(-50%) translateY(9px);} }
        @keyframes heroFloat4 { 0%,100%{transform:translateY(-50%) translateX(0);}    50%{transform:translateY(-50%) translateX(7px);} }

        /* ── Data pulse dots ── */
        @keyframes pulseUp {
          0%   { opacity:0; transform:translate(-50%,-50%) translateY(0); }
          12%  { opacity:1; }
          88%  { opacity:.7; }
          100% { opacity:0; transform:translate(-50%,-50%) translateY(-185px); }
        }
        @keyframes pulseRight {
          0%   { opacity:0; transform:translate(-50%,-50%) translateX(0); }
          12%  { opacity:1; }
          88%  { opacity:.7; }
          100% { opacity:0; transform:translate(-50%,-50%) translateX(225px); }
        }
        @keyframes pulseDown {
          0%   { opacity:0; transform:translate(-50%,-50%) translateY(0); }
          12%  { opacity:1; }
          88%  { opacity:.7; }
          100% { opacity:0; transform:translate(-50%,-50%) translateY(185px); }
        }
        @keyframes pulseLeft {
          0%   { opacity:0; transform:translate(-50%,-50%) translateX(0); }
          12%  { opacity:1; }
          88%  { opacity:.7; }
          100% { opacity:0; transform:translate(-50%,-50%) translateX(-225px); }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-right-panel { display:none !important; }
          section[aria-label*="Hero"] button[aria-label="Previous image"],
          section[aria-label*="Hero"] button[aria-label="Next image"] { display:none !important; }
        }
      `}</style>
    </section>
  );
}
