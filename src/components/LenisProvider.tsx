"use client";

import { useEffect } from "react";

/**
 * LenisProvider — Initialises Lenis smooth scrolling once, globally.
 *
 * This must live in layout.tsx so it runs once for the entire app.
 * Never initialise Lenis inside individual section components — doing
 * so would create multiple conflicting Lenis instances.
 *
 * lerp: 0.08 → the "weight" of the scroll. Lower = heavier/smoother.
 * smoothWheel: true → interpolates mouse wheel events.
 */
export default function LenisProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let rafId: number;

    const init = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        lerp: 0.08,         // smoothness — 0.08 feels premium and weighty
        smoothWheel: true,  // smooth mouse wheel
      });

      const raf = (time: number) => {
        lenis!.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    init();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  // This component only handles the side-effect — renders children as-is
  return <>{children}</>;
}