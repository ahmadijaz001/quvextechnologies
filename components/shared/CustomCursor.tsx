"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ringX = lerp(ringX, mouseX, 0.1);
      ringY = lerp(ringY, mouseY, 0.1);
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (ring) { ring.style.width = "56px"; ring.style.height = "56px"; ring.style.borderColor = "rgba(0,212,255,0.7)"; }
      if (dot) dot.style.transform = "translate(-50%,-50%) scale(0)";
    };
    const onLeaveLink = () => {
      if (ring) { ring.style.width = "36px"; ring.style.height = "36px"; ring.style.borderColor = "rgba(0,212,255,0.4)"; }
      if (dot) dot.style.transform = "translate(-50%,-50%) scale(1)";
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    const addListeners = () => {
      const links = document.querySelectorAll("a, button, [role='button'], input, textarea, select, label");
      links.forEach(el => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        id="cursor-dot"
        aria-hidden="true"
        style={{ position: "fixed", width: 8, height: 8, background: "var(--accent-primary)", borderRadius: "50%", pointerEvents: "none", zIndex: 99998, transform: "translate(-50%,-50%)", transition: "transform 0.15s" }}
      />
      <div
        ref={ringRef}
        id="cursor-ring"
        aria-hidden="true"
        style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(0,212,255,0.4)", borderRadius: "50%", pointerEvents: "none", zIndex: 99997, transform: "translate(-50%,-50%)", transition: "width 0.2s, height 0.2s, border-color 0.2s" }}
      />
    </>
  );
}
