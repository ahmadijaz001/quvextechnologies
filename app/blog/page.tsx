"use client";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";

const posts = [
  { slug: "odoo-18-vs-sap-business-one-uae", category: "ERP", title: "Odoo 18 vs SAP Business One: Which ERP Is Right for Your UAE Business?", excerpt: "A detailed comparison of pricing, features, customization, and UAE compliance across the two most popular mid-market ERP platforms in the GCC.", readTime: "8 min", date: "Apr 10, 2026", color: "#00d4ff" },
  { slug: "ai-chatbots-uae-smes-cost-reduction", category: "AI & Automation", title: "How Dubai SMEs Are Using AI Chatbots to Cut Support Costs by 60%", excerpt: "Real case studies from UAE businesses that deployed AI customer service agents — and the surprising ROI they achieved within the first quarter.", readTime: "6 min", date: "Apr 5, 2026", color: "#00e68a" },
  { slug: "uae-cybersecurity-law-2024-compliance-guide", category: "Cybersecurity", title: "UAE Cybersecurity Law 2024: What Every Business Must Do Before the Deadline", excerpt: "A plain-English guide to NESA, PDPL, and the new UAE Cybersecurity Council regulations — and the specific technical controls your business needs in place.", readTime: "10 min", date: "Mar 28, 2026", color: "#ff4d6a" },
  { slug: "shopify-plus-arabic-rtl-guide", category: "eCommerce", title: "The Complete Guide to Arabic RTL Shopify Plus Stores in UAE", excerpt: "Everything you need to know about building a bilingual Arabic/English Shopify Plus store that converts Gulf customers.", readTime: "7 min", date: "Mar 20, 2026", color: "#7b2fff" },
  { slug: "odoo-wps-payroll-uae", category: "ERP", title: "Odoo WPS Payroll Setup for UAE: Step-by-Step Guide for 2026", excerpt: "Complete walkthrough of configuring Odoo payroll for UAE WPS compliance, SIF file generation, and MOL requirements.", readTime: "12 min", date: "Mar 15, 2026", color: "#00d4ff" },
  { slug: "google-ads-real-estate-uae", category: "Digital Marketing", title: "Google Ads for UAE Real Estate: The 2026 Strategy That's Actually Working", excerpt: "How Dubai property developers are generating qualified leads at AED 150-300 per lead using hyper-targeted Google and Meta campaigns.", readTime: "9 min", date: "Mar 8, 2026", color: "#c9a44c" },
];

const categories = ["All", "ERP", "AI & Automation", "Cybersecurity", "eCommerce", "Digital Marketing", "IT Infrastructure"];

export default function BlogPage() {
  return (
    <>
      <section style={{ paddingTop: "clamp(6rem,12vw,9rem)", paddingBottom: "4rem", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Insights & Resources</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Knowledge That <span className="gradient-text">Drives Decisions</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "560px", margin: "0 auto" }}>
            Expert analysis on technology trends, implementation guides, and business insights — written by practitioners, not content mills.
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ background: "var(--bg-primary)" }}>
        <div className="section-container">
          {/* Category filters */}
          <div style={{ display: "flex", gap: "0.625rem", flexWrap: "wrap", marginBottom: "3rem" }}>
            {categories.map((cat, i) => (
              <button
                key={cat}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "100px",
                  border: i === 0 ? "1px solid rgba(0,212,255,0.4)" : "1px solid var(--border)",
                  background: i === 0 ? "rgba(0,212,255,0.08)" : "var(--card-bg)",
                  color: i === 0 ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "all 0.2s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ display: "flex", flexDirection: "column", borderRadius: "1rem", background: "var(--card-bg)", border: "1px solid var(--border)", overflow: "hidden", textDecoration: "none", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${post.color}35`; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ height: i === 0 ? 180 : 120, background: `linear-gradient(135deg, ${post.color}12 0%, rgba(255,255,255,0.01) 100%)`, display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid var(--bg-tertiary)" }}>
                  <span style={{ fontSize: "2.5rem" }} aria-hidden="true">
                    {post.category === "ERP" ? "📊" : post.category === "AI & Automation" ? "🤖" : post.category === "Cybersecurity" ? "🔒" : post.category === "eCommerce" ? "🛍️" : post.category === "Digital Marketing" ? "📱" : "🖥️"}
                  </span>
                </div>
                <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.875rem" }}>
                    <span style={{ padding: "0.2rem 0.625rem", borderRadius: "100px", background: `${post.color}15`, color: post.color, fontSize: "0.6875rem", fontWeight: 600 }}>{post.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={11} /> {post.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9375rem", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: "0.75rem", flex: 1 }}>{post.title}</h2>
                  <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "1rem" }}>{post.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>{post.date}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem", color: "var(--accent-primary)", fontWeight: 500 }}>Read <ArrowUpRight size={13} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { section > div > div[style*="repeat(3"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
