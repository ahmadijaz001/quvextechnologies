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

/**
 * Page-wide moving star backdrop for the home page.
 * Fixed-positioned so the same Canvas covers every section as the user scrolls,
 * mirroring the treatment used on /services.
 */
export default function HomeStarBackdrop() {
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
      <Service3DBackdrop accentColor="#d4af37" density="high" scale={0.65} />
    </div>
  );
}
