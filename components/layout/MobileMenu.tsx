"use client";
import { useEffect } from "react";
import Link from "next/link";
import { X, ChevronRight } from "lucide-react";

const links = [
  { label: "Services", href: "/services" },
  { label: "ERP & Business Solutions", href: "/services/erp", sub: true },
  { label: "Web & eCommerce", href: "/services/web-ecommerce", sub: true },
  { label: "Digital Marketing", href: "/services/digital-marketing", sub: true },
  { label: "AI & Automation", href: "/services/ai-automation", sub: true },
  { label: "IT Infrastructure", href: "/services/it-infrastructure", sub: true },
  { label: "Mobile Apps", href: "/services/mobile-apps", sub: true },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
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
        background: "#ffffff",
        backdropFilter: "blur(20px)",
        zIndex: 9100,
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem" }}>
        <Link href="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <div style={{ width: 34, height: 34, borderRadius: "0.5rem", background: "linear-gradient(135deg, #2563eb, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 900, fontSize: "1rem", color: "#ffffff" }}>Q</span>
          </div>
          <div>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "1rem", color: "#0a0e1a", letterSpacing: "-0.02em", display: "block", lineHeight: 1 }}>Quvex</span>
            <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 400, fontSize: "0.5625rem", color: "#64748b", letterSpacing: "0.12em", textTransform: "uppercase" }}>Technologies</span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{ background: "none", border: "none", color: "var(--text-secondary)", padding: "0.25rem" }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Links */}
      <nav aria-label="Mobile navigation links" style={{ flex: 1, overflowY: "auto" }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {links.map((link, i) => (
            <li key={link.href} style={{ animation: open ? `slideIn 0.3s ease ${i * 0.04}s both` : "none" }}>
              <Link
                href={link.href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: link.sub ? "0.625rem 1rem" : "0.875rem 0",
                  borderBottom: link.sub ? "none" : "1px solid var(--bg-tertiary)",
                  color: link.sub ? "var(--text-tertiary)" : "var(--text-primary)",
                  fontSize: link.sub ? "0.9rem" : "1.1rem",
                  fontWeight: link.sub ? 400 : 600,
                  textDecoration: "none",
                  fontFamily: link.sub ? "inherit" : "var(--font-syne), sans-serif",
                  marginLeft: link.sub ? "1rem" : 0,
                  transition: "color 0.15s",
                }}
              >
                {link.label}
                {!link.sub && <ChevronRight size={16} style={{ color: "var(--text-tertiary)" }} />}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* CTA */}
      <div style={{ paddingTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Link href="/book-consultation" onClick={onClose} className="btn-primary" style={{ textAlign: "center", justifyContent: "center" }}>
          Book Free Consultation
        </Link>
        <Link href="tel:+97100000000" onClick={onClose} style={{ textAlign: "center", padding: "0.75rem", color: "var(--text-secondary)", textDecoration: "none", fontSize: "0.9rem", border: "1px solid var(--border)", borderRadius: "0.5rem" }}>
          +971-XX-XXX-XXXX
        </Link>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
