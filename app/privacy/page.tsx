import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Quvex Technologies",
  description: "Quvex Technologies privacy policy — how we collect, use, and protect your personal data in compliance with UAE PDPL.",
};

export default function PrivacyPage() {
  return (
    <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "5rem", background: "var(--bg-primary)" }}>
      <div className="section-container" style={{ maxWidth: "780px" }}>
        <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Legal</p>
        <h1 className="headline-section" style={{ marginBottom: "0.75rem" }}>Privacy Policy</h1>
        <p style={{ fontSize: "0.875rem", color: "var(--text-tertiary)", marginBottom: "3rem" }}>Last updated: April 12, 2026</p>

        {[
          { title: "1. Information We Collect", content: "We collect information you provide directly (name, email, phone, company), information collected automatically (IP address, browser type, pages visited, cookies), and information from third parties (Google Analytics, Meta Pixel, LinkedIn Insight Tag)." },
          { title: "2. How We Use Your Information", content: "To respond to inquiries and provide our services. To send you relevant communications (with your consent). To improve our website and services. To comply with legal obligations under UAE law. To analyze website usage and optimize performance." },
          { title: "3. Data Storage & UAE Compliance", content: "We comply with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021). Your data may be stored on servers in the UAE, EU, or US (with appropriate safeguards). We retain data for as long as necessary to provide services or as required by law." },
          { title: "4. Cookies", content: "We use essential cookies (required for the website to function), analytics cookies (Google Analytics — with your consent), and marketing cookies (Meta Pixel, LinkedIn — with your consent). You can manage cookie preferences via our cookie banner." },
          { title: "5. Your Rights", content: "You have the right to access, correct, delete, or restrict processing of your personal data. You may also withdraw consent at any time. To exercise these rights, contact: privacy@quvex.ae." },
          { title: "6. Third-Party Sharing", content: "We do not sell your personal data. We share data with service providers (hosting, email, CRM) only as necessary to deliver our services, and with legal authorities when required by law." },
          { title: "7. Contact", content: "Quvex Technologies LLC\nDubai Internet City, Dubai, UAE\nprivacy@quvex.ae\n+971-XX-XXX-XXXX" },
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
