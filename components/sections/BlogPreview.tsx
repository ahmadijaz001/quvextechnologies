"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const posts = [
  {
    category: "ERP",
    title: "Odoo 18 vs SAP Business One: Which ERP Is Right for Your UAE Business?",
    excerpt: "A detailed comparison of pricing, features, customization, and UAE compliance across the two most popular mid-market ERP platforms in the GCC.",
    readTime: "8 min read",
    date: "Apr 10, 2026",
    href: "/blog/odoo-18-vs-sap-business-one-uae",
    color: "#00d4ff",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80&auto=format&fit=crop",
  },
  {
    category: "AI & Automation",
    title: "How Dubai SMEs Are Using AI Chatbots to Cut Support Costs by 60%",
    excerpt: "Real case studies from UAE businesses that deployed AI customer service agents.",
    readTime: "6 min read",
    date: "Apr 5, 2026",
    href: "/blog/ai-chatbots-uae-smes-cost-reduction",
    color: "#00e68a",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop",
  },
  {
    category: "Cybersecurity",
    title: "UAE Cybersecurity Law 2024: What Every Business Must Do",
    excerpt: "A plain-English guide to NESA, PDPL, and the new UAE Cybersecurity Council regulations.",
    readTime: "10 min read",
    date: "Mar 28, 2026",
    href: "/blog/uae-cybersecurity-law-2024-compliance-guide",
    color: "#ff4d6a",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&q=80&auto=format&fit=crop",
  },
];

export default function BlogPreview() {
  const { ref, isVisible } = useInView<HTMLElement>({ threshold: 0.05 });

  return (
    <section
      ref={ref}
      aria-labelledby="blog-heading"
      className="section-padding"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div
          className={`reveal reveal-up ${isVisible ? "in-view" : ""}`}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}
        >
          <div>
            <p className="label-tag" style={{ marginBottom: "0.75rem" }}>Latest Insights</p>
            <h2 id="blog-heading" className="headline-section">
              Knowledge That{" "}
              <span className="gradient-text">Drives Decisions</span>
            </h2>
          </div>
          <Link href="/blog" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", textDecoration: "none", fontSize: "0.9375rem", fontWeight: 500, borderBottom: "1px solid rgba(0,212,255,0.3)", paddingBottom: "2px" }}>
            All Articles <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Featured post + 2 smaller */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.5rem" }}>
          {/* Featured */}
          <Link
            href={posts[0].href}
            className={`reveal reveal-left ${isVisible ? "in-view" : ""}`}
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "1.25rem",
              overflow: "hidden",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              textDecoration: "none",
              transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${posts[0].color}35`; el.style.transform = "translateY(-5px)"; el.style.boxShadow = `0 24px 64px ${posts[0].color}10`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
              <Image src={posts[0].image} alt={posts[0].title} fill style={{ objectFit: "cover" }} sizes="60vw" />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, rgba(7,7,10,0.97) 100%)` }} />
              <span style={{ position: "absolute", top: 16, left: 16, padding: "0.25rem 0.75rem", borderRadius: "100px", background: `${posts[0].color}20`, border: `1px solid ${posts[0].color}40`, color: posts[0].color, fontSize: "0.6875rem", fontWeight: 600, backdropFilter: "blur(8px)" }}>
                {posts[0].category}
              </span>
            </div>
            <div style={{ padding: "1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.125rem", color: "var(--text-primary)", lineHeight: 1.35, marginBottom: "0.875rem" }}>{posts[0].title}</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.65, flex: 1, marginBottom: "1.25rem" }}>{posts[0].excerpt}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.8125rem", color: "var(--text-tertiary)" }}><Clock size={13} /> {posts[0].readTime}</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.875rem", color: posts[0].color, fontWeight: 600 }}>Read <ArrowUpRight size={14} /></span>
              </div>
            </div>
          </Link>

          {/* 2 smaller posts */}
          <div
            className={`reveal reveal-right ${isVisible ? "in-view" : ""}`}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {posts.slice(1).map((post, i) => (
              <Link
                key={post.href}
                href={post.href}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  flex: 1,
                  transition: "border-color 0.3s, transform 0.3s",
                }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = `${post.color}35`; el.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--border)"; el.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "relative", height: 120, overflow: "hidden" }}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} sizes="40vw" />
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, transparent 30%, rgba(7,7,10,0.97) 100%)` }} />
                  <span style={{ position: "absolute", top: 10, left: 10, padding: "0.2rem 0.625rem", borderRadius: "100px", background: `${post.color}20`, border: `1px solid ${post.color}40`, color: post.color, fontSize: "0.625rem", fontWeight: 600, backdropFilter: "blur(8px)" }}>
                    {post.category}
                  </span>
                </div>
                <div style={{ padding: "1.25rem", flex: 1 }}>
                  <h3 style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", lineHeight: 1.4, marginBottom: "0.75rem" }}>{post.title}</h3>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "0.25rem" }}><Clock size={11} /> {post.readTime}</span>
                    <span style={{ fontSize: "0.8125rem", color: post.color, fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}>Read <ArrowUpRight size={13} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section[aria-labelledby="blog-heading"] > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
