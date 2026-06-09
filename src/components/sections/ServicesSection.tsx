"use client";

import { useState, useRef } from "react";
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

const SLOT_CONFIG = {
  left:   { x: "-84%", scale: 0.84, opacity: 0.6, zIndex: 15, rotate: 0, blur: 0 },
  center: { x: "0%",   scale: 1,    opacity: 1,   zIndex: 30, rotate: 0, blur: 0 },
  right:  { x: "84%",  scale: 0.84, opacity: 0.6, zIndex: 15, rotate: 0, blur: 0 },
} as const;

// ─── Shared section header ───────────────────────────────────────────────────
function SectionHeader() {
  return (
    <div className="text-center z-10 mb-8 md:mb-8" style={{ maxWidth: "640px", padding: "0 24px" }}>
      <div className="flex items-center justify-center gap-3 mb-4 md:mb-5">
        <span className="h-px w-7" style={{ backgroundColor: "rgba(54,115,94,0.35)" }} />
        <span className="font-sf-pro-bold" style={{ fontSize: "11px", letterSpacing: "0.32em", fontWeight: 700, color: "#36735E", textTransform: "uppercase" }}>
          Services
        </span>
        <span className="h-px w-7" style={{ backgroundColor: "rgba(54,115,94,0.35)" }} />
      </div>
      <h2
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 3.2vw, 44px)",
          fontWeight: 700,
          color: "#424846",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: "10px",
        }}
      >
        Your trusted legal services,
        <br />
        <span style={{ fontWeight: 500, color: "#B08A3E" }}>tailored for every need</span>
      </h2>
      <p style={{ fontSize: "clamp(12px, 1vw, 14px)", color: "#525252", lineHeight: 1.7 }}>
        Comprehensive legal support across corporate, personal, and litigation matters with a focus on clarity, protection, and results.
      </p>
    </div>
  );
}

// ─── Nav buttons (shared) ────────────────────────────────────────────────────
function NavButtons({ onAdvance, isAnimating }: { onAdvance: (dir: 1 | -1) => void; isAnimating: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      {([-1, 1] as const).map((dir) => (
        <motion.button
          key={dir}
          onClick={() => onAdvance(dir)}
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
  );
}

// ─── MOBILE: single-card swipeable carousel ──────────────────────────────────
function MobileCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const total = ALL_SERVICES.length;

  const touchStartX = useRef<number | null>(null);

  const advance = (dir: 1 | -1) => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + dir + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) advance(delta > 0 ? 1 : -1);
    touchStartX.current = null;
  };

  const card = ALL_SERVICES[activeIndex];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Card */}
      <div
        className="relative w-full"
        style={{ padding: "0 24px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence
          mode="wait"
          onExitComplete={() => setIsAnimating(false)}
        >
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
            transition={{ type: "spring", stiffness: 280, damping: 30, mass: 1.0 }}
            style={{ position: "relative" }}
          >
            <div
              style={{
                borderRadius: "24px",
                padding: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                background: "#FFFFFF",
                boxShadow: "0 20px 48px rgba(66,72,70,0.12), 0 4px 12px rgba(66,72,70,0.06)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              {/* Icon + slug */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(54,115,94,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <card.icon style={{ width: "20px", height: "20px", color: "#36735E" }} />
                </div>
                <span className="font-sf-pro-bold" style={{ fontSize: "11px", fontWeight: 700, color: "rgba(66,72,70,0.25)", letterSpacing: "0.06em" }}>
                  {card.slug.split(" // ")[0]}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "28px",
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
                  fontSize: "14px",
                  color: "#525252",
                  lineHeight: 1.75,
                }}
              >
                {card.description}
              </p>

              {/* Image — natural aspect ratio, no fixed height clipping */}
              {card.image && (
                <div
                  style={{
                    width: "100%",
                    // Use aspectRatio instead of fixed height so image never crops
                    aspectRatio: "16 / 7",
                    borderRadius: "14px",
                    overflow: "hidden",
                    backgroundColor: "rgba(66,72,70,0.04)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }}
                  />
                </div>
              )}

              {/* Swipe hint */}
              <p className="font-sf-pro-bold" style={{ fontSize: "11px", color: "rgba(66,72,70,0.3)", textAlign: "center", letterSpacing: "0.08em" }}>
                SWIPE TO EXPLORE
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: "6px", marginTop: "20px", marginBottom: "16px" }}>
        {ALL_SERVICES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              if (i === activeIndex || isAnimating) return;
              setDirection(i > activeIndex ? 1 : -1);
              setIsAnimating(true);
              setActiveIndex(i);
            }}
            animate={{ width: i === activeIndex ? 20 : 6, backgroundColor: i === activeIndex ? "#36735E" : "rgba(54,115,94,0.25)" }}
            transition={{ duration: 0.25 }}
            style={{ height: "6px", borderRadius: "3px", border: "none", cursor: "pointer", padding: 0 }}
            aria-label={`Go to service ${i + 1}`}
          />
        ))}
      </div>

      {/* Prev/Next */}
      <NavButtons onAdvance={advance} isAnimating={isAnimating} />
    </div>
  );
}

// ─── DESKTOP: 3-card fan, everything fits in one viewport ───────────────────
function DesktopCarousel() {
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

  const visibleSlots: { offset: -1 | 0 | 1; slot: "left" | "center" | "right" }[] = [
    { offset: -1, slot: "left" },
    { offset: 0, slot: "center" },
    { offset: 1, slot: "right" },
  ];

  return (
    <>
      <div
        className="relative w-full flex items-center justify-center"
        // Reduced height so header + cards + buttons all fit in ~100vh
        style={{ height: "clamp(340px, 38vw, 460px)" }}
      >
        <AnimatePresence mode="sync" onExitComplete={() => setIsAnimating(false)}>
          {visibleSlots.map(({ offset, slot }) => {
            const card = ALL_SERVICES[getIndex(offset)];
            const cfg = SLOT_CONFIG[slot];
            const isCenter = slot === "center";

            return (
              <motion.div
                key={card.id}
                initial={{
                  opacity: 0,
                  scale: 0.82,
                  x: direction > 0 ? "55%" : "-55%",
                  // No rotate on entry — it was causing the "pop" feel
                }}
                animate={{
                  opacity: cfg.opacity,
                  scale: cfg.scale,
                  x: cfg.x,
                  zIndex: cfg.zIndex,
                  rotate: cfg.rotate,
                  filter: `blur(${cfg.blur}px)`,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.82,
                  x: direction > 0 ? "-55%" : "55%",
                  // No rotate on exit either
                }}
                // Smoother: lower stiffness, higher damping, no overshoot
                transition={{
                  type: "spring",
                  stiffness: 140,
                  damping: 26,
                  mass: 1.0,
                  opacity: { duration: 0.2 },
                }}
                className="absolute"
                style={{
                  width: "clamp(240px, 21vw, 300px)",
                  cursor: isCenter ? "default" : "pointer",
                  transformOrigin: "center bottom",
                }}
                onClick={() => { if (!isCenter) advance(offset as 1 | -1); }}
              >
                <div
                  style={{
                    // Reduced card height to fit in viewport
                    height: "clamp(340px, 34vw, 420px)",
                    borderRadius: "28px",
                    padding: "clamp(20px, 1.8vw, 28px)",
                    display: "flex",
                    flexDirection: "column",
                    background: isCenter ? "#FFFFFF" : "rgba(255,255,255,0.7)",
                    boxShadow: isCenter
                      ? "0 28px 60px rgba(66,72,70,0.14), 0 4px 16px rgba(66,72,70,0.06)"
                      : "0 10px 28px rgba(66,72,70,0.07)",
                    backdropFilter: isCenter ? "none" : "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.75)",
                    overflow: "hidden",
                  }}
                >
                  {/* Icon + slug number */}
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexShrink: 0 }}>
                    <div
                      style={{
                        width: "clamp(36px, 3vw, 46px)",
                        height: "clamp(36px, 3vw, 46px)",
                        borderRadius: "50%",
                        backgroundColor: "rgba(54,115,94,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <card.icon style={{ width: "clamp(14px, 1.2vw, 18px)", height: "clamp(14px, 1.2vw, 18px)", color: "#36735E" }} />
                    </div>
                    {!isCenter && (
                      <div
                        className="font-sf-pro-bold"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          fontSize: "clamp(12px, 1.1vw, 15px)",
                          fontWeight: 700,
                          color: "rgba(66,72,70,0.18)",
                          lineHeight: 1.1,
                        }}
                      >
                        <span>{card.slug.split(" // ")[0][0]}</span>
                        <span>{card.slug.split(" // ")[0][1]}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div style={{ marginTop: "clamp(12px, 1.6vw, 22px)", flexShrink: 0 }}>
                    <h3
                      style={{
                        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                        fontSize: "clamp(17px, 1.6vw, 24px)",
                        fontWeight: 700,
                        color: "#424846",
                        lineHeight: 1.15,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                      fontSize: "clamp(10px, 0.8vw, 13px)",
                      color: "#525252",
                      lineHeight: 1.7,
                      marginTop: "clamp(8px, 0.8vw, 12px)",
                      flexShrink: 0,
                    }}
                  >
                    {card.description}
                  </p>

                  {/* Image — flex-grow: 1 fills the remaining height of the card,
                      eliminating the white space gap. */}
                  {card.image && (
                    <div
                      style={{
                        width: "100%",
                        borderRadius: "18px",
                        overflow: "hidden",
                        position: "relative",
                        marginTop: "clamp(16px, 1.8vw, 24px)",
                        backgroundColor: "rgba(66,72,70,0.04)",
                        flexGrow: 1,
                        flexShrink: 1,
                        minHeight: "120px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: "100%",
                          height: "100%",
                          // contain instead of cover — no cropping, image shows fully
                          objectFit: "contain",
                          padding: "6px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Nav arrows — directly below cards, no scroll needed */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px", zIndex: 10 }}>
        <NavButtons onAdvance={advance} isAnimating={isAnimating} />
      </div>
    </>
  );
}

// ─── Root export ─────────────────────────────────────────────────────────────
export default function ServicesCarousel() {
  return (
    // Reduced top padding so the whole section fits in ~100vh on desktop
    <div className="relative w-full flex flex-col items-center pt-10 md:pt-14 pb-4">
      <SectionHeader />

      {/* Mobile: single swipeable card */}
      <div className="w-full md:hidden mt-10 px-1">
        <MobileCarousel />
      </div>

      {/* Desktop: original 3-card fan */}
      <div className="hidden md:contents">
        <DesktopCarousel />
      </div>
    </div>
  );
}