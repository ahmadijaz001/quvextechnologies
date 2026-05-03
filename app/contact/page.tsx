"use client";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import Reveal from "@/components/shared/Reveal";

const contactInfo = [
  { Icon: MapPin,  label: "Address",        value: "Sheikh Zayed Road, Tower One\nDubai, United Arab Emirates" },
  { Icon: Phone,   label: "Phone",          value: "+971 55 930 0437" },
  { Icon: Mail,    label: "Email",          value: "hello@akross.ae" },
  { Icon: Clock,   label: "Business Hours", value: "Mon–Fri: 9:00 AM – 6:00 PM GST\nSat: 10:00 AM – 2:00 PM GST" },
];

const faqs = [
  { q: "How quickly do you respond?", a: "Within 2 business hours — often much sooner. For urgent matters, WhatsApp us directly." },
  { q: "Is the consultation really free?", a: "Yes. No catch. We assess your needs and give honest advice — whether or not you engage us." },
  { q: "Can you work with our existing systems?", a: "Absolutely. We specialize in integrations. Most clients keep existing infrastructure and extend it." },
  { q: "Do you serve clients outside Dubai?", a: "Yes — we serve clients across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman." },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="contact-hero"
        style={{
          paddingTop: "clamp(5.5rem,10vw,7.5rem)",
          paddingBottom: "clamp(2.5rem,4vw,3.5rem)",
          background: "var(--bg-primary)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div className="section-container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal>
            <p className="label-tag" style={{ marginBottom: "1rem" }}>Get in Touch</p>
            <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
              Let&apos;s Start a <span className="gradient-text">Conversation</span>
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "540px", margin: "0 auto" }}>
              Have a project in mind? Need expert advice? Just want to explore options? We&apos;re here — and we respond within 2 hours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 3fr", gap: "5rem", alignItems: "start" }}>

            {/* Left — contact info */}
            <Reveal direction="left">
              <div>
                <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.25rem", color: "var(--text-primary)", marginBottom: "2rem" }}>
                  Contact Information
                </h2>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2.5rem" }}>
                  {contactInfo.map(({ Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "0.875rem",
                          background: "rgba(0,212,255,0.08)",
                          border: "1px solid rgba(0,212,255,0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} style={{ color: "var(--accent-primary)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "0.3rem" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", whiteSpace: "pre-line", lineHeight: 1.65 }}>
                          {value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/971559300437?text=Hello%20aKross%2C%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.25rem 1.5rem",
                    borderRadius: "0.875rem",
                    background: "rgba(37,211,102,0.06)",
                    border: "1px solid rgba(37,211,102,0.2)",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                    marginBottom: "3rem",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(37,211,102,0.1)";
                    el.style.borderColor = "rgba(37,211,102,0.35)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(37,211,102,0.06)";
                    el.style.borderColor = "rgba(37,211,102,0.2)";
                  }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(37,211,102,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageCircle size={20} style={{ color: "#25d366" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "var(--text-primary)" }}>Chat on WhatsApp</div>
                    <div style={{ fontSize: "0.8125rem", color: "#25d366" }}>Typically replies within minutes</div>
                  </div>
                </a>

                {/* Mini FAQ */}
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "1.25rem" }}>
                  Common Questions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {faqs.map(faq => (
                    <div key={faq.q} style={{ padding: "1rem 1.25rem", borderRadius: "0.75rem", background: "var(--card-bg)", border: "1px solid var(--border)" }}>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)", marginBottom: "0.375rem" }}>{faq.q}</div>
                      <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Right — form */}
            <Reveal direction="right" delay={100}>
              <div className="glass-card" style={{ padding: "2.75rem" }}>
                <ContactForm
                  title="Send Us a Message"
                  subtitle="We respond within 2 business hours. Your data is kept strictly confidential."
                />
              </div>
            </Reveal>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            section > div > div[style*="2fr 3fr"] { grid-template-columns: 1fr !important; gap: 2rem !important; }
          }
          @media (max-width: 640px) {
            section > div > div[style*="2fr 3fr"] { gap: 1.5rem !important; }
            section > div > div[style*="2fr 3fr"] > div { padding: 0 !important; }
          }
        `}</style>
      </section>
    </>
  );
}
