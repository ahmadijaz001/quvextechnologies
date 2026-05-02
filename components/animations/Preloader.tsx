"use client";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const [hidden, setHidden] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    const timeout = setTimeout(() => {
      const overlay = overlayRef.current;
      if (overlay) {
        overlay.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        overlay.style.opacity = "0";
        overlay.style.transform = "scale(1.04)";
      }
      setTimeout(() => {
        setHidden(true);
        document.body.style.overflow = "";
      }, 650);
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      id="preloader"
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, background: "var(--bg-primary)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "2rem" }}
    >
      {/* aKross luxury mark — concentric gold rings + center jewel */}
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="aKross">
        <defs>
          <linearGradient id="akrossGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e6b0" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="100%" stopColor="#a8862a" />
          </linearGradient>
        </defs>
        <style>{`
          .preloader-ring {
            stroke-dasharray: 220;
            stroke-dashoffset: 220;
            animation: draw 1.4s cubic-bezier(.22,1,.36,1) forwards;
            transform-origin: 36px 36px;
          }
          .preloader-ring-inner {
            stroke-dasharray: 140;
            stroke-dashoffset: 140;
            animation: draw 1.4s cubic-bezier(.22,1,.36,1) 0.25s forwards;
            transform-origin: 36px 36px;
          }
          .preloader-jewel {
            opacity: 0;
            transform-origin: 36px 36px;
            animation: jewel 0.6s cubic-bezier(.22,1,.36,1) 1s forwards;
          }
          @keyframes draw  { to { stroke-dashoffset: 0; } }
          @keyframes jewel { 0% { opacity: 0; transform: scale(0.4) rotate(-90deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        `}</style>
        {/* Outer ring */}
        <circle className="preloader-ring" cx="36" cy="36" r="30" stroke="url(#akrossGold)" strokeWidth="1.25" fill="none" />
        {/* Inner ring */}
        <circle className="preloader-ring-inner" cx="36" cy="36" r="22" stroke="url(#akrossGold)" strokeWidth="0.75" fill="none" opacity="0.55" />
        {/* Center jewel — gold diamond */}
        <g className="preloader-jewel">
          <rect x="29" y="29" width="14" height="14" fill="url(#akrossGold)" transform="rotate(45 36 36)" rx="1" />
        </g>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.625rem" }}>
        <span style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif", fontWeight: 500, fontSize: "1.875rem", color: "var(--text-primary)", letterSpacing: "0.04em" }}>
          a<span style={{ color: "var(--gold-400)" }}>K</span>ross
        </span>
        <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 600, fontSize: "0.625rem", letterSpacing: "0.42em", textTransform: "uppercase", color: "var(--gold-300)" }}>
          Information Technology
        </span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-primary)",
                display: "block",
                animation: `bounce 1s ease ${i * 0.15}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
