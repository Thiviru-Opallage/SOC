"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const REASONS = [
  "Plain-language communication.",
  "Always accessible — in person or online.",
  "Step-by-step guidance.",
  "Preventative mindset — not just damage control.",
];

function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const initial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0, y: 24 };
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function WhyUsSection() {
  const [imageError, setImageError] = useState(false);

  return (
    <section
      id="why-us"
      style={{
        backgroundColor: "#F0EBE1",
        fontFamily: "'Cormorant Garamond', serif",
        overflow: "hidden",
      }}
    >
      {/* ── Balance scale image (centered) ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "56px 32px 40px",
        }}
      >
        <FadeIn>
          <div
            style={{
              width: "clamp(220px, 38vw, 480px)",
              height: "clamp(180px, 32vw, 400px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {imageError ? (
              <svg viewBox="0 0 120 120" width="200" height="200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="60" y1="10" x2="60" y2="110" stroke="#B08A3E" strokeWidth="3" strokeLinecap="round"/>
                <line x1="20" y1="30" x2="100" y2="30" stroke="#B08A3E" strokeWidth="3" strokeLinecap="round"/>
                <line x1="30" y1="30" x2="18" y2="60" stroke="#B08A3E" strokeWidth="2" strokeLinecap="round"/>
                <line x1="10" y1="30" x2="18" y2="60" stroke="#B08A3E" strokeWidth="2" strokeLinecap="round"/>
                <path d="M8 60 Q18 68 28 60" stroke="#B08A3E" strokeWidth="2" fill="rgba(176,138,62,0.15)" strokeLinecap="round"/>
                <line x1="90" y1="30" x2="102" y2="60" stroke="#B08A3E" strokeWidth="2" strokeLinecap="round"/>
                <line x1="110" y1="30" x2="102" y2="60" stroke="#B08A3E" strokeWidth="2" strokeLinecap="round"/>
                <path d="M92 60 Q102 68 112 60" stroke="#B08A3E" strokeWidth="2" fill="rgba(176,138,62,0.15)" strokeLinecap="round"/>
                <line x1="48" y1="110" x2="72" y2="110" stroke="#B08A3E" strokeWidth="3" strokeLinecap="round"/>
                <circle cx="60" cy="30" r="4" fill="#B08A3E"/>
              </svg>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src="/images/balance-scale.webp"
                alt="Balance of Justice"
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 12px 32px rgba(66,72,70,0.15))",
                }}
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </FadeIn>
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px) 80px",
        }}
      >
        {/* ── MOBILE: single column ── */}
        <div className="flex flex-col gap-8 md:hidden">
          {/* Left block */}
          <div>
            <FadeIn>
              <span
                className="font-sf-pro-bold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontWeight: 700,
                  color: "#36735E",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Why People Choose Us
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2
                style={{
                  fontSize: "clamp(26px, 7vw, 40px)",
                  fontWeight: 700,
                  color: "#424846",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: "20px",
                }}
              >
                More than lawyers, We are your partner through complexity.
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(66,72,70,0.08)",
                  borderRadius: "8px",
                  padding: "16px 20px",
                  marginBottom: "24px",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "#525252",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  In an era of increasing volatility, legal clarity is no longer
                  a luxury — it is a necessity.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  backgroundColor: "#36735E",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  cursor: "pointer",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                View Practice Areas
              </a>
            </FadeIn>
          </div>

          {/* Reasons list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {REASONS.map((reason, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "18px 0",
                    borderBottom:
                      i < REASONS.length - 1
                        ? "1px solid rgba(66,72,70,0.1)"
                        : "none",
                  }}
                >
                  <span
                    className="font-sf-pro-bold"
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "rgba(66,72,70,0.35)",
                      flexShrink: 0,
                      marginTop: "1px",
                      minWidth: "16px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "#424846",
                      lineHeight: 1.4,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {reason}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: original two-column grid ── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <div>
            <FadeIn>
              <span
                className="font-sf-pro-bold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontWeight: 700,
                  color: "#36735E",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Why People Choose Us
              </span>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h2
                style={{
                  fontSize: "clamp(28px, 3.2vw, 52px)",
                  fontWeight: 700,
                  color: "#424846",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                  marginBottom: "28px",
                }}
              >
                More than lawyers, We are your partner through complexity.
              </h2>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(66,72,70,0.08)",
                  borderRadius: "8px",
                  padding: "20px 24px",
                  marginBottom: "28px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(12px, 0.95vw, 14px)",
                    color: "#525252",
                    lineHeight: 1.8,
                    fontStyle: "italic",
                  }}
                >
                  In an era of increasing volatility, legal clarity is no longer
                  a luxury — it is a necessity.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  backgroundColor: "#36735E",
                  color: "#FFFFFF",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "background-color 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.backgroundColor = "#2a5a4a")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.backgroundColor = "#36735E")
                }
              >
                View Practice Areas
              </a>
            </FadeIn>
          </div>

          {/* RIGHT — numbered list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0",
              paddingTop: "clamp(40px, 5vw, 80px)",
            }}
          >
            {REASONS.map((reason, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "20px",
                    padding: "20px 0",
                    borderBottom:
                      i < REASONS.length - 1
                        ? "1px solid rgba(66,72,70,0.1)"
                        : "none",
                  }}
                >
                  <span
                    className="font-sf-pro-bold"
                    style={{
                      fontSize: "clamp(12px, 1vw, 15px)",
                      fontWeight: 600,
                      color: "rgba(66,72,70,0.35)",
                      flexShrink: 0,
                      marginTop: "1px",
                      fontVariantNumeric: "tabular-nums",
                      minWidth: "16px",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: "clamp(14px, 1.2vw, 18px)",
                      fontWeight: 600,
                      color: "#424846",
                      lineHeight: 1.4,
                      letterSpacing: "-0.005em",
                    }}
                  >
                    {reason}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}