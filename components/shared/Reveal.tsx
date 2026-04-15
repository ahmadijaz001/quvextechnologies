"use client";
import { ReactNode, CSSProperties } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "scale" | "none";
  delay?: number;
  style?: CSSProperties;
  className?: string;
}

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  style,
  className = "",
}: RevealProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>({ threshold: 0.08 });

  const dirClass =
    direction === "up"    ? "reveal-up"    :
    direction === "left"  ? "reveal-left"  :
    direction === "right" ? "reveal-right" :
    direction === "scale" ? "reveal-scale" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${dirClass} ${isVisible ? "in-view" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
