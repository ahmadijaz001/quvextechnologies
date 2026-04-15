"use client";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Leadership Team", href: "/about#team" },
      { label: "Careers", href: "/careers" },
      { label: "Technology Partners", href: "/partners" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "ERP & Business Solutions", href: "/services/erp" },
      { label: "Web & eCommerce", href: "/services/web-ecommerce" },
      { label: "Digital Marketing", href: "/services/digital-marketing" },
      { label: "AI & Automation", href: "/services/ai-automation" },
      { label: "IT Infrastructure", href: "/services/it-infrastructure" },
      { label: "Mobile App Development", href: "/services/mobile-apps" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Retail & eCommerce", href: "/industries/retail" },
      { label: "F&B / Hospitality", href: "/industries/hospitality" },
      { label: "Finance & Banking", href: "/industries/finance" },
      { label: "Oil & Gas", href: "/industries/oil-gas" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Case Studies", href: "/case-studies" },
      { label: "Blog & Insights", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Technology Partners", href: "/partners" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const socials = [
  { href: "https://linkedin.com/company/quvex-technologies", label: "LinkedIn", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href: "https://twitter.com/quvextech", label: "Twitter / X", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.763l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { href: "https://instagram.com/quvextech", label: "Instagram", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
  { href: "https://facebook.com/quvextech", label: "Facebook", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  { href: "https://youtube.com/@quvextech", label: "YouTube", svg: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
];

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border)", paddingTop: "5rem" }}>
      <div className="section-container">
        {/* Top: Brand + Newsletter */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "4rem", alignItems: "start" }}>
          <div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", marginBottom: "1.25rem" }}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="15" cy="15" r="11" stroke="#00d4ff" strokeWidth="2.5" fill="none" />
                <line x1="23" y1="23" x2="32" y2="32" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="15" cy="15" r="4" fill="#00d4ff" />
              </svg>
              <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)" }}>
                Quvex<span style={{ color: "#00d4ff" }}>.</span>
              </span>
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: "380px", marginBottom: "1.5rem" }}>
              Dubai&apos;s premier IT solutions, ERP implementation, and digital transformation partner. Trusted by 150+ businesses across the UAE and GCC.
            </p>

            {/* Contact info */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {[
                { Icon: MapPin, text: "Dubai Internet City, Dubai, UAE" },
                { Icon: Phone, text: "+971-XX-XXX-XXXX" },
                { Icon: Mail, text: "hello@quvex.ae" },
              ].map(({ Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                  <Icon size={14} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>
              Stay Ahead of the Curve
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
              Monthly insights on tech trends, ERP updates, and UAE digital business strategies.
            </p>
            <form
              onSubmit={e => e.preventDefault()}
              style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  flex: 1,
                  minWidth: 200,
                  padding: "0.75rem 1rem",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  color: "var(--text-primary)",
                  fontSize: "0.9rem",
                  outline: "none",
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: "0.75rem 1.25rem", fontSize: "0.875rem" }}>
                Subscribe
              </button>
            </form>
            <p style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.625rem" }}>
              No spam. Unsubscribe anytime. See our{" "}
              <Link href="/privacy" style={{ color: "var(--accent-primary)", textDecoration: "none" }}>Privacy Policy</Link>.
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2rem", paddingBottom: "4rem", borderBottom: "1px solid var(--border)" }}>
          {columns.map(col => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: "1.25rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.625rem" }}>
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{ fontSize: "0.875rem", color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ padding: "1.5rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
            © {new Date().getFullYear()} Quvex Technologies LLC. All rights reserved. Registered in Dubai, UAE.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {socials.map(({ svg, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "var(--bg-tertiary)",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s, border-color 0.2s",
                  color: "var(--text-secondary)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.1)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,212,255,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--bg-tertiary)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; }}
              >
                {svg}
              </Link>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            {[["Privacy Policy", "/privacy"], ["Terms of Service", "/terms"], ["Cookie Policy", "/privacy#cookies"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", textDecoration: "none", transition: "color 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--text-tertiary)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
          footer > div > div:nth-child(2) { grid-template-columns: repeat(2, 1fr) !important; }
          footer > div > div:last-child { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 600px) {
          footer > div > div:nth-child(2) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
