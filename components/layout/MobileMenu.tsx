"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, ChevronRight } from "lucide-react";

const links = [
  { label: "Services", href: "/services" },
  { label: "Enterprise ERP", href: "/services/erp", sub: true },
  { label: "Web & eCommerce", href: "/services/web-ecommerce", sub: true },
  { label: "Digital Marketing", href: "/services/digital-marketing", sub: true },
  { label: "AI & Automation", href: "/services/ai-automation", sub: true },
  { label: "Cloud & IT Infrastructure", href: "/services/it-infrastructure", sub: true },
  { label: "Mobile Applications", href: "/services/mobile-apps", sub: true },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About aKross", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div
      aria-modal={open}
      aria-label="Mobile navigation"
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(180deg, #050816 0%, #02040c 100%)",
        backdropFilter: "blur(28px)",
        zIndex: 9100,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        borderLeft: "1px solid rgba(212,175,55,0.2)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-30%",
          width: 400,
          height: 400,
          background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", position: "relative", zIndex: 1 }}>
        <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0a1129, #050816)",
              border: "1px solid rgba(212,175,55,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
            }}
          >
            <Image src="/AkrossLogo.png" alt="aKross" width={32} height={32} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontWeight: 600,
                fontStyle: "italic",
                fontSize: "1.375rem",
                background: "linear-gradient(135deg, #f3e6b0 0%, #d4af37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "block",
                lineHeight: 1,
              }}
            >
              aKross
            </span>
            <span
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontWeight: 500,
                fontSize: "0.5625rem",
                color: "rgba(245,241,230,0.55)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                marginTop: "0.2rem",
                display: "block",
              }}
            >
              Information Technology
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            background: "rgba(212,175,55,0.08)",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "50%",
            color: "var(--gold-300)",
            padding: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Links */}
      <nav
        aria-label="Mobile navigation links"
        style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 1 }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map((link, i) => (
            <li key={link.href} style={{ animation: open ? `mobileSlideIn 0.45s cubic-bezier(.22,1,.36,1) ${i * 0.045}s both` : "none" }}>
              <Link
                href={link.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: link.sub ? "0.625rem 1rem" : "1rem 0",
                  borderBottom: link.sub ? "none" : "1px solid rgba(212,175,55,0.12)",
                  color: link.sub ? "var(--text-secondary)" : "var(--text-primary)",
                  fontSize: link.sub ? "0.875rem" : "1.0625rem",
                  fontWeight: link.sub ? 400 : 600,
                  textDecoration: "none",
                  fontFamily: link.sub ? "inherit" : "var(--font-syne), sans-serif",
                  marginLeft: link.sub ? "1rem" : 0,
                  transition: "color 0.25s ease",
                  letterSpacing: link.sub ? "0" : "-0.01em",
                }}
              >
                {link.label}
                {!link.sub && (
                  <ChevronRight size={16} style={{ color: "var(--gold-400)", opacity: 0.6 }} />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <div style={{ paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "0.875rem", position: "relative", zIndex: 1 }}>
        <Link
          href="/book-consultation"
          onClick={onClose}
          className="btn-primary"
          style={{ textAlign: "center", justifyContent: "center" }}
        >
          Book Consultation
        </Link>
        <Link
          href="tel:+97140000000"
          onClick={onClose}
          style={{
            textAlign: "center",
            padding: "0.875rem",
            color: "var(--gold-300)",
            textDecoration: "none",
            fontSize: "0.875rem",
            border: "1px solid rgba(212,175,55,0.3)",
            borderRadius: "4px",
            fontFamily: "var(--font-syne), sans-serif",
            letterSpacing: "0.04em",
            background: "rgba(212,175,55,0.04)",
          }}
        >
          +971 4 000 0000
        </Link>
      </div>

      <style>{`
        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateX(28px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
