"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import MegaMenu from "./MegaMenu";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { label: "Services", href: "/services", hasMega: true },
  { label: "Industries", href: "/industries", hasMega: false },
  { label: "Case Studies", href: "/case-studies", hasMega: false },
  { label: "About", href: "/about", hasMega: false },
  { label: "Insights", href: "/blog", hasMega: false },
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

  const headerBg     = scrolled ? "rgba(5, 8, 22, 0.85)" : "transparent";
  const headerShadow = scrolled ? "0 12px 48px rgba(0,0,0,0.5)" : "none";
  const headerBorder = scrolled ? "1px solid rgba(212,175,55,0.18)" : "1px solid transparent";

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
          padding: "0 clamp(1.5rem, 5vw, 3.5rem)",
          height: 84,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, height 0.4s ease",
          background: headerBg,
          boxShadow: headerShadow,
          borderBottom: headerBorder,
          backdropFilter: scrolled ? "blur(28px) saturate(160%)" : "none",
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          aria-label="aKross Information Technology — Home"
          style={{ display: "flex", alignItems: "center", gap: "0.875rem", textDecoration: "none" }}
        >
          {/* Logomark — gold ring + monogram */}
          <div
            style={{
              position: "relative",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0a1129 0%, #050816 100%)",
              border: "1px solid rgba(212,175,55,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 24px rgba(212,175,55,0.35), inset 0 0 12px rgba(212,175,55,0.18)",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <Image
              src="/AkrossLogo.png"
              alt="aKross"
              width={36}
              height={36}
              style={{ objectFit: "contain", filter: "drop-shadow(0 0 6px rgba(212,175,55,0.4))" }}
              priority
            />
          </div>
          {/* Wordmark */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "1.5rem",
                background: "linear-gradient(135deg, #f3e6b0 0%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.01em",
                lineHeight: 1,
                display: "block",
              }}
            >
              aKross
            </span>
            <span
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 500,
                fontSize: "0.5625rem",
                color: "rgba(245,241,230,0.65)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                display: "block",
                marginTop: "0.2rem",
              }}
            >
              Information Technology
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav
          aria-label="Main navigation"
          style={{ display: "flex", alignItems: "center", gap: "0.125rem" }}
        >
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
                  className="nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.625rem 1rem",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    style={{
                      transition: "transform 0.3s ease",
                      transform: megaOpen ? "rotate(180deg)" : "rotate(0deg)",
                      opacity: 0.6,
                    }}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="nav-link"
                style={{
                  display: "block",
                  padding: "0.625rem 1rem",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* ── Right actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="tel:+97140000000"
            aria-label="Call us"
            className="hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(245,241,230,0.7)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              textDecoration: "none",
              transition: "color 0.25s ease",
              fontFamily: "var(--font-syne), sans-serif",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold-300)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,241,230,0.7)")}
          >
            <Phone size={13} />
            <span>+971 4 000 0000</span>
          </Link>

          <Link
            href="/book-consultation"
            className="header-cta"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.625rem 1.5rem",
              borderRadius: "4px",
              background: "linear-gradient(135deg, #d4af37 0%, #f3e6b0 50%, #c9a44c 100%)",
              backgroundSize: "200% 200%",
              color: "#050816",
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: "0.75rem",
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.4)",
              transition: "background-position 0.5s ease, transform 0.3s ease, box-shadow 0.3s ease",
              whiteSpace: "nowrap",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid rgba(212,175,55,0.6)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(212,175,55,0.55), inset 0 1px 0 rgba(255,255,255,0.5)";
              e.currentTarget.style.backgroundPosition = "100% 50%";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.4)";
              e.currentTarget.style.backgroundPosition = "0% 50%";
            }}
          >
            Book Consultation
          </Link>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.3)",
              borderRadius: "4px",
              color: "var(--gold-300)",
              display: "none",
              padding: "0.5rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
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
        @media (max-width: 1024px) {
          nav[aria-label="Main navigation"] { display: none !important; }
          .hidden-mobile { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
        @media (max-width: 480px) {
          .header-cta { padding: 0.5rem 1rem !important; font-size: 0.6875rem !important; }
        }
      `}</style>
    </>
  );
}
