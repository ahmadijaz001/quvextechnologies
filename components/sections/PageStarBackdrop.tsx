"use client";
import dynamic from "next/dynamic";

const Service3DBackdrop = dynamic(
  () => import("@/components/services/Service3DBackdrop"),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "transparent",
        }}
      />
    ),
  }
);

interface Props {
  accentColor?: string;
  density?: "low" | "medium" | "high";
  scale?: number;
}

/**
 * Page-wide moving star backdrop.
 * Fixed-positioned so a single Canvas covers every section as the user scrolls.
 * Use together with the `cosmic-page` class so section backgrounds become
 * transparent and the stars show through at full intensity.
 */
export default function PageStarBackdrop({
  accentColor = "#d4af37",
  density = "high",
  scale = 0.65,
}: Props = {}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Service3DBackdrop accentColor={accentColor} density={density} scale={scale} />
    </div>
  );
}
