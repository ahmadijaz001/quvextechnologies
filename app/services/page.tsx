"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { serviceCategories } from "@/lib/services-data";
import CTABanner from "@/components/sections/CTABanner";
import {
  ArrowUpRight, Database, Cloud, Megaphone, Bot, Server, Smartphone, Globe, Cable, Cpu,
} from "lucide-react";

const Service3DBackdrop = dynamic(() => import("@/components/services/Service3DBackdrop"), { ssr: false });

const categoryIconMap: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  Database,
  Cloud,
  Megaphone,
  Bot,
  Server,
  Smartphone,
  Globe,
  Cable,
  Cpu,
};

const visibleCategories = serviceCategories.filter(c => !c.excludeFromNav);


export default function ServicesHub() {
  return (
    <>
      {/* Page-wide moving star backdrop — fixed so the same Canvas covers
          every section as the user scrolls. One WebGL context, full reach. */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Service3DBackdrop accentColor="#00d4ff" density="high" />
      </div>

      {/* Hero */}
      <section
        className="svc-hero"
        style={{
          paddingTop: "clamp(6rem, 12vw, 9rem)",
          paddingBottom: "clamp(3rem, 6vw, 5rem)",
          background: "transparent",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          zIndex: 1,
          ["--accent" as never]: "#00d4ff",
        }}
      >
        <div aria-hidden="true" className="svc-hero-orb" style={{ top: "-20%", right: "-8%", width: "55vw", height: "55vw", maxWidth: 640, maxHeight: 640, background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)", animationDuration: "10s" }} />
        <div aria-hidden="true" className="svc-hero-orb" style={{ bottom: "-30%", left: "-5%", width: "40vw", height: "40vw", maxWidth: 460, maxHeight: 460, background: "radial-gradient(circle, rgba(123,47,255,0.10) 0%, transparent 65%)", animationDuration: "12s", animationDelay: "1.4s" }} />

        <div className="section-container" style={{ textAlign: "center" }}>
          <p className="label-tag" style={{ marginBottom: "1rem" }}>Everything You Need</p>
          <h1 className="headline-section" style={{ marginBottom: "1.25rem" }}>
            Comprehensive Technology{" "}
            <span className="gradient-text">Solutions</span>
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "600px", margin: "0 auto" }}>
            60+ individual services across {visibleCategories.length} technology pillars. Click any service to see full details — features, process, technologies, and pricing guidance.
          </p>
        </div>
      </section>

      {/* All categories */}
      {visibleCategories.map(category => (
        <section
          key={category.slug}
          id={category.slug}
          className="section-padding"
          style={{
            // Fully transparent so the moving star backdrop shows through at full
            // intensity, exactly like in the hero.
            background: "transparent",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Section divider — subtle gold gradient line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: 1,
              background: "linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.35) 50%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
          <div className="section-container" style={{ position: "relative", zIndex: 2 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2.5rem",
                flexWrap: "wrap",
                gap: "1.5rem",
                padding: "1.25rem 1.5rem",
                borderRadius: "1rem",
                background: "rgba(5,8,22,0.45)",
                backdropFilter: "blur(10px) saturate(140%)",
                border: "1px solid rgba(212,175,55,0.14)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flex: "1 1 320px" }}>
                {(() => {
                  const Icon = categoryIconMap[category.icon] ?? Database;
                  return (
                    <div
                      aria-hidden="true"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "1rem",
                        background: `linear-gradient(135deg, ${category.color}22, ${category.color}08)`,
                        border: `1px solid ${category.color}38`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: `0 0 20px ${category.color}22`,
                      }}
                    >
                      <Icon size={28} color={category.color} strokeWidth={1.7} />
                    </div>
                  );
                })()}
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      color: "var(--text-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {category.name}
                  </h2>
                  <p style={{ fontSize: "0.9375rem", color: "var(--text-secondary)", maxWidth: "520px" }}>
                    {category.description}
                  </p>
                </div>
              </div>
              <Link
                href={`/services/${category.slug}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.375rem",
                  padding: "0.625rem 1.25rem",
                  borderRadius: "0.5rem",
                  border: `1px solid ${category.color}30`,
                  color: category.color,
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = `${category.color}10`)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                View All {category.shortName} Services <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Service cards — compact list view */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0.875rem" }}>
              {category.services.map(service => (
                <Link
                  key={service.slug}
                  href={`/services/${category.slug}/${service.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.875rem",
                    padding: "1rem 1.25rem",
                    borderRadius: "0.75rem",
                    background: "rgba(5,8,22,0.55)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(212,175,55,0.14)",
                    textDecoration: "none",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${category.color}50`; (e.currentTarget as HTMLElement).style.background = "rgba(5,8,22,0.78)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(212,175,55,0.14)"; (e.currentTarget as HTMLElement).style.background = "rgba(5,8,22,0.55)"; }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>{service.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>{service.tagline}</div>
                  </div>
                  <ArrowUpRight size={14} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
    </>
  );
}
