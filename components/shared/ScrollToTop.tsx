"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "5.5rem",
        right: "2rem",
        width: 44,
        height: 44,
        borderRadius: "0.5rem",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "var(--text-secondary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9989,
        transition: "background 0.2s, color 0.2s, transform 0.2s",
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,212,255,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--accent-primary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
    >
      <ChevronUp size={18} />
    </button>
  );
}
