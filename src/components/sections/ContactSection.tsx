"use client";

import { useState, useRef } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowRight, Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";

const C = {
  bg: "#EFE9E1",
  border: "rgba(66,72,70,0.12)",
  borderMid: "rgba(66,72,70,0.22)",
  gold: "#B08A3E",
  goldLight: "#E9C349",
  text: "#26170C",
  textMuted: "rgba(38,23,12,0.55)",
  textFaint: "rgba(38,23,12,0.35)",
  green: "#36735E",
  greenLight: "rgba(54,115,94,0.10)",
  greenBorder: "rgba(54,115,94,0.30)",
  mapBg: "#1A1108",
  mapGrid: "rgba(176,138,62,0.08)",
  mapStreet: "rgba(176,138,62,0.16)",
};

function FadeIn({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function InteractiveMap() {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-60, 60], [6, -6]);
  const rotateY = useTransform(mouseX, [-60, 60], [-6, 6]);
  const springX = useSpring(rotateX, { stiffness: 280, damping: 32 });
  const springY = useSpring(rotateY, { stiffness: 280, damping: 32 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isExpanded) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const MAPS_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9383!2d79.8558!3d6.9243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597e6a000001%3A0x0!2sHulftsdorp%20St%2C%20Colombo%2012%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1716000000000";

  const DIRECTIONS_URL =
    "https://www.google.com/maps/dir/?api=1&destination=Hulfsdorp,+Colombo+12,+Sri+Lanka";

  return (
    <div style={{ perspective: "1200px" }}>
      <motion.div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <motion.div
          style={{
            rotateX: isExpanded ? 0 : springX,
            rotateY: isExpanded ? 0 : springY,
            transformStyle: "preserve-3d",
            position: "relative",
            overflow: "hidden",
            borderRadius: "6px",
            border: "1px solid rgba(176,138,62,0.25)",
            boxShadow: "0 8px 40px rgba(38,23,12,0.12)",
          }}
          animate={{ height: isExpanded ? 360 : 172 }}
          transition={{ type: "spring", stiffness: 340, damping: 36 }}
        >
          <AnimatePresence>
            {!isExpanded && (
              <motion.div key="collapsed-bg" style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div style={{ position: "absolute", inset: 0, backgroundColor: C.mapBg }} />
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 }} preserveAspectRatio="none">
                  {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
                    <g key={v}>
                      <line x1={`${v}%`} y1="0%" x2={`${v}%`} y2="100%" stroke={C.gold} strokeWidth="0.5" />
                      <line x1="0%" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke={C.gold} strokeWidth="0.5" />
                    </g>
                  ))}
                </svg>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.14 }} preserveAspectRatio="none">
                  <line x1="0%" y1="45%" x2="100%" y2="45%" stroke={C.gold} strokeWidth="3" />
                  <line x1="0%" y1="65%" x2="100%" y2="65%" stroke={C.gold} strokeWidth="1.5" />
                  <line x1="38%" y1="0%" x2="38%" y2="100%" stroke={C.gold} strokeWidth="2.5" />
                  <line x1="65%" y1="0%" x2="65%" y2="100%" stroke={C.gold} strokeWidth="1.5" />
                  <line x1="0%" y1="25%" x2="100%" y2="25%" stroke={C.gold} strokeWidth="1" />
                  <line x1="18%" y1="0%" x2="18%" y2="100%" stroke={C.gold} strokeWidth="1" />
                  <line x1="82%" y1="0%" x2="82%" y2="100%" stroke={C.gold} strokeWidth="1" />
                </svg>
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(176,138,62,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isExpanded && (
              <motion.div key="map-iframe" style={{ position: "absolute", inset: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <iframe src={MAPS_EMBED} width="100%" height="100%" style={{ border: 0, display: "block", filter: "grayscale(20%) contrast(1.05)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Hulfsdorp, Colombo 12 — SOC Consultancy location" />
                <motion.a href={DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  style={{ position: "absolute", bottom: "52px", right: "14px", display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 16px", backgroundColor: C.green, color: "#fff", textDecoration: "none", fontSize: "11px", letterSpacing: "0.18em", fontWeight: 700, textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", borderRadius: "3px", boxShadow: "0 4px 20px rgba(0,0,0,0.3)", zIndex: 10 }}
                  whileHover={{ backgroundColor: "#2a5e4c", scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <ExternalLink style={{ width: "12px", height: "12px" }} />
                  Get Directions
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!isExpanded && (
              <motion.div key="pin" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -56%)", zIndex: 10 }} initial={{ scale: 0, y: -10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 380, damping: 22, delay: 0.15 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <motion.div style={{ position: "absolute", width: "52px", height: "52px", borderRadius: "50%", border: "1px solid rgba(176,138,62,0.5)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }} />
                  <motion.div style={{ position: "absolute", width: "34px", height: "34px", borderRadius: "50%", border: "1px solid rgba(176,138,62,0.35)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} animate={{ scale: [1, 1.55, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut", delay: 0.55 }} />
                  <svg width="26" height="32" viewBox="0 0 28 34" fill="none">
                    <path d="M14 0C6.268 0 0 6.268 0 14c0 9.333 14 20 14 20S28 23.333 28 14C28 6.268 21.732 0 14 0z" fill={C.gold} />
                    <circle cx="14" cy="14" r="5" fill={C.mapBg} />
                    <circle cx="14" cy="14" r="2.5" fill={C.gold} opacity="0.6" />
                  </svg>
                  <div style={{ width: "10px", height: "4px", background: "radial-gradient(ellipse, rgba(0,0,0,0.45) 0%, transparent 100%)", borderRadius: "50%", marginTop: "-2px" }} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 18px 14px", background: isExpanded ? "linear-gradient(to top, rgba(20,14,8,0.9) 0%, transparent 100%)" : "linear-gradient(to top, rgba(20,14,8,0.96) 0%, rgba(20,14,8,0.4) 60%, transparent 100%)", zIndex: 5, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <span className="font-sf-pro-bold" style={{ display: "block", fontSize: "10px", letterSpacing: "0.28em", color: "rgba(176,138,62,0.65)", textTransform: "uppercase", fontWeight: 700, marginBottom: "3px" }}>Our Location</span>
              <span style={{ display: "block", fontSize: "15px", color: "#F0EBE1", fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, letterSpacing: "0.02em" }}>Hulfsdorp, Colombo 12</span>
            </div>
            <motion.button onClick={() => setIsExpanded((p) => !p)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 13px", backgroundColor: "transparent", border: `1px solid ${isExpanded ? "rgba(54,115,94,0.5)" : "rgba(176,138,62,0.3)"}`, borderRadius: "20px", cursor: "pointer" }} whileHover={{ backgroundColor: isExpanded ? "rgba(54,115,94,0.2)" : "rgba(176,138,62,0.15)" }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", backgroundColor: isExpanded ? C.green : C.gold }} />
              <span className="font-sf-pro-bold" style={{ fontSize: "10px", color: isExpanded ? "#6bbfa3" : "rgba(176,138,62,0.9)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>{isExpanded ? "Collapse" : "Expand Map"}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value, sub, href, delay }: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; label: string; value: string; sub?: string; href?: string | null; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }} whileHover={href ? { y: -1 } : {}}
      style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "16px 0", borderBottom: `1px solid ${C.border}`, cursor: href ? "pointer" : "default" }}
      onClick={() => href && window.open(href, "_blank")}>
      <div style={{ width: "36px", height: "36px", border: `1px solid ${C.greenBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, backgroundColor: C.greenLight }}>
        <Icon style={{ width: "14px", height: "14px", color: C.green }} />
      </div>
      <div>
        <span className="font-sf-pro-bold" style={{ display: "block", fontSize: "10px", letterSpacing: "0.24em", color: "rgba(176,138,62,0.7)", textTransform: "uppercase", fontWeight: 700, marginBottom: "3px" }}>{label}</span>
        <span style={{ display: "block", fontSize: "16px", color: C.text, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, lineHeight: 1.3 }}>{value}</span>
        {sub && <span style={{ display: "block", fontSize: "12px", color: C.textFaint, fontFamily: "'Cormorant Garamond', serif", marginTop: "2px" }}>{sub}</span>}
      </div>
    </motion.div>
  );
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label className="font-sf-pro-bold" style={{ fontSize: "10px", letterSpacing: "0.24em", fontWeight: 700, color: "rgba(176,138,62,0.75)", textTransform: "uppercase" }}>{label}</label>
      {children}
      {error && <span className="font-sf-pro-bold" style={{ fontSize: "10px", color: "#ef4444", marginTop: "2px" }}>{error}</span>}
    </div>
  );
}

function GoldRule({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} style={{ height: "1px", background: `linear-gradient(to right, ${C.gold}55, transparent)` }} initial={{ scaleX: 0, originX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }} />
  );
}

export default function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    area: "",
    date: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    
    const sanitize = (val: string) => val.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

    const sanitizedData = {
      first: sanitize(formData.first),
      last: sanitize(formData.last),
      email: sanitize(formData.email),
      phone: sanitize(formData.phone),
      area: formData.area,
      date: formData.date,
      message: sanitize(formData.message),
    };

    if (!sanitizedData.first) newErrors.first = "First name is required";
    if (!sanitizedData.last) newErrors.last = "Last name is required";
    if (!sanitizedData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!sanitizedData.phone) newErrors.phone = "Phone number is required";
    if (!sanitizedData.area) newErrors.area = "Please select an area of law";
    if (!sanitizedData.date) {
      newErrors.date = "Preferred date is required";
    } else {
      const selectedDate = new Date(sanitizedData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Date cannot be in the past";
      }
    }
    if (!sanitizedData.message) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setSubmitted(true);
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid rgba(66,72,70,0.18)`,
    padding: "11px 0",
    fontSize: "16px",
    color: C.text,
    fontFamily: "'Cormorant Garamond', serif",
    outline: "none",
    transition: "border-color 0.22s ease",
    letterSpacing: "0.01em",
    boxSizing: "border-box",
  };

  const getInput = (name: string): React.CSSProperties => ({
    ...inputBase,
    borderBottomColor: errors[name] ? "#ef4444" : (focused === name ? C.green : "rgba(66,72,70,0.18)"),
  });

  const INFO_ITEMS = [
    { icon: Mail, label: "Email Us", value: "socconsultancy@gmail.com", href: "mailto:socconsultancy@gmail.com" },
    { icon: Phone, label: "Call Us", value: "011 211 395", href: "tel:011211395" },
    { icon: MapPin, label: "Visit Us", value: "Hulfsdorp, Colombo 12", href: "https://maps.google.com?q=Hulfsdorp,+Colombo+12" },
    { icon: Clock, label: "Open Hours", value: "Mon – Fri  8:00 AM – 5:00 PM", sub: "Weekend appointments available", href: null },
  ];

  return (
    <section
      id="contact"
      style={{ backgroundColor: C.bg, fontFamily: "'Cormorant Garamond', serif", position: "relative", overflow: "hidden" }}
    >
      {/* Atmospheric glows */}
      <div style={{ position: "absolute", top: "-15%", right: "-8%", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(54,115,94,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "5%", width: "420px", height: "420px", borderRadius: "50%", background: "radial-gradient(circle, rgba(176,138,62,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.025, pointerEvents: "none" }} />

      {/* ── MOBILE layout (< md) ── */}
      <div className="block md:hidden" style={{ padding: "48px 24px 64px" }}>
        {/* Heading */}
        <FadeIn>
          <span className="font-sf-pro-bold" style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "10px", letterSpacing: "0.32em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>
            <span style={{ width: "20px", height: "1px", backgroundColor: C.green, display: "block" }} />
            Contact
          </span>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 style={{ fontSize: "clamp(34px, 9vw, 52px)", fontWeight: 700, color: C.text, lineHeight: 1.07, letterSpacing: "-0.02em", marginBottom: "20px" }}>
            Schedule A<br />
            <span style={{ color: C.gold, fontStyle: "italic" }}>Consultation</span>
            <br />With Our Legal<br />Experts
          </h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.8, marginBottom: "36px" }}>
            Take the first step toward resolving your legal matters with confidence. Our team provides clear guidance, strategic advice, and reliable support — tailored to your exact needs.
          </p>
        </FadeIn>

        {/* Info items */}
        <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: "36px" }}>
          {INFO_ITEMS.map((item, i) => (
            <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} sub={(item as any).sub} href={item.href} delay={0.06 + i * 0.06} />
          ))}
        </div>

        {/* Map */}
        <FadeIn delay={0.2}>
          <div style={{ marginBottom: "48px" }}>
            <InteractiveMap />
          </div>
        </FadeIn>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: C.border, marginBottom: "40px" }} />

        {/* Form */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form-mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }}>
              <FadeIn delay={0.04}>
                <div style={{ marginBottom: "32px" }}>
                  <span className="font-sf-pro-bold" style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "10px", letterSpacing: "0.32em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>
                    <span style={{ width: "20px", height: "1px", backgroundColor: C.green, display: "block" }} />
                    Request a Consultation
                  </span>
                  <h3 style={{ fontSize: "clamp(26px, 7vw, 38px)", fontWeight: 700, color: C.text, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                    Tell us about<br />
                    <span style={{ color: C.gold, fontStyle: "italic" }}>your matter.</span>
                  </h3>
                </div>
              </FadeIn>

              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {/* Name row — stacked on mobile */}
                <FadeIn delay={0.1}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FormField label="First Name" error={errors.first}>
                      <input type="text" value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })} style={getInput("first")} onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} />
                    </FormField>
                    <FormField label="Last Name" error={errors.last}>
                      <input type="text" value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })} style={getInput("last")} onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} />
                    </FormField>
                  </div>
                </FadeIn>

                {/* Contact row — stacked on mobile */}
                <FadeIn delay={0.13}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FormField label="Email Address" error={errors.email}>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={getInput("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                    </FormField>
                    <FormField label="Phone Number" error={errors.phone}>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={getInput("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                    </FormField>
                  </div>
                </FadeIn>

                {/* Area + Date — stacked on mobile */}
                <FadeIn delay={0.16}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <FormField label="Area of Law" error={errors.area}>
                      <select value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} style={{ ...getInput("area"), appearance: "none", WebkitAppearance: "none" }} onFocus={() => setFocused("area")} onBlur={() => setFocused(null)}>
                        <option value="" style={{ backgroundColor: C.bg, color: C.text }}>Select</option>
                        <option value="civil" style={{ backgroundColor: C.bg, color: C.text }}>Civil Law</option>
                        <option value="corporate" style={{ backgroundColor: C.bg, color: C.text }}>Corporate Law</option>
                        <option value="criminal" style={{ backgroundColor: C.bg, color: C.text }}>Criminal Law</option>
                        <option value="family" style={{ backgroundColor: C.bg, color: C.text }}>Family Law</option>
                        <option value="ip" style={{ backgroundColor: C.bg, color: C.text }}>Intellectual Property</option>
                        <option value="property" style={{ backgroundColor: C.bg, color: C.text }}>Property Law</option>
                        <option value="other" style={{ backgroundColor: C.bg, color: C.text }}>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Preferred Date" error={errors.date}>
                      <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ ...getInput("date"), colorScheme: "light" }} onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} />
                    </FormField>
                  </div>
                </FadeIn>

                <FadeIn delay={0.19}>
                  <FormField label="Describe Your Matter" error={errors.message}>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Briefly describe your legal inquiry…" style={{ ...getInput("message"), resize: "none", paddingTop: "10px", minHeight: "120px" }} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                  </FormField>
                </FadeIn>

                <FadeIn delay={0.21}><GoldRule delay={0.21} /></FadeIn>

                <FadeIn delay={0.23}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ width: "20px", height: "20px", flexShrink: 0, marginTop: "1px" }}>
                      <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                        <rect x="3" y="9" width="14" height="10" rx="2" stroke={C.green} strokeWidth="1.2" />
                        <path d="M6.5 9V6.5a3.5 3.5 0 1 1 7 0V9" stroke={C.green} strokeWidth="1.2" strokeLinecap="round" />
                        <circle cx="10" cy="13.5" r="1.2" fill={C.green} />
                      </svg>
                    </div>
                    <p style={{ fontSize: "13px", color: C.textFaint, lineHeight: 1.65 }}>
                      All information shared is protected under strict attorney‑client privilege and treated with full confidentiality.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.26}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <motion.button
                      onClick={handleSubmit}
                      whileHover={{ backgroundColor: "#2a5e4c" }}
                      whileTap={{ scale: 0.97 }}
                      style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "16px 24px", backgroundColor: C.green, color: "#fff", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 800, textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", borderRadius: "3px", width: "100%" }}
                    >
                      Confirm Appointment
                      <ArrowRight style={{ width: "14px", height: "14px" }} />
                    </motion.button>
                    <span className="font-sf-pro-bold" style={{ fontSize: "11px", color: "rgba(176,138,62,0.55)", letterSpacing: "0.1em", textAlign: "center" }}>
                      Response within 24 hrs
                    </span>
                  </div>
                </FadeIn>
              </div>
            </motion.div>
          ) : (
            <motion.div key="success-mobile" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "22px", paddingTop: "8px" }}>
              <motion.div style={{ width: "52px", height: "52px", border: `1px solid ${C.greenBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.greenLight }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 360, damping: 24, delay: 0.1 }}>
                <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                  <motion.path d="M1 7L7 13L19 1" stroke={C.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.3 }} />
                </svg>
              </motion.div>
              <div>
                <p className="font-sf-pro-bold" style={{ fontSize: "11px", letterSpacing: "0.28em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Request Received</p>
                <h3 style={{ fontSize: "clamp(28px, 7vw, 44px)", fontWeight: 700, color: C.text, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                  Your consultation<br />
                  <span style={{ color: C.gold, fontStyle: "italic" }}>request received.</span>
                </h3>
              </div>
              <p style={{ fontSize: "15px", color: C.textMuted, lineHeight: 1.78 }}>
                Thank you for reaching out. A member of our legal team will contact you within 24 hours to confirm your appointment details.
              </p>
              <motion.button onClick={() => { setFormData({ first: "", last: "", email: "", phone: "", area: "", date: "", message: "" }); setErrors({}); setSubmitted(false); }} whileHover={{ color: C.gold }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "0.22em", color: "rgba(176,138,62,0.5)", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", padding: "0", transition: "color 0.2s" }}>
                ← Submit another enquiry
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── DESKTOP layout (md+): original two-column grid ── */}
      <div className="hidden md:grid contact-grid" style={{ gridTemplateColumns: "1fr 1fr", minHeight: "100vh" }}>
        {/* LEFT COLUMN */}
        <div style={{ borderRight: `1px solid ${C.border}`, padding: "clamp(48px, 6vw, 88px) clamp(28px, 5vw, 76px)", display: "flex", flexDirection: "column", gap: "40px" }}>
          <div>
            <FadeIn>
              <span className="font-sf-pro-bold" style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "10px", letterSpacing: "0.32em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "22px" }}>
                <span style={{ width: "20px", height: "1px", backgroundColor: C.green, display: "block" }} />
                Contact
              </span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 style={{ fontSize: "clamp(36px, 4vw, 62px)", fontWeight: 700, color: C.text, lineHeight: 1.07, letterSpacing: "-0.02em", marginBottom: "24px" }}>
                Schedule A<br />
                <span style={{ color: C.gold, fontStyle: "italic" }}>Consultation</span>
                <br />With Our Legal<br />Experts
              </h2>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.8, maxWidth: "380px" }}>
                Take the first step toward resolving your legal matters with confidence. Our team provides clear guidance, strategic advice, and reliable support — tailored to your exact needs.
              </p>
            </FadeIn>
          </div>

          <div style={{ borderTop: `1px solid ${C.border}` }}>
            {INFO_ITEMS.map((item, i) => (
              <InfoItem key={item.label} icon={item.icon} label={item.label} value={item.value} sub={(item as any).sub} href={item.href} delay={0.06 + i * 0.06} />
            ))}
          </div>

          <FadeIn delay={0.28}><InteractiveMap /></FadeIn>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ padding: "clamp(48px, 6vw, 88px) clamp(28px, 5vw, 76px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }} style={{ display: "flex", flexDirection: "column", height: "100%", gap: "0" }}>
                <FadeIn delay={0.04}>
                  <div style={{ marginBottom: "36px" }}>
                    <span className="font-sf-pro-bold" style={{ display: "inline-flex", alignItems: "center", gap: "9px", fontSize: "10px", letterSpacing: "0.32em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "18px" }}>
                      <span style={{ width: "20px", height: "1px", backgroundColor: C.green, display: "block" }} />
                      Request a Consultation
                    </span>
                    <h3 style={{ fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: C.text, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                      Tell us about<br />
                      <span style={{ color: C.gold, fontStyle: "italic" }}>your matter.</span>
                    </h3>
                  </div>
                </FadeIn>

                <div style={{ display: "flex", flexDirection: "column", gap: "28px", flex: 1 }}>
                  <FadeIn delay={0.1}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <FormField label="First Name" error={errors.first}><input type="text" value={formData.first} onChange={(e) => setFormData({ ...formData, first: e.target.value })} style={getInput("first")} onFocus={() => setFocused("first")} onBlur={() => setFocused(null)} /></FormField>
                      <FormField label="Last Name" error={errors.last}><input type="text" value={formData.last} onChange={(e) => setFormData({ ...formData, last: e.target.value })} style={getInput("last")} onFocus={() => setFocused("last")} onBlur={() => setFocused(null)} /></FormField>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.13}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <FormField label="Email Address" error={errors.email}><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={getInput("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} /></FormField>
                      <FormField label="Phone Number" error={errors.phone}><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={getInput("phone")} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} /></FormField>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.16}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <FormField label="Area of Law" error={errors.area}>
                        <select value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} style={{ ...getInput("area"), appearance: "none", WebkitAppearance: "none" }} onFocus={() => setFocused("area")} onBlur={() => setFocused(null)}>
                          <option value="" style={{ backgroundColor: C.bg, color: C.text }}>Select</option>
                          <option value="civil" style={{ backgroundColor: C.bg, color: C.text }}>Civil Law</option>
                          <option value="corporate" style={{ backgroundColor: C.bg, color: C.text }}>Corporate Law</option>
                          <option value="criminal" style={{ backgroundColor: C.bg, color: C.text }}>Criminal Law</option>
                          <option value="family" style={{ backgroundColor: C.bg, color: C.text }}>Family Law</option>
                          <option value="ip" style={{ backgroundColor: C.bg, color: C.text }}>Intellectual Property</option>
                          <option value="property" style={{ backgroundColor: C.bg, color: C.text }}>Property Law</option>
                          <option value="other" style={{ backgroundColor: C.bg, color: C.text }}>Other</option>
                        </select>
                      </FormField>
                      <FormField label="Preferred Date" error={errors.date}>
                        <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} style={{ ...getInput("date"), colorScheme: "light" }} onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} />
                      </FormField>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.19} style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <FormField label="Describe Your Matter" error={errors.message}>
                      <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Briefly describe your legal inquiry…" style={{ ...getInput("message"), resize: "none", paddingTop: "10px", flex: 1, minHeight: "100px" }} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                    </FormField>
                  </FadeIn>
                  <FadeIn delay={0.21}><GoldRule delay={0.21} /></FadeIn>
                  <FadeIn delay={0.23}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "-10px" }}>
                      <div style={{ width: "20px", height: "20px", flexShrink: 0, marginTop: "1px" }}>
                        <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                          <rect x="3" y="9" width="14" height="10" rx="2" stroke={C.green} strokeWidth="1.2" />
                          <path d="M6.5 9V6.5a3.5 3.5 0 1 1 7 0V9" stroke={C.green} strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="10" cy="13.5" r="1.2" fill={C.green} />
                        </svg>
                      </div>
                      <p style={{ fontSize: "13px", color: C.textFaint, lineHeight: 1.65 }}>All information shared is protected under strict attorney‑client privilege and treated with full confidentiality.</p>
                    </div>
                  </FadeIn>
                  <FadeIn delay={0.26}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "14px" }}>
                      <motion.button onClick={handleSubmit} whileHover={{ backgroundColor: "#2a5e4c" }} whileTap={{ scale: 0.97 }}
                        style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "16px 38px", backgroundColor: C.green, color: "#fff", fontSize: "11px", letterSpacing: "0.2em", fontWeight: 800, textTransform: "uppercase", border: "none", cursor: "pointer", fontFamily: "'Cormorant Garamond', serif", borderRadius: "3px", transition: "background-color 0.2s" }}>
                        Confirm Appointment
                        <ArrowRight style={{ width: "14px", height: "14px" }} />
                      </motion.button>
                      <span className="font-sf-pro-bold" style={{ fontSize: "11px", color: "rgba(176,138,62,0.55)", letterSpacing: "0.1em" }}>Response within 24 hrs</span>
                    </div>
                  </FadeIn>
                </div>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "22px", height: "100%" }}>
                <motion.div style={{ width: "52px", height: "52px", border: `1px solid ${C.greenBorder}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.greenLight }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 360, damping: 24, delay: 0.1 }}>
                  <svg width="20" height="15" viewBox="0 0 20 15" fill="none">
                    <motion.path d="M1 7L7 13L19 1" stroke={C.green} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.55, delay: 0.3 }} />
                  </svg>
                </motion.div>
                <div>
                  <p className="font-sf-pro-bold" style={{ fontSize: "11px", letterSpacing: "0.28em", color: C.green, textTransform: "uppercase", fontWeight: 700, marginBottom: "14px" }}>Request Received</p>
                  <h3 style={{ fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 700, color: C.text, lineHeight: 1.12, letterSpacing: "-0.01em" }}>
                    Your consultation<br />
                    <span style={{ color: C.gold, fontStyle: "italic" }}>request received.</span>
                  </h3>
                </div>
                <p style={{ fontSize: "16px", color: C.textMuted, lineHeight: 1.78, maxWidth: "380px" }}>Thank you for reaching out. A member of our legal team will contact you within 24 hours to confirm your appointment details.</p>
                <motion.button onClick={() => { setFormData({ first: "", last: "", email: "", phone: "", area: "", date: "", message: "" }); setErrors({}); setSubmitted(false); }} whileHover={{ color: C.gold }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px", letterSpacing: "0.22em", color: "rgba(176,138,62,0.5)", textTransform: "uppercase", fontFamily: "'Cormorant Garamond', serif", padding: "0", marginTop: "6px", transition: "color 0.2s" }}>
                  ← Submit another enquiry
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.2) sepia(0.3) saturate(1.5) hue-rotate(10deg);
          opacity: 0.5;
          cursor: pointer;
        }
        input::placeholder, textarea::placeholder {
          color: rgba(38,23,12,0.2);
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
        }
        select option {
          background-color: #EFE9E1;
          color: #26170C;
        }
      `}</style>
    </section>
  );
}