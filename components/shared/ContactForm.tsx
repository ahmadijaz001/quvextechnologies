"use client";
import { useState, useRef } from "react";
import { Send, CheckCircle2, Loader2, Phone, Mail, User, MessageSquare, Briefcase } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const services = [
  "ERP & Business Solutions",
  "Odoo Implementation",
  "Custom ERP Development",
  "Web & eCommerce Development",
  "Shopify Plus",
  "Digital Marketing & SEO",
  "Google & Meta Ads",
  "AI & Automation",
  "AI Chatbot Development",
  "IT Infrastructure",
  "Cybersecurity",
  "Cloud Services",
  "Mobile App Development",
  "Business Intelligence",
  "Other / Not Sure",
];

interface ContactFormProps {
  defaultService?: string;
  compact?: boolean;
  accentColor?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  defaultService = "",
  compact = false,
  accentColor = "#00d4ff",
  title = "Get in Touch",
  subtitle = "Tell us about your project. We respond within 2 business hours.",
}: ContactFormProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: defaultService,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, company: "" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", service: defaultService, message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: compact ? "2.5rem" : "4rem 2rem",
          textAlign: "center",
          minHeight: compact ? "auto" : 320,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(0,230,138,0.12)",
            border: "1px solid rgba(0,230,138,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "scaleIn 0.4s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <CheckCircle2 size={28} style={{ color: "#00e68a" }} />
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: "1.375rem",
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Message Sent!
          </h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.6, maxWidth: 340 }}>
            Thank you for reaching out. One of our consultants will contact you within 2 business hours.
          </p>
        </div>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "0.5rem",
            padding: "0.625rem 1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--text-secondary)",
            fontSize: "0.875rem",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
    >
      {!compact && (
        <div style={{ marginBottom: "2rem" }}>
          <p className="label-tag" style={{ marginBottom: "0.625rem" }}>Contact Us</p>
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2rem)",
              color: "var(--text-primary)",
              marginBottom: "0.75rem",
            }}
          >
            {title}
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.65 }}>
            {subtitle}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className={compact ? "lux-form-compact" : ""}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: compact ? "1fr 1fr" : "1fr 1fr",
            gap: compact ? "0.75rem" : "1.125rem",
          }}
        >
          {/* Name */}
          <div className="lux-field">
            <label className="lux-label" htmlFor="cf-name">
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <User size={11} /> Full Name
              </span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              placeholder="Ahmed Al Mansouri"
              value={form.name}
              onChange={handleChange}
              className="lux-input"
            />
          </div>

          {/* Email */}
          <div className="lux-field">
            <label className="lux-label" htmlFor="cf-email">
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Mail size={11} /> Email Address
              </span>
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              placeholder="ahmed@company.ae"
              value={form.email}
              onChange={handleChange}
              className="lux-input"
            />
          </div>

          {/* Phone */}
          <div className="lux-field">
            <label className="lux-label" htmlFor="cf-phone">
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Phone size={11} /> Phone / WhatsApp
              </span>
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              placeholder="+971 50 123 4567"
              value={form.phone}
              onChange={handleChange}
              className="lux-input"
            />
          </div>

          {/* Service */}
          <div className="lux-field">
            <label className="lux-label" htmlFor="cf-service">
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <Briefcase size={11} /> Service Interested In
              </span>
            </label>
            <select
              id="cf-service"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="lux-input"
              style={{ appearance: "none", cursor: "pointer" }}
            >
              <option value="">Select a service...</option>
              {services.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Message — full width */}
          <div className="lux-field" style={{ gridColumn: "1 / -1" }}>
            <label className="lux-label" htmlFor="cf-message">
              <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <MessageSquare size={11} /> Message
              </span>
            </label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={compact ? 2 : 4}
              placeholder="Tell us about your project, challenges, or goals..."
              value={form.message}
              onChange={handleChange}
              className="lux-input"
            />
          </div>
        </div>

        {errorMsg && (
          <p
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              background: "rgba(255,77,106,0.08)",
              border: "1px solid rgba(255,77,106,0.2)",
              color: "#ff4d6a",
              fontSize: "0.875rem",
            }}
          >
            {errorMsg}
          </p>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-primary"
            style={{
              minWidth: 180,
              justifyContent: "center",
              opacity: status === "loading" ? 0.8 : 1,
              cursor: status === "loading" ? "default" : "pointer",
              background: `linear-gradient(135deg, ${accentColor}, #0066ff 60%, #7b2fff)`,
            }}
          >
            {status === "loading" ? (
              <>
                <Loader2 size={16} style={{ animation: "spinSlow 1s linear infinite" }} />
                Sending...
              </>
            ) : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>
          <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>
            We reply within 2 business hours
          </p>
        </div>
      </form>
    </div>
  );
}
