"use client";
import { useState, useRef, useEffect } from "react";
import { CheckCircle2, Calendar, Sparkles, Clock, ShieldCheck } from "lucide-react";
import PageStarBackdrop from "@/components/sections/PageStarBackdrop";

const services = ["ERP & Business Solutions", "Web & eCommerce Development", "Digital Marketing & Creative", "AI, Automation & Data", "IT Infrastructure & Managed Services", "Mobile App Development", "Multiple Services / Full Digital Transformation"];
const budgets = ["Under AED 25,000", "AED 25,000 – 75,000", "AED 75,000 – 200,000", "AED 200,000 – 500,000", "AED 500,000+", "Prefer to discuss"];
const timelines = ["ASAP / Immediate", "Within 1 month", "1–3 months", "3–6 months", "6+ months", "Exploring / No fixed timeline"];

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", description: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  // When step changes, bring the form's top into view so users don't land mid-step.
  const goToStep = (next: number) => {
    setStep(next);
    requestAnimationFrame(() => {
      const el = formRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 88; // header offset
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

  // After successful submit, scroll the confirmation card into view on every viewport.
  useEffect(() => {
    if (!submitted) return;
    const el = successRef.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "booking" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Could not send your request. Please try again.");
      setSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Could not send your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <PageStarBackdrop />
        <div className="cosmic-page" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div ref={successRef} style={{ textAlign: "center", maxWidth: 500 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,230,138,0.1)", border: "2px solid rgba(0,230,138,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
              <CheckCircle2 size={32} style={{ color: "var(--accent-success)" }} />
            </div>
            <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>Consultation Request Received</h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Thank you, {form.name}. A senior aKross consultant will review your requirements and contact you within 2 business hours.
            </p>
            <p style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)" }}>Confirmation sent to {form.email}</p>
          </div>
        </div>
      </>
    );
  }

  const perks = [
    { Icon: Clock,       title: "30-Minute Session",   desc: "Free, time-boxed, no sales pitch" },
    { Icon: ShieldCheck, title: "Senior Consultants",  desc: "10+ years experience, UAE-focused" },
    { Icon: Sparkles,    title: "Honest Assessment",   desc: "What you need, not what we sell" },
  ];

  return (
    <>
      <PageStarBackdrop />
      <div className="cosmic-page">
        <section
          className="booking-hero"
          style={{
            position: "relative",
            paddingTop: "clamp(5.5rem, 9vw, 7rem)",
            paddingBottom: "clamp(2.5rem, 5vw, 4rem)",
            overflow: "hidden",
          }}
        >
          <div className="section-container">
            <div className="booking-hero-grid">
              {/* LEFT — intro + perks */}
              <div className="booking-hero-intro">
                <p className="label-tag" style={{ marginBottom: "0.875rem" }}>Free Consultation</p>
                <h1 className="headline-section" style={{ marginBottom: "0.875rem" }}>
                  Book Your Free <span className="gradient-text">30-Minute Session</span>
                </h1>
                <p style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65, maxWidth: 480, marginBottom: "1.75rem" }}>
                  No sales pitch. Just honest advice from a senior technology consultant on what your business actually needs.
                </p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {perks.map(({ Icon, title, desc }) => (
                    <li key={title} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={16} style={{ color: "var(--gold-300)" }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", marginBottom: "0.18rem" }}>{title}</div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>{desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT — multi-step form */}
              <form ref={formRef} onSubmit={handleSubmit} className="glass-card booking-form">
                {/* Progress */}
                <div className="booking-steps">
                  {[1, 2, 3].map(s => (
                    <div key={s} className="booking-step-wrap">
                      <div className={`booking-step ${s <= step ? "is-active" : ""}`}>
                        {s < step ? "✓" : s}
                      </div>
                      <span className={`booking-step-label ${s === step ? "is-current" : ""}`}>
                        {s === 1 ? "Your Info" : s === 2 ? "Project" : "Confirm"}
                      </span>
                      {s < 3 && <div className="booking-step-divider" />}
                    </div>
                  ))}
                </div>

                {step === 1 && (
                  <div>
                    <h3 className="booking-form-title">Your Contact Information</h3>
                    <div className="booking-grid-2">
                      {[
                        { id: "name", label: "Full Name *", type: "text", placeholder: "Ahmed Al Mansoori" },
                        { id: "email", label: "Email *", type: "email", placeholder: "ahmed@company.ae" },
                        { id: "phone", label: "Phone / WhatsApp *", type: "tel", placeholder: "+971 50 000 0000" },
                        { id: "company", label: "Company", type: "text", placeholder: "Your Company LLC" },
                      ].map(f => (
                        <div key={f.id}>
                          <label htmlFor={f.id} className="booking-label">{f.label}</label>
                          <input
                            id={f.id}
                            type={f.type}
                            placeholder={f.placeholder}
                            required={f.label.includes("*")}
                            value={form[f.id as keyof typeof form]}
                            onChange={e => setForm(x => ({ ...x, [f.id]: e.target.value }))}
                            className="booking-input"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="booking-actions">
                      <button type="button" onClick={() => goToStep(2)} className="btn-primary">
                        Continue <Calendar size={15} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h3 className="booking-form-title">Project Details</h3>

                    <div style={{ marginBottom: "1rem" }}>
                      <label className="booking-label">Service of Interest *</label>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {services.map(s => (
                          <button
                            type="button"
                            key={s}
                            onClick={() => setForm(x => ({ ...x, service: s }))}
                            className={`booking-pill ${form.service === s ? "is-active" : ""}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="booking-grid-2" style={{ marginBottom: "1rem" }}>
                      <div>
                        <label className="booking-label">Budget</label>
                        <select value={form.budget} onChange={e => setForm(x => ({ ...x, budget: e.target.value }))} className="booking-input">
                          <option value="">Select range...</option>
                          {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="booking-label">Timeline</label>
                        <select value={form.timeline} onChange={e => setForm(x => ({ ...x, timeline: e.target.value }))} className="booking-input">
                          <option value="">Select timeline...</option>
                          {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>

                    <div style={{ marginBottom: "0.5rem" }}>
                      <label className="booking-label">Tell us about your project</label>
                      <textarea
                        rows={3}
                        placeholder="Describe your situation, challenges, and what you'd like to achieve..."
                        value={form.description}
                        onChange={e => setForm(x => ({ ...x, description: e.target.value }))}
                        className="booking-input"
                      />
                    </div>

                    <div className="booking-actions">
                      <button type="button" onClick={() => goToStep(1)} className="btn-outline">Back</button>
                      <button type="button" onClick={() => goToStep(3)} className="btn-primary">Review</button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h3 className="booking-form-title">Confirm Your Request</h3>

                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
                      {[
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Phone", form.phone],
                        ["Company", form.company || "—"],
                        ["Service", form.service || "—"],
                        ["Budget", form.budget || "—"],
                        ["Timeline", form.timeline || "—"],
                      ].map(([label, val]) => (
                        <div key={label} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--border)" }}>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", minWidth: 96, fontWeight: 600 }}>{label}</span>
                          <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{val}</span>
                        </div>
                      ))}
                    </div>

                    {errorMsg && (
                      <div style={{ marginBottom: "0.875rem", padding: "0.625rem 0.875rem", borderRadius: 6, background: "rgba(255,77,106,0.08)", border: "1px solid rgba(255,77,106,0.25)", color: "#ff6b80", fontSize: "0.8125rem" }}>
                        {errorMsg}
                      </div>
                    )}
                    <div className="booking-actions">
                      <button type="button" onClick={() => goToStep(2)} className="btn-outline" disabled={submitting}>Edit</button>
                      <button type="submit" className="btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                        {submitting ? "Sending..." : "Submit Request"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .booking-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: clamp(1.75rem, 3vw, 2.75rem);
          align-items: start;
        }
        .booking-form { padding: 1.5rem 1.5rem 1.375rem; max-width: 560px; margin-left: auto; width: 100%; }
        .booking-steps { display: flex; align-items: center; gap: 0.4rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .booking-step-wrap { display: flex; align-items: center; gap: 0.5rem; }
        .booking-step {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700;
          background: rgba(212,175,55,0.12); color: var(--text-tertiary);
          border: 1px solid var(--border);
          transition: background 0.3s, color 0.3s, border-color 0.3s;
        }
        .booking-step.is-active { background: var(--gold-400); color: #050816; border-color: var(--gold-400); }
        .booking-step-label { font-size: 0.75rem; color: var(--text-tertiary); font-weight: 500; }
        .booking-step-label.is-current { color: var(--text-primary); }
        .booking-step-divider { width: 24px; height: 1px; background: var(--border); }

        .booking-form-title {
          font-family: var(--font-syne), sans-serif;
          font-weight: 600; font-size: 1rem;
          color: var(--text-primary); margin-bottom: 1rem;
        }
        .booking-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .booking-label {
          display: block;
          font-size: 0.75rem; font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.3rem;
        }
        .booking-input {
          width: 100%;
          padding: 0.6rem 0.85rem;
          background: rgba(5,8,22,0.55);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text-primary);
          font-size: 0.85rem; font-family: inherit;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }
        .booking-input:focus {
          border-color: var(--gold-400);
          background: rgba(5,8,22,0.75);
          box-shadow: 0 0 0 3px rgba(212,175,55,0.12);
        }
        .booking-input::placeholder { color: rgba(245,241,230,0.4); }
        select.booking-input { appearance: none; cursor: pointer; }
        select.booking-input option { background: var(--bg-secondary); color: var(--text-primary); }
        textarea.booking-input { resize: vertical; min-height: 78px; }

        .booking-pill {
          padding: 0.4rem 0.8rem; border-radius: 6px;
          border: 1px solid var(--border);
          background: rgba(5,8,22,0.45);
          color: var(--text-secondary);
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .booking-pill:hover { border-color: rgba(212,175,55,0.4); }
        .booking-pill.is-active {
          border-color: rgba(212,175,55,0.55);
          background: rgba(212,175,55,0.1);
          color: var(--gold-200);
        }

        .booking-actions {
          display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 1.125rem;
        }
        .booking-actions .btn-primary, .booking-actions .btn-outline {
          padding: 0.7rem 1.25rem; font-size: 0.8125rem;
        }

        @media (max-width: 1024px) {
          .booking-hero-grid { grid-template-columns: 1fr !important; gap: 1.75rem !important; }
          .booking-form { margin-left: 0 !important; max-width: 100% !important; }
        }
        @media (max-width: 640px) {
          .booking-form { padding: 1rem !important; }
          .booking-form-title { font-size: 0.95rem !important; margin-bottom: 0.75rem !important; }
          .booking-grid-2 { grid-template-columns: 1fr !important; gap: 0.6rem !important; }
          .booking-input { padding: 0.55rem 0.75rem !important; font-size: 0.85rem !important; }
          textarea.booking-input { min-height: 64px !important; }
          .booking-pill { padding: 0.32rem 0.65rem !important; font-size: 0.75rem !important; }
          .booking-actions { margin-top: 0.875rem !important; gap: 0.5rem !important; }
          .booking-actions .btn-primary,
          .booking-actions .btn-outline { width: 100% !important; max-width: none !important; padding: 0.65rem 1rem !important; }
          .booking-step-label { display: none !important; }
          .booking-steps { margin-bottom: 0.95rem !important; }
          .booking-hero { padding-top: clamp(5rem, 16vw, 6.5rem) !important; padding-bottom: 2rem !important; }
        }
      `}</style>
    </>
  );
}
