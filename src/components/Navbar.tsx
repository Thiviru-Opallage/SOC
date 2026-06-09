"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "HOME", href: "#home" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string
  ) => {
    e.preventDefault();
    setActive(label);
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Background layer */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            backgroundColor: scrolled ? "rgba(224, 218, 208, 0.97)" : "#D8D1C5",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: "1px solid rgba(173, 138, 70, 0.18)",
            boxShadow: scrolled
              ? "0 1px 24px rgba(27, 58, 47, 0.08)"
              : "0 1px 0 rgba(173, 138, 70, 0.12)",
          }}
        />

        {/* Content layer */}
        <div
          className="relative z-10 mx-auto flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            height: "68px",
            padding: "0 clamp(24px, 5vw, 80px)",
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home", "HOME")}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* Scale emblem */}
            <div
              className="flex items-center justify-center rounded-full shrink-0 transition-colors duration-300"
              style={{
                width: "clamp(36px, 3vw, 44px)",
                height: "clamp(36px, 3vw, 44px)",
                border: "1.5px solid #AD8A46",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "clamp(16px, 1.4vw, 20px)", height: "clamp(16px, 1.4vw, 20px)" }}
              >
                <line x1="12" y1="3" x2="12" y2="21" stroke="#AD8A46" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="4" y1="7" x2="20" y2="7" stroke="#AD8A46" strokeWidth="1.2" strokeLinecap="round" />
                <line x1="6" y1="7" x2="4" y2="13" stroke="#AD8A46" strokeWidth="1" strokeLinecap="round" />
                <line x1="2" y1="7" x2="4" y2="13" stroke="#AD8A46" strokeWidth="1" strokeLinecap="round" />
                <path d="M2 13 Q4 15 6 13" stroke="#AD8A46" strokeWidth="1" fill="none" strokeLinecap="round" />
                <line x1="18" y1="7" x2="20" y2="13" stroke="#AD8A46" strokeWidth="1" strokeLinecap="round" />
                <line x1="22" y1="7" x2="20" y2="13" stroke="#AD8A46" strokeWidth="1" strokeLinecap="round" />
                <path d="M18 13 Q20 15 22 13" stroke="#AD8A46" strokeWidth="1" fill="none" strokeLinecap="round" />
                <line x1="9" y1="21" x2="15" y2="21" stroke="#AD8A46" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex flex-col leading-none">
              <span
                className="font-semibold tracking-[0.22em] text-[#1B3A2F] transition-colors duration-300 group-hover:text-[#AD8A46]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(13px, 1.1vw, 17px)",
                  letterSpacing: "0.22em",
                }}
              >
                SOC CONSULTANCY
              </span>
            </div>
          </a>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center" style={{ gap: "clamp(24px, 3vw, 48px)" }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.label)}
                className="relative group transition-colors duration-300"
                style={{
                  fontSize: "clamp(9px, 0.7vw, 11px)",
                  letterSpacing: "0.22em",
                  fontWeight: 700,
                  color: active === link.label ? "#1B3A2F" : "#1B3A2F99",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#1B3A2F] transition-all duration-300"
                  style={{
                    width: active === link.label ? "100%" : "0%",
                  }}
                />
                <span
                  className="absolute -bottom-1 left-0 h-px bg-[#1B3A2F]/50 transition-all duration-300 w-0 group-hover:w-full"
                  style={{ display: active === link.label ? "none" : "block" }}
                />
              </a>
            ))}

            {/* Consultation CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact", "CONTACT")}
              whileHover={{
                backgroundColor: "#AD8A46",
                color: "#EFE9E1",
                borderColor: "#AD8A46",
              }}
              transition={{ duration: 0.22 }}
              className="flex items-center justify-center text-[#AD8A46] cursor-pointer whitespace-nowrap"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(11px, 0.9vw, 14px)",
                letterSpacing: "0.14em",
                fontWeight: 500,
                border: "1px solid rgba(173, 138, 70, 0.55)",
                padding: "clamp(6px, 0.6vh, 9px) clamp(14px, 1.4vw, 22px)",
              }}
            >
              Consultation
            </motion.a>
          </nav>

          {/* ── Mobile hamburger — always visible, circular button ── */}
          <motion.button
            className="md:hidden flex items-center justify-center rounded-full shrink-0"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            whileTap={{ scale: 0.92 }}
            style={{
              width: "44px",
              height: "44px",
              backgroundColor: "#ffff",
              border: "none",
              flexShrink: 0,
            }}
          >
            {/* Two-line hamburger icon */}
            <div className="flex flex-col gap-1.25">
              <span
                className="block bg-black"
                style={{ width: "18px", height: "1.5px" }}
              />
              <span
                className="block bg-black"
                style={{ width: "18px", height: "1.5px" }}
              />
            </div>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Full-screen mobile overlay menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-100 md:hidden"
            style={{ backgroundColor: "#111810" }}
          >
            {/* Close button — circular, top-right */}
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute flex items-center justify-center rounded-full"
              style={{
                top: "20px",
                right: "20px",
                width: "48px",
                height: "48px",
                backgroundColor: "#EFE9E1",
                border: "none",
              }}
            >
              {/* X icon */}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <line x1="2" y1="2" x2="14" y2="14" stroke="#1B3A2F" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="14" y1="2" x2="2" y2="14" stroke="#1B3A2F" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>

            {/* Menu content */}
            <div
              className="flex flex-col justify-center h-full"
              style={{ padding: "0 clamp(32px, 8vw, 64px)" }}
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  color: "rgba(239, 233, 225, 0.4)",
                  marginBottom: "32px",
                  fontFamily: "'Cormorant Garamond', serif",
                  textTransform: "uppercase",
                }}
              >
                Navigation
              </motion.p>

              {/* Hairline separator */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: "1px",
                  backgroundColor: "rgba(173, 138, 70, 0.25)",
                  marginBottom: "40px",
                  transformOrigin: "left",
                }}
              />

              {/* Nav items */}
              <nav className="flex flex-col" style={{ gap: "0" }}>
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{
                      delay: 0.18 + i * 0.07,
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href, link.label)}
                      className="flex items-baseline gap-5 group"
                      style={{
                        padding: "14px 0",
                        borderBottom: "1px solid rgba(173, 138, 70, 0.1)",
                        textDecoration: "none",
                      }}
                    >
                      {/* Number */}
                      <span
                        style={{
                          fontSize: "11px",
                          color: "rgba(173, 138, 70, 0.6)",
                          letterSpacing: "0.08em",
                          fontFamily: "'Cormorant Garamond', serif",
                          minWidth: "24px",
                          fontWeight: 400,
                          lineHeight: 1,
                          paddingTop: "6px",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Label */}
                      <span
                        className="transition-colors duration-300"
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "clamp(44px, 12vw, 64px)",
                          fontWeight: 300,
                          letterSpacing: "-0.01em",
                          lineHeight: 1,
                          color:
                            active === link.label
                              ? "#AD8A46"
                              : "rgba(239, 233, 225, 0.9)",
                        }}
                      >
                        {link.label.charAt(0) + link.label.slice(1).toLowerCase()}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact", "CONTACT")}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="self-start mt-10"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  color: "#AD8A46",
                  border: "1px solid rgba(173, 138, 70, 0.4)",
                  padding: "10px 24px",
                  textDecoration: "none",
                  textTransform: "uppercase",
                }}
              >
                Book a Consultation
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}