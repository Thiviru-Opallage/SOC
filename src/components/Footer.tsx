"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const PRACTICE_AREAS = [
  "Litigation",
  "Corporate Law",
  "Family Law",
  "Intellectual Property",
  "Real Estate",
];

const FIRM_LINKS = ["Our Team", "Services", "About Us", "Contact"];

const linkStyle: React.CSSProperties = {
  fontSize: "clamp(12px, 1vw, 14px)",
  color: "rgba(239,233,225,0.55)",
  textDecoration: "none",
  display: "block",
  marginBottom: "12px",
  fontFamily: "'Cormorant Garamond', serif",
  cursor: "pointer",
  transition: "color 0.2s ease",
};

const columnHeadStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.26em",
  fontWeight: 700,
  color: "#EFE9E1",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "20px",
  fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "SF Pro", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        backgroundColor: "#26170C",
        fontFamily: "'Cormorant Garamond', serif",
        padding: "64px 0 0",
      }}
    >
      {/* Inject responsive grid styles */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: clamp(200px, 26vw, 320px) 1fr 1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          padding-bottom: 56px;
        }

        @media (max-width: 767px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 36px 20px;
            padding-bottom: 40px;
          }

          /* Logo + tagline spans all 3 cols */
          .footer-logo-col {
            grid-column: 1 / -1;
          }

          /* Each link col takes one of the 3 columns */
          .footer-practice-col,
          .footer-firm-col,
          .footer-location-col {
            grid-column: span 1;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >
        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* COL 1: Logo + tagline — full width on mobile */}
          <div className="footer-logo-col">
            <FadeIn>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      border: "1.5px solid #B08A3E",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ width: "18px", height: "18px" }}
                    >
                      <line x1="12" y1="3" x2="12" y2="21" stroke="#B08A3E" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="4" y1="7" x2="20" y2="7" stroke="#B08A3E" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="6" y1="7" x2="4" y2="13" stroke="#B08A3E" strokeWidth="1" strokeLinecap="round" />
                      <line x1="2" y1="7" x2="4" y2="13" stroke="#B08A3E" strokeWidth="1" strokeLinecap="round" />
                      <path d="M2 13 Q4 15 6 13" stroke="#B08A3E" strokeWidth="1" fill="none" strokeLinecap="round" />
                      <line x1="18" y1="7" x2="20" y2="13" stroke="#B08A3E" strokeWidth="1" strokeLinecap="round" />
                      <line x1="22" y1="7" x2="20" y2="13" stroke="#B08A3E" strokeWidth="1" strokeLinecap="round" />
                      <path d="M18 13 Q20 15 22 13" stroke="#B08A3E" strokeWidth="1" fill="none" strokeLinecap="round" />
                      <line x1="9" y1="21" x2="15" y2="21" stroke="#B08A3E" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </div>

                  <span
                    style={{
                      fontSize: "clamp(13px, 1.1vw, 16px)",
                      fontWeight: 600,
                      color: "#EFE9E1",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    SOC. CONSULTANCY
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "clamp(12px, 0.95vw, 14px)",
                    color: "rgba(239,233,225,0.55)",
                    lineHeight: 1.8,
                    maxWidth: "300px",
                  }}
                >
                  Trusted legal counsel built on a foundation of integrity and
                  excellence since 2000. Serving elite clients worldwide.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* COL 2: Practice Areas */}
          <div className="footer-practice-col">
            <FadeIn delay={0.08}>
              <div>
                <span style={columnHeadStyle}>Practice Areas</span>
                {PRACTICE_AREAS.map((area) => (
                  <a
                    key={area}
                    href="#services"
                    onClick={(e) => { e.preventDefault(); scrollTo("#services"); }}
                    style={linkStyle}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#E9C349")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(239,233,225,0.55)")}
                  >
                    {area}
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* COL 3: Firm */}
          <div className="footer-firm-col">
            <FadeIn delay={0.12}>
              <div>
                <span style={columnHeadStyle}>Firm</span>
                {FIRM_LINKS.map((link) => {
                  const href =
                    link === "Our Team" ? "#team"
                    : link === "Services" ? "#services"
                    : link === "About Us" ? "#about"
                    : "#contact";
                  return (
                    <a
                      key={link}
                      href={href}
                      onClick={(e) => { e.preventDefault(); scrollTo(href); }}
                      style={linkStyle}
                      onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#E9C349")}
                      onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(239,233,225,0.55)")}
                    >
                      {link}
                    </a>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          {/* COL 4: Location */}
          <div className="footer-location-col">
            <FadeIn delay={0.16}>
              <div>
                <span style={columnHeadStyle}>Location</span>
                <p
                  style={{
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    fontWeight: 600,
                    color: "#EFE9E1",
                    marginBottom: "8px",
                  }}
                >
                  Colombo
                </p>
                <p
                  style={{
                    fontSize: "clamp(12px, 0.95vw, 14px)",
                    color: "rgba(239,233,225,0.55)",
                    lineHeight: 1.75,
                  }}
                >
                  World Trade Center, Level 24,
                  <br />
                  Colombo 01
                </p>
              </div>
            </FadeIn>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          style={{
            borderTop: "1px solid rgba(239,233,225,0.08)",
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span
            className="font-sf-pro-bold"
            style={{
              fontSize: "11px",
              color: "rgba(239,233,225,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()} SOC Consultancy. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sf-pro-bold"
                style={{
                  fontSize: "11px",
                  color: "rgba(239,233,225,0.3)",
                  textDecoration: "none",
                  letterSpacing: "0.1em",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#E9C349")}
                onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "rgba(239,233,225,0.3)")}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}