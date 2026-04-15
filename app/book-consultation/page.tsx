"use client";
import { useState } from "react";
import { CheckCircle2, Calendar } from "lucide-react";

const services = ["ERP & Business Solutions", "Web & eCommerce Development", "Digital Marketing & Creative", "AI, Automation & Data", "IT Infrastructure & Managed Services", "Mobile App Development", "Multiple Services / Full Digital Transformation"];
const budgets = ["Under AED 25,000", "AED 25,000 – 75,000", "AED 75,000 – 200,000", "AED 200,000 – 500,000", "AED 500,000+", "Prefer to discuss"];
const timelines = ["ASAP / Immediate", "Within 1 month", "1–3 months", "3–6 months", "6+ months", "Exploring / No fixed timeline"];

export default function BookConsultationPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", service: "", budget: "", timeline: "", description: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", background: "var(--bg-primary)" }}>
        <div style={{ textAlign: "center", maxWidth: 500 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,230,138,0.1)", border: "2px solid rgba(0,230,138,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem" }}>
            <CheckCircle2 size={36} style={{ color: "var(--accent-success)" }} />
          </div>
          <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.75rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Consultation Request Received!</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
            Thank you, {form.name}! A senior Quvex consultant will review your requirements and contact you within 2 business hours to schedule your free 30-minute consultation.
          </p>
          <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)" }}>Check your inbox ({form.email}) for a confirmation email.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Free Consultation</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Book Your Free <span className="gradient-text">30-Minute Session</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto" }}>
            No sales pitch. Just honest advice from a senior technology consultant on what your business actually needs.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container" style={{ maxWidth: 760 }}>
          {/* Progress */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2.5rem", alignItems: "center" }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: s <= step ? "var(--accent-primary)" : "var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8125rem", fontWeight: 700, color: s <= step ? "#000" : "var(--text-tertiary)", transition: "background 0.3s" }}>
                  {s < step ? "✓" : s}
                </div>
                <span style={{ fontSize: "0.8125rem", color: s === step ? "var(--text-primary)" : "var(--text-tertiary)", display: step < 900 ? "block" : "none" }}>
                  {s === 1 ? "Your Info" : s === 2 ? "Project Details" : "Confirm"}
                </span>
                {s < 3 && <div style={{ width: 40, height: 1, background: "var(--border)" }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "2.5rem" }}>
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Your Contact Information</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  {[{ id: "name", label: "Full Name *", type: "text", placeholder: "Ahmed Al Mansoori" }, { id: "email", label: "Email Address *", type: "email", placeholder: "ahmed@company.ae" }, { id: "phone", label: "Phone / WhatsApp *", type: "tel", placeholder: "+971 50 000 0000" }, { id: "company", label: "Company Name", type: "text", placeholder: "Your Company LLC" }].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>{f.label}</label>
                      <input id={f.id} type={f.type} placeholder={f.placeholder} required={f.label.includes("*")} value={form[f.id as keyof typeof form]} onChange={e => setForm(x => ({ ...x, [f.id]: e.target.value }))} style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none" }} />
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setStep(2)} className="btn-primary" style={{ marginTop: "0.5rem" }}>
                  Continue <Calendar size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Project Details</h3>

                <div style={{ marginBottom: "1.25rem" }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.75rem" }}>Service(s) of Interest *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {services.map(s => (
                      <button type="button" key={s} onClick={() => setForm(x => ({ ...x, service: s }))} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: `1px solid ${form.service === s ? "rgba(0,212,255,0.5)" : "var(--border)"}`, background: form.service === s ? "rgba(0,212,255,0.1)" : "var(--card-bg)", color: form.service === s ? "var(--accent-primary)" : "var(--text-secondary)", fontSize: "0.875rem", transition: "all 0.2s" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Approximate Budget</label>
                    <select value={form.budget} onChange={e => setForm(x => ({ ...x, budget: e.target.value }))} style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none" }}>
                      <option value="">Select range...</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Project Timeline</label>
                    <select value={form.timeline} onChange={e => setForm(x => ({ ...x, timeline: e.target.value }))} style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none" }}>
                      <option value="">Select timeline...</option>
                      {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.375rem" }}>Tell Us About Your Project</label>
                  <textarea rows={4} placeholder="Describe your current situation, challenges, and what you're hoping to achieve..." value={form.description} onChange={e => setForm(x => ({ ...x, description: e.target.value }))} style={{ width: "100%", padding: "0.75rem 1rem", background: "var(--bg-tertiary)", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none", resize: "vertical" }} />
                </div>

                <div style={{ display: "flex", gap: "0.875rem" }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button type="button" onClick={() => setStep(3)} className="btn-primary">Review Request</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Confirm Your Request</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                  {[
                    ["Name", form.name],
                    ["Email", form.email],
                    ["Phone", form.phone],
                    ["Company", form.company || "—"],
                    ["Service Interest", form.service || "—"],
                    ["Budget", form.budget || "—"],
                    ["Timeline", form.timeline || "—"],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", gap: "1rem", padding: "0.75rem 0", borderBottom: "1px solid var(--bg-tertiary)" }}>
                      <span style={{ fontSize: "0.8125rem", color: "var(--text-tertiary)", minWidth: "120px", fontWeight: 600 }}>{label}</span>
                      <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.875rem" }}>
                  <button type="button" onClick={() => setStep(2)} className="btn-outline">Edit</button>
                  <button type="submit" className="btn-primary">Submit Request</button>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
