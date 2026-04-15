import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", padding: "2rem" }}>
      <div style={{ textAlign: "center", maxWidth: 500 }}>
        <div className="stat-number" style={{ fontSize: "6rem", fontWeight: 700, color: "var(--accent-primary)", lineHeight: 1, marginBottom: "1rem", opacity: 0.3 }}>
          404
        </div>
        <h1 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem" }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find what you need.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary">Go to Homepage</Link>
          <Link href="/services" className="btn-outline">Browse Services</Link>
        </div>
      </div>
    </section>
  );
}
