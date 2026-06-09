"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const TEAM = [
  {
    id: 1,
    role: "FOUNDER",
    name: "LAL OPALLAGE",
    signature: "Lal Opallage",
    title: "ATTORNEY-AT-LAW",
    bio1:
      "Aurelia Legal redefines the boundaries of personal and professional advocacy. We provide a sanctuary for high-net-worth individuals navigating the complexities of high-stakes divorce and executive workplace disputes.",
    bio2:
      "Our methodology is rooted in absolute discretion and surgical intellectual precision, ensuring that your legacy and peace of mind remain unassailable.",
    imageRight: true,
  },
  {
    id: 2,
    role: "CO-FOUNDER",
    name: "SENAL OPALLAGE",
    signature: "Senal Opallage",
    title: "ATTORNEY-AT-LAW",
    bio1:
      "Aurelia Legal redefines the boundaries of personal and professional advocacy. We provide a sanctuary for high-net-worth individuals navigating the complexities of high-stakes divorce and executive workplace disputes.",
    bio2:
      "Our methodology is rooted in absolute discretion and surgical intellectual precision, ensuring that your legacy and peace of mind remain unassailable.",
    imageRight: false,
  },
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
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const initial =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
      ? { opacity: 0, x: 40 }
      : { opacity: 0, y: 28 };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function TeamSection() {
  return (
    <section
      id="team"
      style={{
        backgroundColor: "#F0EBE1",
        fontFamily: "'Cormorant Garamond', serif",
        padding: "80px 0",
      }}
    >
      {/* ── Section header ── */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 80px) 64px",
        }}
      >
        {/* Mobile: stacked */}
        <div className="flex flex-col gap-4 md:hidden">
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(22px, 6vw, 36px)",
                fontWeight: 800,
                color: "#424846",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Our Command
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.75 }}>
              We are a team dedicated to supporting you through every step, with
              clarity and compassion.
            </p>
          </FadeIn>
        </div>

        {/* Desktop: side-by-side */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
        >
          <FadeIn>
            <h2
              style={{
                fontSize: "clamp(22px, 2.5vw, 36px)",
                fontWeight: 800,
                color: "#424846",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              Our Command
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontSize: "clamp(13px, 1vw, 16px)",
                color: "#525252",
                lineHeight: 1.75,
                marginTop: "4px",
              }}
            >
              We are a team dedicated to supporting you through every step, with
              clarity and compassion.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* ── Team members ── */}
      {TEAM.map((member, idx) => (
        <div
          key={member.id}
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 clamp(24px, 5vw, 80px)",
            marginBottom: idx < TEAM.length - 1 ? "80px" : "0",
          }}
        >
          {/* ── MOBILE layout: image on top, text below ── */}
          <div className="flex flex-col gap-8 md:hidden">
            {/* Image */}
            <FadeIn direction="up">
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/3",
                  backgroundColor: "rgba(66,72,70,0.08)",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/team-${member.id}.jpg`}
                  alt={member.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            </FadeIn>

            {/* Text */}
            <FadeIn delay={0.08} direction="up">
              <span
                className="font-sf-pro-bold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontWeight: 700,
                  color: "#B08A3E",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "10px",
                }}
              >
                {member.role}
              </span>

              <h3
                style={{
                  fontSize: "clamp(28px, 8vw, 42px)",
                  fontWeight: 800,
                  color: "#424846",
                  letterSpacing: "0.03em",
                  lineHeight: 1,
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                {member.name}
              </h3>

              <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.8, marginBottom: "14px" }}>
                {member.bio1}
              </p>
              <p style={{ fontSize: "14px", color: "#525252", lineHeight: 1.8, marginBottom: "24px" }}>
                {member.bio2}
              </p>

              <div style={{ marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "28px",
                    fontStyle: "italic",
                    color: "#B08A3E",
                    fontWeight: 400,
                    fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                    letterSpacing: "0.02em",
                  }}
                >
                  {member.signature}
                </span>
              </div>

              <span
                className="font-sf-pro-bold"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontWeight: 600,
                  color: "rgba(66,72,70,0.45)",
                  textTransform: "uppercase",
                }}
              >
                {member.title}
              </span>
            </FadeIn>
          </div>

          {/* ── DESKTOP layout: original alternating grid ── */}
          <div
            className="hidden md:grid"
            style={{
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "start",
            }}
          >
            {/* TEXT BLOCK */}
            <div style={{ order: member.imageRight ? 1 : 2 }}>
              <FadeIn delay={0.05} direction={member.imageRight ? "left" : "right"}>
                <span
                  className="font-sf-pro-bold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    fontWeight: 700,
                    color: "#B08A3E",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "12px",
                  }}
                >
                  {member.role}
                </span>

                <h3
                  style={{
                    fontSize: "clamp(28px, 3.5vw, 52px)",
                    fontWeight: 800,
                    color: "#424846",
                    letterSpacing: "0.03em",
                    lineHeight: 1,
                    textTransform: "uppercase",
                    marginBottom: "24px",
                  }}
                >
                  {member.name}
                </h3>

                <p
                  style={{
                    fontSize: "clamp(12px, 0.95vw, 14px)",
                    color: "#525252",
                    lineHeight: 1.8,
                    marginBottom: "16px",
                  }}
                >
                  {member.bio1}
                </p>
                <p
                  style={{
                    fontSize: "clamp(12px, 0.95vw, 14px)",
                    color: "#525252",
                    lineHeight: 1.8,
                    marginBottom: "28px",
                  }}
                >
                  {member.bio2}
                </p>

                <div style={{ marginBottom: "12px" }}>
                  <span
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 32px)",
                      fontStyle: "italic",
                      color: "#B08A3E",
                      fontWeight: 400,
                      fontFamily: "'Dancing Script', 'Brush Script MT', cursive",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {member.signature}
                  </span>
                </div>

                <span
                  className="font-sf-pro-bold"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.28em",
                    fontWeight: 600,
                    color: "rgba(66,72,70,0.45)",
                    textTransform: "uppercase",
                  }}
                >
                  {member.title}
                </span>
              </FadeIn>
            </div>

            {/* IMAGE BLOCK */}
            <div style={{ order: member.imageRight ? 2 : 1 }}>
              <FadeIn delay={0.12} direction={member.imageRight ? "right" : "left"}>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "3/4",
                    backgroundColor: "rgba(66,72,70,0.08)",
                    borderRadius: "4px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/team-${member.id}.jpg`}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Divider between members */}
          {idx < TEAM.length - 1 && (
            <div
              style={{
                height: "1px",
                backgroundColor: "rgba(66,72,70,0.1)",
                marginTop: "80px",
              }}
            />
          )}
        </div>
      ))}
    </section>
  );
}