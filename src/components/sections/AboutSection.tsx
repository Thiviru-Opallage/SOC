"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, Shield, ShieldCheck } from "lucide-react";

const VALUES = [
  {
    word: "LOYAL",
    body: "Unwavering dedication to the pursuit of excellence and unrelenting advocacy for our elite clientele globally.",
    position: "top-left",
  },
  {
    word: "INTEGRITY",
    body: "Absolute ethical standards form the bedrock of our practice, ensuring discretion in every high-stakes operation.",
    position: "top-right",
  },
  {
    word: "TRUST",
    body: "Built through generations of precise legal execution and the meticulous handling of complex multi-jurisdictional matters.",
    position: "bottom-left",
  },
  {
    word: "HONESTY",
    body: "Transparent strategic advice that cuts through complexity, providing clarity where it is needed most in legal landscapes.",
    position: "bottom-right",
  },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StatueImage() {
  return (
    <div
      style={{
        width: "clamp(280px, 38vw, 520px)",
        maxWidth: "100%",
        aspectRatio: "1018 / 961",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/about-us.png"
        alt="Lady Justice"
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          position: "relative",
          zIndex: 2,
          // mix-blend-mode: multiply makes solid black pixels transparent
          // when rendered over the cream #F0EBE1 section background,
          // revealing only the gold statue and laurel wreath
          mixBlendMode: "multiply",
          filter: "drop-shadow(0 20px 40px rgba(66,72,70,0.18))",
        }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    </div>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{ backgroundColor: "#F0EBE1", fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* ── PART 1: Header ── */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 24px 0", textAlign: "center" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <span style={{ height: "1px", width: "28px", backgroundColor: "rgba(54,115,94,0.4)", display: "block" }} />
            <span className="font-sf-pro-bold" style={{ fontSize: "11px", letterSpacing: "0.32em", fontWeight: 700, color: "#36735E", textTransform: "uppercase" }}>About Us</span>
            <span style={{ height: "1px", width: "28px", backgroundColor: "rgba(54,115,94,0.4)", display: "block" }} />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 700, color: "#424846", lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "28px" }}>
            Justice,{" "}
            <em style={{ color: "#B08A3E", fontStyle: "italic", fontWeight: 500 }}>Refined.</em>
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p style={{ fontSize: "clamp(14px, 1.1vw, 17px)", color: "#525252", lineHeight: 1.8, maxWidth: "660px", margin: "0 auto 56px" }}>
            SOC Consultancy was built on a quiet conviction — that the law, practiced with care,
            is one of the most humane crafts there is. For nearly four decades, we have represented
            the few who expect more: measured judgment, considered language, and the kind of advocacy
            that does not announce itself. It simply prevails.
          </p>
        </FadeIn>
      </div>

      {/* ── PART 2: Values — MOBILE ── */}
      <div className="block md:hidden" style={{ maxWidth: "600px", margin: "0 auto", padding: "0 24px 64px" }}>
        {/* Statue centered above grid */}
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <StatueImage />
          </div>
        </FadeIn>

        {/* 2×2 values grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>
          {VALUES.map((value, i) => {
            const isRight = i % 2 === 1;
            let IconComponent = CheckCircle;
            if (value.word === "LOYAL") IconComponent = ShieldCheck;
            else if (value.word === "INTEGRITY") IconComponent = ShieldCheck;

            return (
              <FadeIn key={value.word} delay={0.08 + i * 0.08}>
                <div
                  style={{
                    padding: "20px 16px",
                    textAlign: isRight ? "right" : "left",
                    borderTop: i >= 2 ? "1px solid rgba(66,72,70,0.08)" : "none",
                    borderLeft: isRight ? "1px solid rgba(66,72,70,0.08)" : "none",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: isRight ? "flex-end" : "flex-start", marginBottom: "8px" }}>
                    <IconComponent style={{ width: "18px", height: "18px", color: "#B08A3E" }} />
                  </div>
                  <h3
                    className="font-sf-pro-bold"
                    style={{
                      fontSize: "clamp(14px, 4vw, 18px)",
                      fontWeight: 700,
                      color: "#36735E",
                      letterSpacing: "0.06em",
                      marginBottom: "8px",
                      textTransform: "uppercase"
                    }}
                  >
                    {value.word}
                  </h3>
                  <p
                    style={{
                      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                      fontSize: "12px",
                      color: "#525252",
                      lineHeight: 1.7,
                      marginLeft: isRight ? "auto" : "0"
                    }}
                  >
                    {value.body}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* ── PART 2: Values — DESKTOP ── */}
      <div
        className="hidden md:grid"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 32px 80px",
          gridTemplateColumns: "1fr auto 1fr",
          gridTemplateRows: "1fr 1fr",
          gap: "0",
          alignItems: "center",
          minHeight: "560px",
        }}
      >
        {/* Center statue — spans both rows */}
        <div style={{ gridColumn: "2", gridRow: "1 / 3", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 clamp(24px, 4vw, 64px)" }}>
          <FadeIn><StatueImage /></FadeIn>
        </div>

        <FadeIn delay={0.1}><ValueBlock data={VALUES[0]} align="left" /></FadeIn>
        <FadeIn delay={0.15}><ValueBlock data={VALUES[1]} align="right" /></FadeIn>
        <FadeIn delay={0.2}><ValueBlock data={VALUES[2]} align="left" /></FadeIn>
        <FadeIn delay={0.25}><ValueBlock data={VALUES[3]} align="right" /></FadeIn>
      </div>

      {/* ── PART 3: Vision + Mission ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px 80px",
          borderTop: "1px solid rgba(66,72,70,0.10)",
        }}
      >
        {/* Mobile: stacked */}
        <div className="flex flex-col gap-10 md:hidden">
          {[
            {
              label: "OUR VISION",
              text: "To Be A Globally Acclaimed Legal Institution, Renowned For Pioneering Transformative Legal Excellence And Redefining The Frontiers Of Innovative Advocacy In The Modern World.",
            },
            {
              label: "OUR MISSION",
              text: "To Provide Exceptional, Tailor-Made Legal Solutions That Seamlessly Align With Our Clients' Unique Objectives, Delivered With Uncompromising Integrity, Profound Professionalism, And Distinguished Excellence.",
            },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div>
                <span className="font-sf-pro-bold" style={{ fontSize: "10px", letterSpacing: "0.3em", fontWeight: 700, color: "#36735E", textTransform: "uppercase", display: "block", marginBottom: "14px" }}>
                  {item.label}
                </span>
                <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(14px, 3.5vw, 18px)", fontWeight: 600, color: "#424846", lineHeight: 1.55, letterSpacing: "0.01em" }}>
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Desktop: side by side */}
        <div
          className="hidden md:grid"
          style={{ gridTemplateColumns: "1fr 1fr", gap: "clamp(32px, 6vw, 80px)" }}
        >
          {[
            {
              label: "OUR VISION",
              text: "To Be A Globally Acclaimed Legal Institution, Renowned For Pioneering Transformative Legal Excellence And Redefining The Frontiers Of Innovative Advocacy In The Modern World.",
            },
            {
              label: "OUR MISSION",
              text: "To Provide Exceptional, Tailor-Made Legal Solutions That Seamlessly Align With Our Clients' Unique Objectives, Delivered With Uncompromising Integrity, Profound Professionalism, And Distinguished Excellence.",
            },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div>
                <span className="font-sf-pro-bold" style={{ fontSize: "10px", letterSpacing: "0.3em", fontWeight: 700, color: "#36735E", textTransform: "uppercase", display: "block", marginBottom: "16px" }}>
                  {item.label}
                </span>
                <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(12px, 1vw, 16px)", fontWeight: 600, color: "#424846", lineHeight: 1.55, letterSpacing: "0.01em" }}>
                  {item.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueBlock({ data, align }: { data: (typeof VALUES)[0]; align: "left" | "right" }) {
  let IconComponent = CheckCircle;
  if (data.word === "LOYAL") IconComponent = ShieldCheck;
  else if (data.word === "INTEGRITY") IconComponent = ShieldCheck;

  return (
    <div style={{ textAlign: align, padding: "clamp(16px, 2.5vw, 32px)" }}>
      <div style={{ display: "flex", justifyContent: align === "right" ? "flex-end" : "flex-start", marginBottom: "10px" }}>
        <IconComponent style={{ width: "20px", height: "20px", color: "#B08A3E" }} />
      </div>
      <h3
        className="font-sf-pro-bold"
        style={{
          fontSize: "clamp(18px, 1.8vw, 26px)",
          fontWeight: 700,
          color: "#36735E",
          letterSpacing: "0.06em",
          marginBottom: "10px",
          textTransform: "uppercase"
        }}
      >
        {data.word}
      </h3>
      <p
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          fontSize: "clamp(11px, 0.75vw, 12.5px)",
          color: "#525252",
          lineHeight: 1.75,
          maxWidth: "260px",
          marginLeft: align === "right" ? "auto" : "0"
        }}
      >
        {data.body}
      </p>
    </div>
  );
}