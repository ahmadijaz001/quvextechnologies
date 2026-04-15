"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X, ArrowUpRight, CheckCircle2, Layers, ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services-data";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export default function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => setExpanded(prev => !prev);

  return (
    <div
      className="service-card"
      style={{
        animationDelay: `${index * 0.06}s`,
      }}
    >
      {/* Collapsed header — always visible */}
      <button
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={`service-${service.slug}`}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          padding: "1.75rem",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "1rem",
          textAlign: "left",
        }}
      >
        <div style={{ flex: 1 }}>
          {/* Category badge */}
          <span
            style={{
              display: "inline-block",
              marginBottom: "0.875rem",
              padding: "0.2rem 0.625rem",
              borderRadius: "100px",
              background: `${service.color}15`,
              color: service.color,
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {service.category}
          </span>

          <h3
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontWeight: 600,
              fontSize: "1rem",
              color: "var(--text-primary)",
              lineHeight: 1.35,
              marginBottom: "0.5rem",
            }}
          >
            {service.name}
          </h3>

          <p style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
            {service.tagline}
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
              marginTop: "1rem",
              fontSize: "0.8125rem",
              color: service.color,
              fontWeight: 500,
              opacity: expanded ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          >
            View Details <ChevronDown size={14} style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }} />
          </div>
        </div>
      </button>

      {/* Expanded panel */}
      <div
        id={`service-${service.slug}`}
        style={{
          maxHeight: expanded ? "2000px" : 0,
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            padding: "0 1.75rem 1.75rem",
            borderTop: "1px solid var(--bg-tertiary)",
          }}
        >
          {/* Close button */}
          <div style={{ display: "flex", justifyContent: "flex-end", padding: "0.875rem 0 1.25rem" }}>
            <button
              onClick={toggle}
              aria-label="Collapse service details"
              style={{ background: "none", border: "none", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.8125rem" }}
            >
              <X size={14} /> Close
            </button>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: "1.75rem" }}>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                lineHeight: 1.75,
              }}
            >
              {service.overview}
            </p>
          </div>

          {/* Features + Technologies */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.75rem" }}>
            {/* Features */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-tertiary)",
                  marginBottom: "0.875rem",
                }}
              >
                Key Features
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {service.features.map((f, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                    <CheckCircle2 size={14} style={{ color: service.color, flexShrink: 0, marginTop: "0.2rem" }} />
                    <span style={{ fontSize: "0.8375rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-tertiary)",
                  marginBottom: "0.875rem",
                }}
              >
                Technologies
              </h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "0.375rem",
                      background: "var(--bg-tertiary)",
                      border: "1px solid var(--border)",
                      fontSize: "0.75rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Process */}
          <div style={{ marginBottom: "1.75rem" }}>
            <h4
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-tertiary)",
                marginBottom: "0.875rem",
              }}
            >
              Our Process
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              {service.process.map((step, i) => (
                <div key={step} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.375rem",
                      padding: "0.375rem 0.875rem",
                      borderRadius: "0.375rem",
                      background: `${service.color}10`,
                      border: `1px solid ${service.color}25`,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.6875rem", color: service.color, fontWeight: 700 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>{step}</span>
                  </div>
                  {i < service.process.length - 1 && (
                    <ArrowRight size={12} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Target audience */}
          <div
            style={{
              padding: "1rem",
              borderRadius: "0.75rem",
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              marginBottom: "1.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem" }}>
              <Layers size={15} style={{ color: "var(--accent-secondary)", flexShrink: 0, marginTop: "0.15rem" }} />
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", marginBottom: "0.25rem" }}>
                  Who Is This For?
                </p>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{service.targetAudience}</p>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap" }}>
            <Link
              href={`/book-consultation?service=${service.slug}`}
              className="btn-primary"
              style={{ padding: "0.75rem 1.5rem", fontSize: "0.875rem" }}
            >
              Get a Quote
            </Link>
            <Link
              href={`/services/${service.categorySlug}/${service.slug}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                padding: "0.75rem 1.5rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: service.color,
                textDecoration: "none",
                border: `1px solid ${service.color}30`,
                borderRadius: "0.5rem",
                transition: "background 0.2s",
              }}
            >
              Full Service Page <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
