"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Services", href: "/services", hasMega: true },
  { label: "Industries", href: "/industries", hasMega: false },
  { label: "Case Studies", href: "/case-studies", hasMega: false },
  { label: "About", href: "/about", hasMega: false },
  { label: "Blog", href: "/blog", hasMega: false },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [megaOpen,    setMegaOpen]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openMega  = () => { if (megaTimer.current) clearTimeout(megaTimer.current); setMegaOpen(true); };
  const closeMega = () => { megaTimer.current = setTimeout(() => setMegaOpen(false), 150); };

  // Over the hero (dark image) → white text on transparent bg
  // After scroll (over white body) → dark text on white bg
  const textColor     = scrolled ? "#0a0e1a"              : "#ffffff";
  const mutedColor    = scrolled ? "#475569"              : "rgba(255,255,255,0.75)";
  const headerBg      = scrolled ? "rgba(255,255,255,0.97)" : "transparent";
  const headerShadow  = scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none";
  const headerBorder  = scrolled ? "1px solid rgba(0,0,0,0.06)"  : "1px solid transparent";

  return (
    <>
      <header
        role="banner"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease",
          background: headerBg,
          boxShadow: headerShadow,
          borderBottom: headerBorder,
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" aria-label="Quvex Technologies — Home" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
          {/* Logomark */}
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "0.625rem",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: scrolled ? "0 2px 12px rgba(37,99,235,0.3)" : "0 2px 16px rgba(37,99,235,0.5)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 900, fontSize: "1.0625rem", color: "#ffffff", letterSpacing: "-0.02em" }}>Q</span>
          </div>
          {/* Wordmark */}
          <div>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "1.0625rem", color: textColor, letterSpacing: "-0.02em", lineHeight: 1, transition: "color 0.35s" }}>
              Quvex
            </span>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 400, fontSize: "0.625rem", color: mutedColor, letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginTop: "0.1rem", transition: "color 0.35s" }}>
              Technologies
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav aria-label="Main navigation" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          {navLinks.map(link =>
            link.hasMega ? (
              <div
                key={link.label}
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
                style={{ position: "relative" }}
              >
                <button
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.5rem 0.875rem",
                    borderRadius: "0.5rem",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: textColor,
                    cursor: "pointer",
                    transition: "color 0.35s, background 0.2s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "rgba(37,99,235,0.06)" : "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  {link.label}
                  <ChevronDown size={14} style={{ transition: "transform 0.2s", transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.7 }} />
                </button>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0.5rem",
                  fontFamily: "var(--font-syne), sans-serif",
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  color: textColor,
                  textDecoration: "none",
                  transition: "color 0.35s, background 0.2s",
                  letterSpacing: "-0.01em",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = scrolled ? "rgba(37,99,235,0.06)" : "rgba(255,255,255,0.1)"; e.currentTarget.style.color = scrolled ? "#2563eb" : "#ffffff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = textColor; }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Right actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Link
            href="tel:+97100000000"
            aria-label="Call us"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              color: mutedColor,
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.2s",
              fontFamily: "var(--font-syne), sans-serif",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = textColor)}
            onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}
          >
            <Phone size={14} />
            <span className="hidden-mobile">+971-XX-XXX-XXXX</span>
          </Link>

          <Link
            href="/book-consultation"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.5625rem 1.25rem",
              borderRadius: "0.5rem",
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              color: "#ffffff",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(37,99,235,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
              whiteSpace: "nowrap",
              letterSpacing: "-0.01em",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 18px rgba(37,99,235,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.35)"; }}
          >
            Free Consultation
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: scrolled ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.12)",
              border: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.25)",
              borderRadius: "0.5rem",
              color: textColor,
              display: "none",
              padding: "0.5rem",
              cursor: "pointer",
              transition: "color 0.35s, background 0.35s",
            }}
            className="mobile-hamburger"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mega Menu */}
      {megaOpen && (
        <div onMouseEnter={openMega} onMouseLeave={closeMega}>
          <MegaMenu onClose={() => setMegaOpen(false)} />
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <style>{`
        @media (max-width: 900px) {
          nav[aria-label="Main navigation"] { display: none !important; }
          .hidden-mobile { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
