import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | aKross Information Technology",
  description: "Terms and conditions governing the use of aKross Information Technology services and website.",
};

export default function TermsPage() {
  return (
    <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "5rem", background: "var(--bg-primary)" }}>
      <div className="section-container" style={{ maxWidth: "780px" }}>
        <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Legal</p>
        <h1 className="headline-section" style={{ marginBottom: "0.75rem" }}>Terms of Service</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "3rem" }}>Last updated: April 12, 2026</p>

        {[
          { title: "1. Acceptance of Terms", content: "By accessing or using akross.ae, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our website or services." },
          { title: "2. Services", content: "aKross Information Technology LLC provides IT consulting, ERP implementation, web development, digital marketing, cybersecurity, AI/automation, and managed IT services. Specific terms for each engagement are outlined in individual service agreements and statements of work." },
          { title: "3. Intellectual Property", content: "Unless otherwise agreed in writing, all deliverables created by aKross Information Technology become the property of the client upon full payment. aKross retains the right to showcase completed work in its portfolio. All website content (text, graphics, code) is owned by aKross Information Technology and may not be reproduced without permission." },
          { title: "4. Limitation of Liability", content: "To the maximum extent permitted by UAE law, aKross Information Technology shall not be liable for indirect, incidental, or consequential damages. Our liability is limited to the fees paid for the specific service giving rise to the claim in the preceding 12 months." },
          { title: "5. Governing Law", content: "These terms are governed by the laws of the United Arab Emirates and the emirate of Dubai. Any disputes shall be subject to the exclusive jurisdiction of the Dubai courts." },
          { title: "6. Contact", content: "aKross Information Technology LLC\nSheikh Zayed Road, Dubai, UAE\nlegal@akross.ae" },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "1.125rem", color: "var(--text-primary)", marginBottom: "0.875rem" }}>{section.title}</h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", lineHeight: 1.75, whiteSpace: "pre-line" }}>{section.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
