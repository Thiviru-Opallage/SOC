"use client";

import { motion, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import SienaParallax from "@/components/SienaParallax";
import { useState, useCallback } from "react";
import { preloadGLB } from "@/lib/preloadGLB";

// Kick off GLB fetch at module evaluation time
preloadGLB("/models/lady-justice-compressed.glb");

// Eagerly load the R3F chunk in parallel with text rendering
import("@/components/LadyJustice3D");

const LadyJustice3D = dynamic(() => import("@/components/LadyJustice3D"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

function HeroContent() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const handleModelLoaded = useCallback(() => setModelLoaded(true), []);

  return (
    <section
      id="home"
      className="relative w-full md:h-full bg-[#EFE9E1] overflow-x-hidden"
    >
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* ── SINGLE CANVAS ─────────────────────────────────────────────────────
          Mobile  → top strip, centered, fixed height
          Desktop → right half, below navbar, full remaining height
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        className="absolute z-20 pointer-events-none
          top-[100px] left-1/2 -translate-x-1/2 w-[80vw] max-w-[320px] h-[340px] pb-6 md:pb-0
          md:top-[68px] md:right-0 md:left-auto md:translate-x-0 md:w-[50%] md:bottom-0 md:h-auto md:max-w-none"
        style={{
          opacity: modelLoaded ? 1 : 0,
          transition: "opacity 1.1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <LadyJustice3D onLoaded={handleModelLoaded} />
      </div>

      {/* ── MOBILE TEXT (< md) ────────────────────────────────────────────── */}
      <div
        className="md:hidden flex flex-col items-center relative z-20"
        style={{ paddingTop: "440px", paddingBottom: "48px" }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center px-6 w-full"
          style={{ gap: "20px" }}
        >
          <motion.div variants={itemVariants} className="flex flex-col" style={{ gap: "2px" }}>
            <h1
              className="font-bold leading-[1.08] tracking-[-0.02em] text-[#1B3A2F]"
              style={{ fontSize: "clamp(28px, 8vw, 44px)" }}
            >
              The Standard of<br />Legal Excellence
            </h1>
            <h1
              className="font-bold leading-[1.08] tracking-[-0.01em] text-[#AD8A46]"
              style={{ fontSize: "clamp(28px, 8vw, 44px)", marginTop: "4px" }}
            >
              Counsel You<br />Can Trust
            </h1>
            <h1
              className="font-bold leading-[1.08] tracking-[-0.02em] text-[#1B3A2F]"
              style={{ fontSize: "clamp(28px, 8vw, 44px)" }}
            >
              Results You Can<br />Count On
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{ width: "40px", height: "1px", background: "#AD8A46" }}
          />

          <motion.p
            variants={itemVariants}
            className="text-[#1B3A2F]/60 leading-[1.75]"
            style={{ fontSize: "15px", maxWidth: "320px" }}
          >
            Deeply rooted in integrity and dedicated to your peace of mind.
            We provide the sophisticated representation your future deserves.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center w-full"
            style={{ gap: "16px", paddingTop: "8px" }}
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center bg-[#b59554] text-white uppercase font-bold tracking-[0.22em] cursor-pointer select-none"
              style={{
                fontSize: "11px",
                padding: "18px 32px",
                width: "100%",
                maxWidth: "320px",
                borderRadius: "9999px",
                WebkitAppearance: "none",
              }}
            >
              Schedule a Consultation
            </motion.a>

            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#1B3A2F]/50 uppercase font-semibold tracking-[0.22em] cursor-pointer flex items-center gap-2"
              style={{ fontSize: "11px" }}
            >
              Our Services <span>→</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* ── DESKTOP TEXT (md+) ────────────────────────────────────────────── */}
      <div
        className="hidden md:grid relative z-20"
        style={{
          gridTemplateColumns: "clamp(24px, 3.5vw, 80px) minmax(0, auto) minmax(0, 1fr)",
          alignItems: "center",
          paddingTop: "68px",
          height: "100%",
        }}
      >
        <div />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col"
          style={{ gap: "clamp(16px, 2.2vh, 28px)" }}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col"
            style={{ gap: "clamp(0px, 0.3vh, 4px)" }}
          >
            <h1
              className="font-bold leading-[1.06] tracking-[-0.02em] text-[#1B3A2F] whitespace-nowrap"
              style={{ fontSize: "clamp(28px, 3.6vw, 68px)" }}
            >
              The Standard of Legal Excellence
            </h1>
            <h1
              className="font-medium leading-[1.06] tracking-[-0.02em] text-[#AD8A46] whitespace-nowrap"
              style={{ fontSize: "clamp(28px, 3.6vw, 68px)" }}
            >
              Counsel You Can Trust
            </h1>
            <h1
              className="font-bold leading-[1.06] tracking-[-0.02em] text-[#1B3A2F] whitespace-nowrap"
              style={{ fontSize: "clamp(28px, 3.6vw, 68px)" }}
            >
              Results You Can Count On
            </h1>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-[#AD8A46]/40"
            style={{ width: "clamp(32px, 3vw, 52px)", height: "1px" }}
          />

          <motion.p
            variants={itemVariants}
            className="text-[#1B3A2F]/60 leading-[1.8]"
            style={{
              fontSize: "clamp(12px, 1.1vw, 16px)",
              maxWidth: "clamp(260px, 28vw, 440px)",
            }}
          >
            Deeply rooted in integrity and dedicated to your peace of mind.
            We provide the sophisticated representation your future deserves.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex items-center"
            style={{
              gap: "clamp(16px, 2vw, 28px)",
              paddingTop: "clamp(4px, 0.8vh, 12px)",
            }}
          >
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ backgroundColor: "#8c6e38" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center justify-center bg-[#b59554] text-white uppercase font-bold tracking-[0.22em] cursor-pointer select-none whitespace-nowrap"
              style={{
                fontSize: "clamp(9px, 0.75vw, 12px)",
                padding: "clamp(10px, 1.1vh, 16px) clamp(20px, 2.2vw, 36px)",
              }}
            >
              Schedule a Consultation
            </motion.a>

            <motion.a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ color: "#AD8A46" }}
              transition={{ duration: 0.2 }}
              className="text-[#1B3A2F]/45 uppercase font-medium tracking-[0.2em] cursor-pointer flex items-center group whitespace-nowrap"
              style={{
                fontSize: "clamp(9px, 0.75vw, 12px)",
                gap: "clamp(4px, 0.5vw, 8px)",
              }}
            >
              Our Services
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </motion.div>
        </motion.div>

        <div />
      </div>
    </section>
  );
}

export default function HeroSection() {
  return (
    <SienaParallax>
      <HeroContent />
    </SienaParallax>
  );
}