"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, X } from "lucide-react";

const FAQS = [
  {
    id: 1,
    question: "How much does a consultation cost?",
    answer:
      "Our initial consultation is complimentary. We believe in transparent pricing and will provide a clear fee structure tailored to your specific legal needs during the consultation.",
  },
  {
    id: 2,
    question: "I live abroad. Can you still help me?",
    answer:
      "Absolutely. We regularly represent clients across multiple jurisdictions and conduct consultations via secure video conferencing. Distance is never a barrier to exceptional legal representation.",
  },
  {
    id: 3,
    question: "What if my issue is urgent?",
    answer:
      "We offer priority scheduling for urgent matters. Please contact us directly by phone and indicate the urgency — our team will ensure you receive immediate attention.",
  },
  {
    id: 4,
    question: "Do you work in different languages?",
    answer:
      "Yes. Our team assists clients in Sinhala, English, and Tamil. We make sure you fully understand every step of the process, without legal jargon or language barriers. Clear communication is at the heart of how we work.",
  },
  {
    id: 5,
    question: "Can you represent me in court?",
    answer:
      "Yes. Our attorneys are fully licensed to appear in all Sri Lankan courts, including the Supreme Court, Court of Appeal, and High Courts across the country.",
  },
  {
    id: 6,
    question: "How long does it take to resolve a case?",
    answer:
      "Resolution timelines vary significantly by case type and complexity. We will provide a realistic estimate during your consultation and keep you informed at every stage.",
  },
  {
    id: 7,
    question: "Is my information confidential?",
    answer:
      "Absolutely. All client communications and case details are protected by strict attorney-client privilege and our own confidentiality protocols.",
  },
  {
    id: 8,
    question: "Do you only work with large companies?",
    answer:
      "Not at all. We represent individuals, families, and businesses of all sizes. Every client receives the same level of dedicated, sophisticated representation.",
  },
];

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ── Shared accordion list ────────────────────────────────────────────────────
function AccordionList({
  openId,
  toggle,
}: {
  openId: number | null;
  toggle: (id: number) => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {FAQS.map((faq, i) => {
        const isOpen = openId === faq.id;
        return (
          <FadeIn key={faq.id} delay={0.04 + i * 0.04}>
            <div style={{ borderBottom: "1px solid rgba(38,23,12,0.1)" }}>
              <button
                onClick={() => toggle(faq.id)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  gap: "16px",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(14px, 1.1vw, 17px)",
                    fontWeight: isOpen ? 600 : 500,
                    color: isOpen ? "#26170C" : "#424846",
                    fontFamily: "'Cormorant Garamond', serif",
                    lineHeight: 1.3,
                    transition: "color 0.2s ease",
                  }}
                >
                  {faq.question}
                </span>
                <motion.div style={{ flexShrink: 0 }}>
                  {isOpen ? (
                    <X style={{ width: "16px", height: "16px", color: "#424846" }} />
                  ) : (
                    <Plus style={{ width: "16px", height: "16px", color: "rgba(66,72,70,0.5)" }} />
                  )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(13px, 1vw, 15px)",
                        color: "#525252",
                        lineHeight: 1.8,
                        paddingBottom: "20px",
                        paddingRight: "32px",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

// ── Shared inquiry card ──────────────────────────────────────────────────────
function InquiryCard() {
  return (
    <FadeIn delay={0.12}>
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.65)",
          border: "1px solid rgba(66,72,70,0.12)",
          borderRadius: "12px",
          padding: "24px 24px 20px",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(14px, 1.1vw, 17px)",
            fontWeight: 700,
            color: "#26170C",
            marginBottom: "10px",
          }}
        >
          Direct inquiry
        </h3>
        <p
          style={{
            fontSize: "clamp(12px, 0.92vw, 14px)",
            color: "#525252",
            lineHeight: 1.75,
            marginBottom: "20px",
          }}
        >
          Can't find the specific information you need? Our legal assistants are
          available for immediate screening.
        </p>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            letterSpacing: "0.18em",
            fontWeight: 700,
            color: "#26170C",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid rgba(38,23,12,0.3)",
            paddingBottom: "2px",
            transition: "color 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.target as HTMLAnchorElement;
            el.style.color = "#36735E";
            el.style.borderColor = "#36735E";
          }}
          onMouseLeave={(e) => {
            const el = e.target as HTMLAnchorElement;
            el.style.color = "#26170C";
            el.style.borderColor = "rgba(38,23,12,0.3)";
          }}
        >
          Contact Us →
        </a>
      </div>
    </FadeIn>
  );
}

// ── Root export ──────────────────────────────────────────────────────────────
export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(4);
  const toggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      style={{
        backgroundColor: "#F0EBE1",
        fontFamily: "'Cormorant Garamond', serif",
        padding: "80px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px)",
        }}
      >

        {/* ── MOBILE: stacked ── */}
        <div className="flex flex-col gap-10 md:hidden">
          {/* Header */}
          <div>
            <FadeIn>
              <span
                className="font-sf-pro-bold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  color: "#36735E",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Support Center
              </span>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h2
                style={{
                  fontSize: "clamp(26px, 7vw, 40px)",
                  fontWeight: 700,
                  color: "#26170C",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: "0",
                }}
              >
                You have questions. We have answers.
              </h2>
            </FadeIn>
          </div>

          {/* Accordion */}
          <AccordionList openId={openId} toggle={toggle} />

          {/* Inquiry card */}
          <InquiryCard />
        </div>

        {/* ── DESKTOP: original two-column grid ── */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "clamp(220px, 24vw, 320px) 1fr",
            gap: "clamp(32px, 6vw, 72px)",
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
                  letterSpacing: "0.3em",
                  fontWeight: 700,
                  color: "#36735E",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "20px",
                }}
              >
                Support Center
              </span>
            </FadeIn>
            <FadeIn delay={0.06}>
              <h2
                style={{
                  fontSize: "clamp(26px, 2.8vw, 44px)",
                  fontWeight: 700,
                  color: "#26170C",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginBottom: "36px",
                }}
              >
                You have questions. We have answers.
              </h2>
            </FadeIn>
            <InquiryCard />
          </div>

          {/* RIGHT */}
          <AccordionList openId={openId} toggle={toggle} />
        </div>

      </div>
    </section>
  );
}