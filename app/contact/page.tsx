"use client";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import PageStarBackdrop from "@/components/sections/PageStarBackdrop";

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
      <PageStarBackdrop />
      <div className="cosmic-page">
        {/* Hero with embedded form */}
        <section
          className="contact-hero"
          style={{
            position: "relative",
            paddingTop: "clamp(5.5rem, 9vw, 7rem)",
            paddingBottom: "clamp(2.5rem, 5vw, 3.5rem)",
            overflow: "hidden",
          }}
        >
          <div className="section-container">
            <div className="contact-hero-grid">
              {/* LEFT — intro + contact info */}
              <div className="contact-hero-intro">
                <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Get in Touch</p>
                <h1 className="headline-section" style={{ marginBottom: "0.875rem" }}>
                  Let&apos;s Start a <span className="gradient-text">Conversation</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65, maxWidth: 480, marginBottom: "1.5rem" }}>
                  Have a project in mind? Need expert advice? We respond within 2 business hours.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", marginBottom: "1.5rem" }}>
                  {contactInfo.map(({ Icon, label, value }) => (
                    <div key={label} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: "rgba(212,175,55,0.1)",
                          border: "1px solid rgba(212,175,55,0.28)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={16} style={{ color: "var(--gold-300)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "0.18rem" }}>
                          {label}
                        </div>
                        <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)", whiteSpace: "pre-line", lineHeight: 1.55 }}>
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
                    gap: "0.875rem",
                    padding: "0.875rem 1.125rem",
                    borderRadius: 10,
                    background: "rgba(37,211,102,0.08)",
                    border: "1px solid rgba(37,211,102,0.25)",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                    backdropFilter: "blur(10px)",
                    width: "fit-content",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(37,211,102,0.12)";
                    el.style.borderColor = "rgba(37,211,102,0.4)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "rgba(37,211,102,0.08)";
                    el.style.borderColor = "rgba(37,211,102,0.25)";
                  }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(37,211,102,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MessageCircle size={17} style={{ color: "#25d366" }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "var(--text-primary)" }}>Chat on WhatsApp</div>
                    <div style={{ fontSize: "0.75rem", color: "#25d366" }}>Replies within minutes</div>
                  </div>
                </a>
              </div>

              {/* RIGHT — form */}
              <div className="glass-card contact-form-card">
                <ContactForm
                  compact
                  title="Send Us a Message"
                  subtitle="We respond within 2 business hours."
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="section-padding" style={{ paddingTop: "clamp(2rem, 4vw, 3rem)" }}>
          <div className="section-container">
            <p className="label-tag" style={{ marginBottom: "0.625rem" }}>Common Questions</p>
            <h2 className="headline-display" style={{ marginBottom: "1.5rem" }}>Frequently Asked</h2>
            <div className="faq-grid">
              {faqs.map(faq => (
                <div key={faq.q} style={{ padding: "1.125rem 1.25rem", borderRadius: 10, background: "var(--card-bg)", border: "1px solid var(--border)", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.5rem" }}>{faq.q}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .contact-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: clamp(1.75rem, 3vw, 2.75rem);
          align-items: start;
        }
        .contact-form-card {
          padding: 1.5rem 1.5rem 1.375rem;
          width: 100%;
          max-width: 560px;
          margin-left: auto;
        }
        .faq-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.875rem;
          max-width: 900px;
        }
        @media (max-width: 1024px) {
          .contact-hero-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .contact-hero-intro { order: 2; }
          .contact-form-card {
            order: 1;
            margin-left: 0 !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .contact-hero { padding-top: clamp(5rem, 16vw, 6.5rem) !important; padding-bottom: 1.75rem !important; }
          .contact-form-card { padding: 1.125rem !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
