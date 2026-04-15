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
      {/* Logo SVG with stroke animation */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          .preloader-path {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 1.2s ease forwards;
          }
          .preloader-path-2 {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw 1.2s ease 0.3s forwards;
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
        {/* Q shape */}
        <circle className="preloader-path" cx="28" cy="28" r="20" stroke="#00d4ff" strokeWidth="3" fill="none" />
        {/* Stylized tail of Q */}
        <line className="preloader-path-2" x1="42" y1="42" x2="56" y2="56" stroke="#00d4ff" strokeWidth="3" strokeLinecap="round" />
        {/* Inner highlight */}
        <circle cx="28" cy="28" r="6" fill="#00d4ff" opacity="0" style={{ animation: "fadeIn 0.3s ease 1.2s forwards" }} />
        <style>{`.preloader-path circle { animation: fadeIn 0.3s ease 1.2s forwards; } @keyframes fadeIn { to { opacity: 1; } }`}</style>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: "1.5rem", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
          Quvex Technologies
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
