"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface SienaParallaxProps {
  children: React.ReactNode;
}

/**
 * SienaParallax — Skiper29-style scroll reveal.
 *
 * BEHAVIOUR:
 * - On page load the content is FULLY VISIBLE at 100% size (no clipping).
 * - As the user scrolls DOWN through this section, the content gently
 *   scales DOWN and fades slightly — creating the "cinematic pull-away" feel.
 * - The next section then comes into view naturally underneath.
 *
 * This is the correct interpretation of the Siena effect:
 * the CURRENT section shrinks/recedes as you scroll away from it,
 * while the NEXT section reveals from below.
 *
 * The container must be `position: relative` for Framer Motion's
 * useScroll to correctly calculate scroll offsets.
 */
export default function SienaParallax({ children }: SienaParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Spring dampened scroll progress for mobile to absorb touch scroll jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Desktop transforms (raw scroll)
  const scaleDesktop = useTransform(scrollYProgress, [0, 1], [1.0, 0.92]);
  const opacityDesktop = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const borderRadiusDesktop = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0px", "20px"]
  );

  // Mobile transforms (spring smoothed scroll)
  const scaleMobile = useTransform(smoothProgress, [0, 1], [1.0, 0.92]);
  const opacityMobile = useTransform(smoothProgress, [0, 0.8], [1, 0.4]);
  const borderRadiusMobile = useTransform(
    smoothProgress,
    [0, 0.5],
    ["0px", "20px"]
  );

  // Apply mobile-only scroll-linked animation smoothing
  const scale = isMobile ? scaleMobile : scaleDesktop;
  const opacity = isMobile ? opacityMobile : opacityDesktop;
  const borderRadius = isMobile ? borderRadiusMobile : borderRadiusDesktop;

  // Scroll hint: fades out as soon as user starts scrolling (always smoothed on mobile)
  const hintOpacity = useTransform(
    isMobile ? smoothProgress : scrollYProgress,
    [0, 0.15],
    [1, 0]
  );

  if (isMobile) {
    return (
      <div ref={containerRef} className="relative w-full h-auto overflow-visible">
        {/* This div scales and fades as the section scrolls away */}
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
            transformOrigin: "center top",
            willChange: "transform, opacity",
          }}
          className="w-full h-auto"
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    // `relative` is REQUIRED — useScroll needs a non-static container
    // `h-[150vh]` gives scroll room while keeping the section visible at 100vh
    <div ref={containerRef} className="relative h-[150vh] isolate">

      {/* Sticky viewport — stays pinned while the container scrolls.
          Set overflow-hidden on all viewports to fix layout bleeding. */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* This div scales and fades as the section scrolls away */}
        <motion.div
          style={{
            scale,
            opacity,
            borderRadius,
            transformOrigin: "center top",
            willChange: "transform, opacity",
          }}
          className="w-full h-full"
        >
          {children}
        </motion.div>

      </div>
    </div>
  );
}