"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Briefcase, Users, Home, Gavel, BookOpen, Globe, Building2 } from "lucide-react";

const ALL_SERVICES = [
  {
    id: 1,
    slug: "01 // DEFENSE",
    title: "Criminal Defense",
    description:
      "Expertise in high-stakes criminal cases, bail applications, and complex appellate litigation. We stand beside you from arrest through acquittal.",
    icon: Scale,
    image: "/images/services/criminal-defense.webp",
  },
  {
    id: 2,
    slug: "02 // CORPORATE",
    title: "Corporate & Commercial Law",
    description:
      "Strategic counsel for business contracts, complex mergers, and global regulatory compliance. Your growth, protected at every stage.",
    icon: Briefcase,
    image: "/images/services/corporate-commercial-law.webp",
  },
  {
    id: 3,
    slug: "03 // FAMILY",
    title: "Family Law",
    description:
      "Compassionate representation for divorce, custody, adoption, and high-net-worth estate settlements. Protecting what matters most.",
    icon: Users,
    image: "/images/services/family-law.webp",
  },
  {
    id: 4,
    slug: "04 // REAL ESTATE",
    title: "Real Estate Law",
    description:
      "End-to-end legal support for property transactions, disputes, land acquisition, and conveyancing across all jurisdictions.",
    icon: Home,
    image: "/images/services/real-estate-law.webp",
  },
  {
    id: 5,
    slug: "05 // CIVIL",
    title: "Civil Litigation",
    description:
      "Decisive courtroom advocacy for disputes of all scales — from commercial claims to personal injury and professional negligence.",
    icon: Gavel,
    image: "/images/services/civil-litigation.webp",
  },
  {
    id: 6,
    slug: "06 // EMPLOYMENT",
    title: "Employment Law",
    description:
      "Workplace disputes, wrongful dismissal, contracts, and employee rights defended with rigour and strategy.",
    icon: BookOpen,
    image: "/images/services/employment-law.webp",
  },
  {
    id: 7,
    slug: "07 // INTELLECTUAL",
    title: "Intellectual Property",
    description:
      "Trademarks, copyrights, and patents secured and enforced to protect your creative and commercial assets.",
    icon: Globe,
    image: "/images/services/intellectual-property.webp",
  },
  {
    id: 8,
    slug: "08 // IMMIGRATION",
    title: "Immigration Law",
    description:
      "Visas, residency permits, citizenship applications, and complex deportation defence handled with precision and care.",
    icon: Building2,
    image: "/images/services/immigration-law.webp",
  },
];

export default function ServicesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = ALL_SERVICES.length;

  const getIndex = (offset: number) => (activeIndex + offset + total) % total;

  const advance = (dir: 1 | -1) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + dir + total) % total);
  };

  // Card dimensions
  const CENTER_W = 260;
  const CENTER_H = 380;
  const SIDE_W = 210;
  const SIDE_H = 300;
  // How many px of the side card peek out from behind the center card
  const SIDE_PEEK = 70;
  // x offset from center so side card peeks SIDE_PEEK px beyond center card edge
  const SIDE_X_OFFSET = CENTER_W / 2 + SIDE_PEEK - SIDE_W / 2;

  const visibleSlots: { offset: -1 | 0 | 1; slot: "left" | "center" | "right" }[] = [
    { offset: -1, slot: "left" },
    { offset: 0, slot: "center" },
    { offset: 1, slot: "right" },
  ];

  return (
    <div
      className="relative w-full flex flex-col"
      style={{
        paddingLeft: "clamp(24px, 5vw, 64px)",
        paddingRight: "clamp(24px, 5vw, 64px)",
        paddingTop: "48px",
        paddingBottom: "8px",
      }}
    >
      {/* ── Section header — LEFT aligned ───────────────────────────────── */}
      <div className="z-10 mb-10" style={{ maxWidth: "520px" }}>
        <div className="flex items-center gap-3 mb-5">
          <span className="h-px" style={{ width: "28px", backgroundColor: "rgba(54,115,94,0.35)" }} />
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.32em",
              fontWeight: 700,
              color: "#36735E",
              textTransform: "uppercase",
            }}
          >
            Services
          </span>
          <span className="h-px" style={{ width: "28px", backgroundColor: "rgba(54,115,94,0.35)" }} />
        </div>

        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(26px, 3.2vw, 46px)",
            fontWeight: 700,
            color: "#424846",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            marginBottom: "14px",
          }}
        >
          Your trusted legal services,
          <br />
          <span style={{ fontWeight: 500, color: "#B08A3E" }}>tailored for every need</span>
        </h2>

        <p style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#525252", lineHeight: 1.75 }}>
          Comprehensive legal support across corporate, personal, and litigation
          matters with a focus on clarity, protection, and results.
        </p>
      </div>

      {/* ── Card stage ──────────────────────────────────────────────────── */}
      {/*
       * Layout rules matching Image 1:
       * - All cards top-aligned (position absolute, top: 20px)
       * - Center card: taller (380px), full white, z-index 30
       * - Side cards: shorter (300px), slightly translucent white, z-index 10 — sit BEHIND center
       * - Side cards overlap center card — only SIDE_PEEK px visible on each side
       * - No rotation, no blur on any card
       */}
      <div
        className="relative w-full"
        style={{ height: `${CENTER_H + 60}px` }}
      >
        <AnimatePresence mode="popLayout" onExitComplete={() => setIsAnimating(false)}>
          {visibleSlots.map(({ offset, slot }) => {
            const card = ALL_SERVICES[getIndex(offset)];
            const isCenter = slot === "center";
            const isLeft = slot === "left";

            const cardW = isCenter ? CENTER_W : SIDE_W;
            const cardH = isCenter ? CENTER_H : SIDE_H;
            const xOffset = isCenter ? 0 : isLeft ? -SIDE_X_OFFSET : SIDE_X_OFFSET;
            const zIdx = isCenter ? 30 : 10;

            return (
              <motion.div
                key={card.id}
                layout
                initial={{
                  opacity: 0,
                  x: `calc(50% - ${cardW / 2}px + ${direction > 0 ? 340 : -340}px)`,
                  y: 16,
                }}
                animate={{
                  opacity: 1,
                  x: `calc(50% - ${cardW / 2}px + ${xOffset}px)`,
                  y: 0,
                  zIndex: zIdx,
                }}
                exit={{
                  opacity: 0,
                  x: `calc(50% - ${cardW / 2}px + ${direction > 0 ? -340 : 340}px)`,
                  y: 16,
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  opacity: { duration: 0.18 },
                }}
                className="absolute"
                style={{
                  top: "20px",
                  width: `${cardW}px`,
                  cursor: isCenter ? "default" : "pointer",
                }}
                onClick={() => {
                  if (!isCenter) advance(offset as 1 | -1);
                }}
              >
                <div
                  style={{
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                    borderRadius: "20px",
                    padding: isCenter ? "26px" : "18px",
                    display: "flex",
                    flexDirection: "column",
                    background: isCenter ? "#FFFFFF" : "rgba(255,255,255,0.85)",
                    boxShadow: isCenter
                      ? "0 16px 48px rgba(66,72,70,0.14), 0 2px 12px rgba(66,72,70,0.07)"
                      : "0 6px 20px rgba(66,72,70,0.08)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    overflow: "hidden",
                  }}
                >
                  {/* Top row: icon + slug label */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: isCenter ? "20px" : "12px" }}>
                    <div
                      style={{
                        width: isCenter ? "44px" : "34px",
                        height: isCenter ? "44px" : "34px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(54,115,94,0.09)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <card.icon
                        style={{
                          width: isCenter ? "18px" : "14px",
                          height: isCenter ? "18px" : "14px",
                          color: "#36735E",
                        }}
                      />
                    </div>

                    {/* Slug — side cards only */}
                    {!isCenter && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "rgba(66,72,70,0.18)",
                          lineHeight: 1.1,
                          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                          letterSpacing: "normal",
                        }}
                      >
                        <span>{card.slug.split(" // ")[0][0]}</span>
                        <span>{card.slug.split(" // ")[0][1]}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: isCenter ? "28px" : "18px",
                      fontWeight: 700,
                      color: "#424846",
                      lineHeight: 1.15,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: isCenter ? "13px" : "11px",
                      color: isCenter ? "#525252" : "rgba(82,82,82,0.75)",
                      lineHeight: 1.7,
                      marginTop: isCenter ? "0" : "10px",
                      flexGrow: 1,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Image */}
                  {card.image && (
                    <div
                      style={{
                        width: "100%",
                        height: isCenter ? "110px" : "80px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        position: "relative",
                        marginTop: "12px",
                        backgroundColor: "rgba(66,72,70,0.04)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
          zIndex: 10,
        }}
      >
        {/* Prev / Next buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {([-1, 1] as const).map((dir) => (
            <motion.button
              key={dir}
              onClick={() => advance(dir)}
              disabled={isAnimating}
              whileHover={{ backgroundColor: "#36735E", color: "#FFFFFF" }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2 }}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: "1px solid rgba(54,115,94,0.25)",
                background: "transparent",
                color: "#36735E",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={dir === -1 ? "Previous" : "Next"}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                {dir === -1 ? (
                  <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                ) : (
                  <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}